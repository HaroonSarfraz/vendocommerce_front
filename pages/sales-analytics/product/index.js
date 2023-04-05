import dynamic from "next/dynamic";
import { Dropdown, message, Select, theme } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getSalesByProductColumnList,
  getSalesByProductList,
  getSaveColumnConfiguration,
} from "@/src/services/salesByProduct.services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/src/components/loading";
import VendoTooltip from "@/src/components/tooltip";
import Drawer from "@/src/components/sales-analytics/product/drawer";
import { TopBarFilter } from "@/src/components/sales-analytics/sales";

const DashboardLayout = dynamic(() => import("@/src/layouts/DashboardLayout"), {
  ssr: false,
});

const { useToken } = theme;

export default function SalesByProducts() {
  const { token } = useToken();
  const dispatch = useDispatch();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const SalesByProductListRes = useSelector(
    (state) => state.salesByProduct.salesByProductList
  );
  const SaveColumnConfigurationRes = useSelector(
    (state) => state.salesByProduct.saveColumnConfiguration
  );
  const SalesByProductColumnListRes = useSelector(
    (state) => state.salesByProduct.salesByProductColumnList
  );
  const SaveTableConfigurationRes = useSelector(
    (state) => state.salesByProduct.saveTableConfiguration
  );

  const [columnsLoading, setColumnsLoading] = useState(true);
  const [columnsData, setColumnsData] = useState({});
  const [selectColumn, setSelectColumn] = useState(null);

  const [tableLoading, setTableLoading] = useState(true);
  const [list, setList] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [selectedColumnsList, setSelectedColumnsList] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState({
    week: [],
    year: 2023,
  });

  useEffect(() => {
    setColumnsLoading(true);
    dispatch(getSalesByProductColumnList());
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
    if (SaveTableConfigurationRes?.status === true) {
      message.destroy();
      message.success(SaveTableConfigurationRes?.message);
      setColumnsData(
        {
          records: SaveTableConfigurationRes?.data?.columnList,
          selectedColumnList:
            SaveTableConfigurationRes?.data?.selectedColumnList,
          selectedDefaultColumn:
            SaveTableConfigurationRes?.data?.selectedDefaultColumn,
        } || {}
      );
      setSelectColumn(SaveTableConfigurationRes?.data?.selectedDefaultColumn);
      setIsOpen(false);
      setColumnsLoading(false);
      const { year, week } = filter;
      setTableLoading(true);
      getSalesByProductList({
        search_year: year,
        search_week: week?.join(","),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SaveTableConfigurationRes]);

  useEffect(() => {
    if (SaveColumnConfigurationRes?.status === true) {
      message.destroy();
      message.success(SaveColumnConfigurationRes?.message);
      setColumnsData(
        {
          records: SaveColumnConfigurationRes?.data?.columnList,
          selectedColumnList:
            SaveColumnConfigurationRes?.data?.selectedColumnList,
          selectedDefaultColumn:
            SaveColumnConfigurationRes?.data?.selectedDefaultColumn,
        } || {}
      );
      setSelectColumn(SaveColumnConfigurationRes?.data?.selectedDefaultColumn);
      setColumnsLoading(false);
    } else if (SaveColumnConfigurationRes?.status === false) {
      message.destroy();
      message.error(SaveColumnConfigurationRes?.message);
      setSelectColumn(null);
      setColumnsData({});
      setColumnsLoading(false);
    }
  }, [SaveColumnConfigurationRes]);

  useEffect(() => {
    if (SalesByProductColumnListRes?.status === true) {
      if (SalesByProductColumnListRes?.data?.selectedColumnList) {
        setSelectedColumnsList(
          SalesByProductColumnListRes?.data?.selectedColumnList?.map((d) => {
            return {
              value: d,
              label: SalesByProductColumnListRes?.data?.records?.[d],
            };
          }) || []
        );
      }
      setColumnsData(SalesByProductColumnListRes?.data || {});
      setSelectColumn(SalesByProductColumnListRes?.data?.selectedDefaultColumn);
      setColumnsLoading(false);
    } else if (SalesByProductColumnListRes?.status === false) {
      setColumnsData({});
      setColumnsLoading(false);
    }
  }, [SalesByProductColumnListRes]);

  useEffect(() => {
    if (SalesByProductListRes?.status === true) {
      const getMax = Object.values(SalesByProductListRes?.data?.records).map(
        (d, i) => {
          // delete d?.GrandTotal;
          return Object.keys(d);
        }
      );
      var index = getMax
        ?.map((d) => d?.length)
        .indexOf(Math.max(...getMax?.map((d) => d?.length)));
      setTableColumns(getMax[index]);
      setList(Object.values(SalesByProductListRes?.data?.records || {}));
      setTableLoading(false);
    } else if (SalesByProductListRes?.status === false) {
      setList([]);
      setTableLoading(false);
    }
  }, [SalesByProductListRes]);

  const changeDefaultColumn = (reset) => {
    message.destroy();
    message.loading("Loading...", 0);
    setColumnsLoading(true);
    dispatch(getSaveColumnConfiguration({
      selected_default_column: reset
        ? "avg_browser_page_views_percentage"
        : selectColumn,
    }));
  };

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
                                loading={columnsLoading}
                                className="min-w-250px"
                                placeholder="Columns"
                                size="large"
                                onChange={(e) => {
                                  setSelectColumn(e);
                                }}
                                value={selectColumn || null}
                                options={Object?.entries(
                                  columnsData?.records || {}
                                )?.map((d) => {
                                  return { label: d[1], value: d[0] };
                                })}
                              />
                              <div className="d-flex justify-content-end mt-7">
                                <button
                                  type="reset"
                                  onClick={() => {
                                    changeDefaultColumn(true);
                                  }}
                                  className="btn btn-sm btn-light btn-active-light-primary me-2"
                                  data-kt-menu-dismiss="true"
                                >
                                  Reset
                                </button>
                                <button
                                  disabled={!selectColumn}
                                  type="submit"
                                  onClick={() => {
                                    changeDefaultColumn(false);
                                  }}
                                  className="btn btn-sm btn-dark"
                                  data-kt-menu-dismiss="true"
                                >
                                  Apply
                                </button>
                              </div>
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
                      disabled={columnsLoading}
                      onClick={() => {
                        if (!columnsLoading) {
                          setIsOpen(true);
                        }
                      }}
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
                    ) : (
                      <table
                        className="table align-middle table-row-dashed  table-row-gray-300 fs-7 gy-4 gx-5 border-top-d"
                      >
                        <thead>
                          <tr className="fw-boldest text-dark">
                            <th className="min-w-300px " colSpan="2">
                              Row Labels
                            </th>
                            {tableColumns?.map((d, i) => (
                              <th className="min-w-150px" key={i}>
                                {d}
                                <a
                                  href="#"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#kt_accordion_1_body_${
                                    i + 1
                                  }`}
                                  aria-expanded="false"
                                  aria-controls={`kt_accordion_1_body_${i + 1}`}
                                  className="open-arrow rounded-sm w-20px h-20px d-inline-flex justify-content-center align-items-center bg-light collapsed"
                                >
                                  <FontAwesomeIcon
                                    icon={faPlus}
                                    color="black"
                                  />
                                </a>
                              </th>
                            ))}
                            {/* <th className='min-w-150px '>Grand Total</th> */}
                          </tr>
                          <tr className="fw-boldest text-dark">
                            <th className="p-0 " />
                            <th className="p-0 " />
                            {tableColumns?.map((d, i) => (
                              <th className="p-0 " key={i}>
                                <div
                                  id={`kt_accordion_1_body_${i + 1}`}
                                  className="accordion-collapse collapse"
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
                                        {selectedColumnsList?.map((t, y) => (
                                          <th className=" min-w-300px" key={y}>
                                            {t.label}
                                          </th>
                                        ))}
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
                                    r?.[1]?.[selectColumn] || 0;
                                  return (
                                    <td key={t}>
                                      <div className="d-flex align-items-center">
                                        <span
                                          className="d-block"
                                          style={{ width: 150 }}
                                        >
                                          {defaultValue || 0}%
                                        </span>
                                        <div
                                          id={`kt_accordion_1_body_${t + 1}`}
                                          className="accordion-collapse collapse"
                                          aria-labelledby={`kt_accordion_1_header_${
                                            t + 1
                                          }`}
                                          data-bs-parent="#kt_accordion_1"
                                          style={{}}
                                        >
                                          <table className="table mb-0">
                                            <tbody>
                                              <tr>
                                                <td className=" min-w-300px" />
                                                {selectedColumnsList?.map(
                                                  (h, j) => {
                                                    if (
                                                      selectColumn === h.value
                                                    ) {
                                                      return;
                                                    }
                                                    return (
                                                      <td
                                                        key={j}
                                                        className=" min-w-300px"
                                                      >
                                                        {r?.[1]?.[h.value] || 0}
                                                        {j === 0 ? "%" : ""}
                                                      </td>
                                                    );
                                                  }
                                                )}
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
                                    {d?.GrandTotal || 0}%
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
            data={columnsData}
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
