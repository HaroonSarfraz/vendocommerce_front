import dynamic from "next/dynamic";
import { Dropdown, Select, theme } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSalesByProductList } from "@/src/services/salesByProduct.services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/src/components/loading";
import VendoTooltip from "@/src/components/tooltip";
import Drawer from "@/src/components/sales-analytics/product/drawer";
import { TopBarFilter } from "@/src/components/sales-analytics/sales";
import _ from "lodash";
import { defaultWeek, defaultYear } from "@/src/config";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import { NoDataSvg } from "@/src/assets";
import { selectSalesByProductList } from "@/src/store/slice/salesByProduct.slice";
import { numberFormat } from "@/src/helpers/formatting.helpers";

const { useToken } = theme;

export default function SalesByProducts() {
  const { token } = useToken();
  const dispatch = useDispatch();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const salesByProductList = useSelector(selectSalesByProductList);

  const [selectedColumn, setSelectedColumn] = useState(null);

  const [tableLoading, setTableLoading] = useState(true);
  const [list, setList] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [columnConfig, setColumnConfig] = useState([]);
  const [expandedWeek, setExpendedWeek] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState({
    week: [defaultWeek()],
    year: defaultYear(),
  });

  const columnsList = [
    { label: "Sum of Sessions", value: "total_session" },
    {
      label: "Sum of Ordered Product Sales",
      value: "total_ordered_product_sales",
    },
    { label: "Sum of Total Order Items", value: "total_order_items" },
    { label: "Sum of Sessions - Mobile App", value: "mobile_app_sessions" },
    { label: "Sum of Sessions - Browser", value: "browser_sessions" },
    { label: "Sum of Session Percentage", value: "avg_session_percentage" },
    {
      label: "Sum of Session Percentage - Mobile App",
      value: "avg_mobile_app_session_percentage",
    },
    {
      label: "Sum of Session Percentage - Browser",
      value: "avg_browser_session_percentage",
    },
    { label: "Sum of Page Views", value: "total_page_views" },
    {
      label: "Sum of Page Views - Mobile App",
      value: "total_mobile_app_page_views",
    },
    { label: "Sum of Page Views - Browser", value: "total_browser_page_views" },
    {
      label: "Sum of Page Views Percentage",
      value: "avg_page_view_percentage",
    },
    {
      label: "Sum of Page Views Percentage - Mobile App",
      value: "avg_mobile_app_page_views_percentage",
    },
    {
      label: "Sum of Page Views Percentage - Browser",
      value: "avg_browser_page_views_percentage",
    },
    {
      label: "Sum of Buy Box Percentage",
      value: "avg_buy_box_percentage",
    },
    { label: "Sum of Units Ordered", value: "total_ordered_units" },
    {
      label: "Sum of Unit Session Percentage",
      value: "avg_unit_session_percentage",
    },
  ];

  useEffect(() => {
    setColumnConfig(columnsList);
    setSelectedColumn(columnsList[1].value);

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { year, week } = filter;
    setTableLoading(true);
    dispatch(
      getSalesByProductList({
        search_year: year,
        search_week: week?.join(","),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    if (salesByProductList?.status) {
      if (salesByProductList?.data) {
        const getMax = Object.values(salesByProductList?.data).map((d, i) => {
          return Object.keys(d);
        });
        var index = getMax
          ?.map((d) => d?.length)
          .indexOf(Math.max(...getMax?.map((d) => d?.length)));
        setTableColumns(getMax[index]);
      }
      setList(salesByProductList?.data || []);
      setTableLoading(false);
    } else if (salesByProductList?.status === false) {
      setTableLoading(false);
    }
  }, [salesByProductList]);

  return (
    <DashboardLayout>
      <div
        className="content d-flex flex-column flex-column-fluid"
        id="kt_content"
      >
        <div className="container-fluid" id="kt_content_container">
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n                            /* .table th, .table td{\n                                border:1px solid red\n                            } */\n                        ",
            }}
          />
          <div className="row gx-5 gx-xl-5">
            {TopBarFilter(filter, setFilter, "Week")}
            <div className="col-lg-12">
              <div className="card mb-1">
                <div className="card-header border-bottom border-bottom-dashed">
                  <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bolder fs-3 mb-0">
                      Analytics by Product
                    </span>
                  </h3>
                  <div className="card-toolbar">
                    <Dropdown
                      trigger={["click"]}
                      dropdownRender={() => (
                        <div style={contentStyle}>
                          <div>
                            <div className="px-7 py-5">
                              <div className="fs-5 text-dark fw-bold">
                                Change Default Column
                              </div>
                            </div>
                            <div className="separator border-gray-200" />
                            <div className="px-7 py-5 min-w-300px">
                              <Select
                                className="min-w-250px"
                                placeholder="Columns"
                                size="large"
                                onChange={(e) => {
                                  setSelectedColumn(e);
                                }}
                                value={selectedColumn || null}
                                options={columnConfig.map((d) => {
                                  return d;
                                })}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    >
                      <button
                        onClick={(e) => e.preventDefault()}
                        type="button"
                        className="btn fs-7 btn-light btn-active-light-dark me-3 btn-sm fw-bolder"
                      >
                        Default Column Setting
                      </button>
                    </Dropdown>

                    <button
                      onClick={() => setIsOpen(true)}
                      className="btn btn-light btn-active-light-dark btn-sm fw-bolder me-3"
                      id="kt_drawer_example_basic_button"
                    >
                      {" "}
                      Configuration{" "}
                    </button>
                    <button className="btn btn-light-danger btn-sm fw-bolder ">
                      Export Data
                    </button>
                  </div>
                </div>
                <div className="card-body pt-2 table-responsive">
                  <div className="table-responsive">
                    {tableLoading ? (
                      <Loading />
                    ) : Object.keys(list || {}).length === 0 ? (
                      <div style={{ height: 200 }}>
                        <div
                          style={{
                            transform: "translate(-50%, -50%)",
                            top: "50%",
                            left: "50%",
                            position: "absolute",
                            textAlign: "center",
                          }}
                        >
                          <NoDataSvg />
                          <div
                            style={{
                              fontSize: "14px",
                              color: "#363a3e",
                              opacity: "0.51",
                              paddingTop: "3px",
                              fontWeight: "bold",
                              letterSpacing: "-0.36px",
                            }}
                          >
                            Nothing to see here !
                          </div>
                        </div>
                      </div>
                    ) : (
                      <table className="table align-middle table-row-dashed table-row-gray-300 fs-7 gy-4 gx-5 border-top-d">
                        <thead>
                          <tr className="fw-boldest text-dark">
                            <th className="min-w-300px " colSpan="2">
                              Row Labels
                            </th>
                            {tableColumns?.map((d, i) => (
                              <th className="min-w-150px" key={i}>
                                {d === "GrandTotal" ? (
                                  <>{d}</>
                                ) : (
                                  <>
                                    {`WK${d}`}
                                    <div
                                      data-bs-toggle="collapse"
                                      data-bs-target={`#kt_accordion_1_body_${
                                        i + 1
                                      }`}
                                      aria-expanded="false"
                                      aria-controls={`kt_accordion_1_body_${
                                        i + 1
                                      }`}
                                      onClick={() => {
                                        expandedWeek === null
                                          ? setExpendedWeek(i)
                                          : expandedWeek === i
                                          ? setExpendedWeek(null)
                                          : setExpendedWeek(i);
                                      }}
                                      className="open-arrow rounded-sm w-20px h-20px d-inline-flex justify-content-center align-items-center bg-light cursor-pointer"
                                    >
                                      <FontAwesomeIcon
                                        icon={faPlus}
                                        color="black"
                                      />
                                    </div>
                                  </>
                                )}
                              </th>
                            ))}
                            {/* <th className='min-w-150px '>Grand Total</th> */}
                          </tr>
                          <tr className="fw-boldest text-dark">
                            <th className="p-0 " />
                            <th className="p-0 " />
                            {columnConfig?.map((d, i) => (
                              <th className="p-0 " key={i}>
                                <div
                                  id={`kt_accordion_1_body_${i + 1}`}
                                  className={
                                    expandedWeek !== i &&
                                    "accordion-collapse collapse"
                                  }
                                  aria-labelledby={`kt_accordion_1_header_${
                                    i + 1
                                  }`}
                                  data-bs-parent="#kt_accordion_1"
                                  style={{}}
                                >
                                  <table className="table mb-0">
                                    <thead
                                      className="thead-light"
                                      style={{
                                        borderRight:
                                          "2px solid #fff !important",
                                      }}
                                    >
                                      <tr>
                                        <th className=" min-w-300px">
                                          {
                                            columnConfig?.find(
                                              (config) =>
                                                config.value == selectedColumn
                                            )?.label
                                          }
                                        </th>
                                        {columnConfig?.map((t, y) => {
                                          if (selectedColumn === t.value) {
                                            return;
                                          }
                                          return (
                                            <th
                                              className=" min-w-300px"
                                              key={y}
                                            >
                                              {t.label}
                                            </th>
                                          );
                                        })}
                                      </tr>
                                    </thead>
                                  </table>
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="text-gray-700 fw-bold">
                          {Object.values(list || {})?.map((d, i) => {
                            const defaultWeek = Object.entries(
                              d || {}
                            )?.[0]?.[1];
                            return (
                              <tr key={i}>
                                <td colSpan="2">
                                  <div className="fs-7">
                                    <VendoTooltip
                                      title={defaultWeek?.title}
                                      rule
                                      row={3}
                                    >
                                      <a
                                        className="text-dark mb-2"
                                        style={{ fontWeight: 600 }}
                                        href={`https://amazon.com/dp/${defaultWeek?.parent_asin}`}
                                        title="Click to view on Amazon"
                                        target="_blank"
                                      >
                                        {defaultWeek?.title || "-"}
                                      </a>
                                    </VendoTooltip>
                                    <span className="d-flex mt-0">
                                      <b className="fw-boldest me-2 text-dark">
                                        Parent ASIN:
                                      </b>
                                      {defaultWeek?.parent_asin || "-"}
                                    </span>
                                    <span className="d-flex mt-1">
                                      <b className="fw-boldest me-2 text-dark">
                                        Child ASIN:
                                      </b>{" "}
                                      <a
                                        href={`https://amazon.com/dp/${defaultWeek?.child_asin}`}
                                      >
                                        {defaultWeek?.child_asin || "-"}
                                      </a>
                                    </span>
                                    <span className="d-flex mt-1">
                                      <b className="fw-boldest me-2 text-dark">
                                        SKU:{" "}
                                      </b>
                                      {defaultWeek?.sku || "-"}
                                    </span>
                                  </div>
                                </td>
                                {Object.entries(d)?.map((r, t) => {
                                  if (r?.[0] === "GrandTotal") {
                                    return;
                                  }
                                  const defaultValue =
                                    r?.[1]?.[selectedColumn] || 0;
                                  return (
                                    <td key={t}>
                                      <div className="d-flex align-items-center">
                                        <span
                                          className="d-block"
                                          style={{ width: 150 }}
                                        >
                                          {defaultValue || 0}
                                          {selectedColumn.startsWith("avg") &&
                                            "%"}
                                        </span>
                                        <div
                                          id={`kt_accordion_1_body_${t + 1}`}
                                          className={
                                            expandedWeek !== t &&
                                            "accordion-collapse collapse"
                                          }
                                          aria-labelledby={`kt_accordion_1_header_${
                                            t + 1
                                          }`}
                                          data-bs-parent="#kt_accordion_1"
                                          style={{}}
                                        >
                                          <table className="table mb-0">
                                            <tbody>
                                              <tr>
                                                <td className="min-w-300px" />
                                                {columnConfig?.map((h, j) => {
                                                  if (
                                                    selectedColumn === h.value
                                                  ) {
                                                    return;
                                                  }
                                                  return (
                                                    <td
                                                      key={j}
                                                      className="min-w-300px"
                                                    >
                                                      {r?.[1]?.[h.value] ?? 0}
                                                      {h.value.startsWith(
                                                        "avg"
                                                      ) && "%"}
                                                    </td>
                                                  );
                                                })}
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </td>
                                  );
                                })}
                                <td>
                                  <span
                                    className="d-block"
                                    style={{ width: 100 }}
                                  >
                                    {numberFormat(
                                      Object.values(d || {}).reduce(
                                        (partialSum, a) =>
                                          partialSum +
                                          Number(a?.[selectedColumn] || 0),
                                        0
                                      )
                                    )}
                                    {selectedColumn.startsWith("avg") && "%"}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isOpen && (
          <Drawer
            columnsList={columnsList}
            columnConfig={columnConfig}
            setColumnConfig={setColumnConfig}
            open={isOpen}
            onHide={() => {
              setIsOpen(false);
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
