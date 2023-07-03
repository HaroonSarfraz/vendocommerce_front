import Link from "next/link";
import dynamic from "next/dynamic";
import _ from "lodash";
import cloneDeep from "lodash/cloneDeep";
import { useEffect, useState } from "react";
import { Empty, Modal, Select, Skeleton, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DotChartOutlined } from "@ant-design/icons";
import Loading from "@/src/components/loading";
import Details from "@/src/components/Details";
import { defaultYear, defaultMonth } from "@/src/config";
import {
  getSalesByMonthData,
  getSalesByMonthDetail,
  getSalesByMonthGraph,
} from "@/src/services/salesByMonth.services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TopBarFilter } from "@/src/components/sales-analytics/sales";
import {
  faAngleDown,
  faAngleUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import {
  selectSalesByMonthData,
  selectSalesByMonthDetail,
  selectSalesByMonthGraph,
} from "@/src/store/slice/salesByMonth.slice";
import { selectFilter } from "@/src/helpers/selectFilter";
import {
  currencyFormat,
  numberFormat,
  percentageFormat,
} from "@/src/helpers/formatting.helpers";
import { ExportToExcel, exportToExcel } from "@/src/hooks/Excelexport";
import NoData from "@/src/components/no-data";
import Drawer from "@/src/components/drawer";
import {
  fetchConfigurations,
  updateConfigurations,
} from "@/src/api/configurations.api";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const configurationTableKey = "sales-by-month-table";
const configurationGraphKey = "sales-by-month-graph";

const columns = [
  "Sum of Ordered Product Sales",
  "Sum of Sessions",
  "Sum of Session Percentage",
  "Sum of Page Views",
  "Sum of Page Views Percentage",
  "Average of Buy Box",
  "Sum of Units Ordered",
  "Sum of Unit Session Percentage",
  "Sum of Total Order Items",
];

export default function SalesByMonth() {
  const dispatch = useDispatch();
  const [exportBy, setExportBy] = useState("sku");

  const [filter, setFilter] = useState({
    month: _.range(0, defaultMonth() + 1),
    year: defaultYear(),
  });

  const handleChangeExport = (value) => {
    setExportBy(value);
  };

  const [toggleExport, setToggleExport] = useState(false);

  const [graphFilter, setGraphFilter] = useState("month");
  const [graphSelected, setGraphSelected] = useState([]);
  const [expand, setExpand] = useState(null);

  const [salesByMonthData, setSalesByMonthData] = useState({});
  const [salesByMonthDataLoading, setSalesByMonthDataLoading] = useState(true);

  const [salesByMonthDetail, setSalesByMonthDetail] = useState([]);
  const [salesByMonthDetailLoading, setSalesByMonthDetailLoading] =
    useState(true);
  const [salesByMonthGraphLoading, setSalesByMonthGraphLoading] =
    useState(true);
  const [salesByMonthGraph, setSalesByMonthGraph] = useState({
    series: [],
    label: [],
  });

  const SalesByMonthDataRes = useSelector(selectSalesByMonthData);
  const SalesByMonthDetailRes = useSelector(selectSalesByMonthDetail);
  const SalesByMonthGraphRes = useSelector(selectSalesByMonthGraph);

  const [tableConfigOpen, setTableConfigOpen] = useState(false);
  const [graphConfigOpen, setGraphConfigOpen] = useState(false);
  const [columnConfig, setColumnConfig] = useState([]);
  const [columnConfigLoaded, setColumnConfigLoaded] = useState(false);
  const [graphColumnConfig, setGraphColumnConfig] = useState([]);
  const [graphColumnConfigLoaded, setGraphColumnConfigLoaded] = useState(false);

  const graphOptions = salesByMonthGraph?.label.map((name, index) => {
    return { label: name, value: index };
  });

  const graphSelectedLabels = salesByMonthGraph?.label?.filter((_, index) => {
    return (
      graphFilter === "month" ||
      graphSelected.length === 0 ||
      graphSelected.includes(index)
    );
  });

  const graphSelectedSeries = cloneDeep(salesByMonthGraph?.series)?.map(
    (data) => {
      data.data = data.data?.filter((_, index) => {
        return (
          graphFilter === "month" ||
          graphSelected.length === 0 ||
          graphSelected.includes(index)
        );
      });
      return data;
    }
  );

  useEffect(() => {
    setColumnConfig(columns);
    setGraphColumnConfig(columns);

    fetchConfigurations(configurationTableKey)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          res.data?.length > 0 && setColumnConfig(res.data);
          setColumnConfigLoaded(true);
        }
      })
      .catch((_err) => {
        message.error("Something went wrong");
      });

    fetchConfigurations(configurationGraphKey)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          res.data?.length > 0 && setGraphColumnConfig(res.data);
          setGraphColumnConfigLoaded(true);
        }
      })
      .catch((_err) => {
        message.error("Something went wrong");
      });
  }, []);

  useEffect(() => {
    if (columnConfigLoaded && columnConfig.length > 0) {
      updateConfigurations(configurationTableKey, columnConfig);
    }
  }, [columnConfig]);

  useEffect(() => {
    if (graphColumnConfigLoaded && graphColumnConfig.length > 0) {
      updateConfigurations(configurationGraphKey, graphColumnConfig);
    }
  }, [graphColumnConfig]);

  useEffect(() => {
    const { month, year } = filter;
    if (month.length > 0 && year) {
      setSalesByMonthDataLoading(true);
      setSalesByMonthGraphLoading(true);
      setSalesByMonthDetailLoading(true);
      setGraphSelected([]);

      const time = setTimeout(() => {
        dispatch(
          getSalesByMonthData({
            search_year: year,
            search_month: month?.join(","),
          })
        );
        dispatch(
          getSalesByMonthDetail({
            search_year: year,
            search_month: month?.join(","),
          })
        );
        dispatch(
          getSalesByMonthGraph({
            search_year: year,
            search_month: month?.map((m) => m + 1)?.join(","),
            graph_filter_type: graphFilter,
          })
        );
      }, 600);
      return () => {
        clearTimeout(time);
      };
    }
  }, [filter]);

  useEffect(() => {
    if (filter.month.length > 0 && filter.year) {
      setSalesByMonthGraphLoading(true);
      setGraphSelected([]);

      const time = setTimeout(() => {
        dispatch(
          getSalesByMonthGraph({
            search_year: filter?.year,
            search_month: filter?.month?.map((m) => m + 1)?.join(","),
            graph_filter_type: graphFilter,
          })
        );
      }, 600);
      return () => {
        clearTimeout(time);
      };
    }
  }, [graphFilter]);

  useEffect(() => {
    if (SalesByMonthDataRes?.status === true) {
      setSalesByMonthData(SalesByMonthDataRes?.data || {});
      setSalesByMonthDataLoading(false);
    } else if (SalesByMonthDataRes?.status === false) {
      setSalesByMonthData({});
      setSalesByMonthDataLoading(false);
    }
  }, [SalesByMonthDataRes]);

  useEffect(() => {
    if (SalesByMonthDetailRes?.status === true) {
      setSalesByMonthDetail(SalesByMonthDetailRes?.data || []);
      setSalesByMonthDetailLoading(false);
    } else if (SalesByMonthDetailRes?.status === false) {
      setSalesByMonthDetailLoading(false);
      setSalesByMonthDetail([]);
    }
  }, [SalesByMonthDetailRes]);

  useEffect(() => {
    if (SalesByMonthGraphRes?.status === true) {
      const series_ = [];
      let labels_ = [];
      if (SalesByMonthGraphRes?.data?.length !== 0) {
        labels_ = SalesByMonthGraphRes?.data?.map((d) => d?.label);
        const name_ = Object.keys(SalesByMonthGraphRes?.data?.[0])?.filter(
          (d) => d?.includes("_label")
        );
        name_?.forEach((name) => {
          const name__ = name;
          series_.push({
            name: SalesByMonthGraphRes?.data?.[0]?.[name],
            data: SalesByMonthGraphRes?.data?.map(
              (d) => d?.[name__?.replace("_label", "")]
            ),
            type: "area",
          });
        });
      }
      setSalesByMonthGraph({
        series: series_ || [],
        label: labels_ || [],
      });
      setSalesByMonthGraphLoading(false);
    } else if (SalesByMonthGraphRes?.status === false) {
      setSalesByMonthGraphLoading(false);
      setSalesByMonthGraph({
        series: [],
        label: [],
      });
    }
  }, [SalesByMonthGraphRes]);

  const visibilityClass = (columnName) => {
    return columnConfig.includes(columnName) ? "" : "d-none";
  };

  return (
    <DashboardLayout>
      <div
        className="content d-flex flex-column flex-column-fluid"
        id="kt_content"
      >
        <div className="container-fluid" id="kt_content_container">
          {TopBarFilter(filter, setFilter, "Month")}
          <div className="row gx-5 gx-xl-5">
            <div className="col-xl-12 mb-5 mb-xl-5">
              <div className="card card-flush h-xl-100">
                <div className="card-header min-h-55px ">
                  <div className="container mt-2 gap-4">
                    <div className="row">
                      <div className="col-2">
                        <Select
                          style={{ width: "100%" }}
                          onChange={(e) => setGraphFilter(e)}
                          value={graphFilter || null}
                          options={[
                            {
                              label: "Parent ASIN",
                              value: "parent_asin",
                            },
                            {
                              label: "Child ASIN",
                              value: "child_asin",
                            },
                            {
                              label: "Title",
                              value: "title",
                            },
                            {
                              label: "Month",
                              value: "month",
                            },
                          ]}
                        />
                      </div>
                      <div className="col-8">
                        {graphFilter !== "month" &&
                          !salesByMonthGraphLoading && (
                            <Select
                              mode="multiple"
                              allowClear
                              style={{
                                width: "100%",
                              }}
                              size="large"
                              filterOption={selectFilter}
                              options={graphOptions}
                              onChange={(e) => setGraphSelected(e)}
                            />
                          )}
                      </div>
                      <div className="col-2">
                        <button
                          onClick={() => setGraphConfigOpen(true)}
                          className="btn btn-light btn-active-light-dark btn-sm fw-bolder me-3"
                        >
                          Configuration
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body px-4 py-4">
                  {salesByMonthGraphLoading ? (
                    <div className="h-225px">
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          margin: "auto",
                          width: "fit-content",
                          height: "fit-content",
                        }}
                      >
                        <Skeleton.Node active>
                          <DotChartOutlined
                            style={{
                              fontSize: 40,
                              color: "#bfbfbf",
                            }}
                          />
                        </Skeleton.Node>
                      </div>
                    </div>
                  ) : (
                    <Chart
                      options={{
                        dataLabels: {
                          enabled: false,
                        },
                        stroke: {
                          curve: "smooth",
                        },
                        labels: graphSelectedLabels || [],
                        xaxis: {
                          line: {
                            show: false,
                          },
                          labels: {
                            trim: true,
                            rotate: -45,
                            rotateAlways: false,
                            hideOverlappingLabels: true,
                          },
                        },
                        yaxis: {
                          labels: {
                            formatter: (value) => {
                              return value.toFixed(0);
                            },
                          },
                        },
                        tooltip: {
                          y: {
                            formatter: function (val, { seriesIndex, w }) {
                              const heading =
                                w?.config?.series[seriesIndex]?.name || "";
                              if (heading.includes("Sales")) {
                                return currencyFormat(val);
                              }
                              if (heading.includes("Percentage")) {
                                return percentageFormat(val);
                              }
                              return numberFormat(val);
                            },
                          },
                        },
                        colors: [
                          "#999",
                          "#29d07b",
                          "#bdc0e7",
                          "#3cbea1",
                          "#FF643C",
                          "#000",
                        ],
                      }}
                      series={graphSelectedSeries.filter((c) =>
                        graphColumnConfig.includes(c.name)
                      )}
                      type="area"
                      height={300}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row gx-5 gx-xl-5">
            <div className="col-xl-12 mb-5 mb-xl-5">
              <div className="card card-flush h-xl-100">
                <div className="card-body py-3 pt-5">
                  <div className="row g-3">
                    <Details
                      loading={salesByMonthDataLoading}
                      data={[
                        {
                          title: "Sum of Ordered Product Sales",
                          value: currencyFormat(
                            salesByMonthData?.totalOrderedProductSales
                          ),
                        },
                        {
                          title: "Sum of Sessions",
                          value: numberFormat(salesByMonthData?.totalSession),
                        },
                        {
                          title: "Sum of Session Percentage",
                          value: percentageFormat(
                            salesByMonthData?.totalSessionPercentage
                          ),
                        },
                        {
                          title: "Sum of Page Views",
                          value: numberFormat(salesByMonthData?.totalPageViews),
                        },
                        {
                          title: "Sum of Page Views Percentage",
                          value: percentageFormat(
                            salesByMonthData?.avgPageViewPercentage
                          ),
                        },
                        {
                          title: "Average of Buy Box",
                          value: percentageFormat(salesByMonthData?.avgBuyBox),
                        },
                        {
                          title: "Sum of Units Ordered",
                          value: numberFormat(
                            salesByMonthData?.totalUnitOrdered
                          ),
                        },
                        {
                          title: "Sum of Unit Session",
                          value: percentageFormat(
                            salesByMonthData?.avgUnitSession
                          ),
                        },
                        {
                          title: "Sum of Total Order Items",
                          value: numberFormat(
                            salesByMonthData?.totalOrderItems
                          ),
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-5 mb-xl-8">
                <div className="card-header border-bottom border-bottom-dashed">
                  <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bolder fs-3 mb-0">
                      Analytics by Category
                    </span>
                  </h3>
                  <div className="card-toolbar">
                    <button
                      onClick={() => setTableConfigOpen(true)}
                      className="btn btn-light btn-active-light-dark btn-sm fw-bolder me-3"
                      id="kt_drawer_example_basic_button"
                    >
                      {" "}
                      Configuration{" "}
                    </button>

                    <ExportToExcel
                      columns={["Month", "ASIN", "SKU"].concat(columns)}
                      rows={salesByMonthDetail
                        .reduce((acc, item) => {
                          acc = acc.concat(item.asin_data);
                          return acc;
                        }, [])
                        .map((r, key) => {
                          return {
                            ["Month"]: `${r.year}-${r.month_name}`,
                            ["ASIN"]: r?.child_asin,
                            ["SKU"]: r?.sku,
                            ["Sum of Units Ordered"]: numberFormat(
                              r?.total_ordered_units
                            ),
                            ["Sum of Ordered Product Sales"]: currencyFormat(
                              r?.total_ordered_product_sales
                            ),
                            ["Average of Buy Box"]: percentageFormat(
                              r?.avg_buy_box_percentage
                            ),
                            ["Sum of Unit Session "]: numberFormat(
                              r?.total_session
                            ),
                            ["Sum of Sessions Percentage"]: percentageFormat(
                              r?.avg_unit_session_percentage
                            ),
                            ["Sum of Page Views"]: numberFormat(
                              r?.total_page_views
                            ),
                            ["Sum of Session Percentage"]: percentageFormat(
                              r?.avg_session_percentage
                            ),
                            ["Sum of Total Order Items"]: numberFormat(
                              r?.total_order_items
                            ),
                            ["Sum of Page Views Percentage"]: percentageFormat(
                              r?.avg_page_view_percentage
                            ),
                          };
                        })}
                      fileName={"sales-data-by-month"}
                      loading={salesByMonthDetailLoading}
                    >
                      <button
                        onClick={() => setToggleExport(true)}
                        className="btn btn-light-danger btn-sm fw-bolder "
                      >
                        Export Data
                      </button>
                    </ExportToExcel>

                    <Modal
                      closable
                      maskClosable
                      destroyOnClose
                      onOk={() => {
                        // TODO
                        exportToExcel({
                          fileName: `sales-analytics-${exportBy}`,
                          loading: salesByMonthDetailLoading,
                          columns: [
                            "ROW LABELS",
                            "SUM OF ORDERED PRODUCT SALES",
                            "SUM OF SESSIONS",
                            "SUM OF SESSION PERCENTAGE",
                            "SUM OF PAGE VIEWS",
                            "SUM OF PAGE VIEWS PERCENTAGE",
                            "AVERAGE OF BUY BOX PERCENTAGE",
                            "SUM OF UNITS ORDERED",
                            "SUM OF UNIT SESSION PERCENTAGE",
                            "SUM OF TOTAL ORDER ITEMS",
                          ],
                          rows: salesByMonthDetail,
                        });
                      }}
                      onCancel={() => setToggleExport(false)}
                      title="Export Data"
                      open={toggleExport}
                    >
                      <Select
                        placeholder={"Export By"}
                        style={{ width: "100%" }}
                        onChange={handleChangeExport}
                        value={exportBy}
                        options={[
                          { value: "sku", label: "SKU" },
                          { value: "asin", label: "ASIN" },
                        ]}
                      />
                    </Modal>
                  </div>
                </div>
                <div className="card-body pt-2">
                  {salesByMonthDetailLoading ? (
                    <Loading />
                  ) : (
                    <div className="table-responsive">
                      <table
                        className="table align-middle table-row-dashed  table-row-gray-300 fs-7 gy-4 gx-5 border-top-d"
                        id
                      >
                        <thead>
                          <tr className="fw-bolder text-gray-800">
                            <th className="min-w-50px" />
                            <th className="min-w-275px">Row Labels</th>
                            <th
                              className={`${visibilityClass(
                                "Sum of Ordered Product Sales"
                              )} min-w-225px`}
                            >
                              Sum of Ordered Product Sales{" "}
                            </th>
                            <th
                              className={`${visibilityClass(
                                "Sum of Sessions"
                              )} min-w-150px`}
                            >
                              Sum of Sessions
                            </th>
                            <th
                              className={`${visibilityClass(
                                "Sum of Session Percentage"
                              )} min-w-225px`}
                            >
                              Sum of Session Percentage{" "}
                            </th>
                            <th
                              className={`${visibilityClass(
                                "Sum of Page Views"
                              )} min-w-175px`}
                            >
                              Sum of Page Views{" "}
                            </th>
                            <th
                              className={`${visibilityClass(
                                "Sum of Page Views Percentage"
                              )} min-w-250px`}
                            >
                              Sum of Page Views Percentage{" "}
                            </th>
                            <th
                              className={`${visibilityClass(
                                "Average of Buy Box"
                              )} min-w-150px`}
                            >
                              Average of Buy Box{" "}
                            </th>
                            <th
                              className={`${visibilityClass(
                                "Sum of Units Ordered"
                              )} min-w-200px`}
                            >
                              Sum of Units Ordered{" "}
                            </th>
                            <th
                              className={`${visibilityClass(
                                "Sum of Unit Session Percentage"
                              )} min-w-250px`}
                            >
                              Sum of Unit Session Percentage{" "}
                            </th>
                            <th
                              className={`${visibilityClass(
                                "Sum of Total Order Items"
                              )} min-w-225px`}
                            >
                              Sum of Total Order Items
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-700 fw-bold">
                          {salesByMonthDetail.length === 0 ? (
                            <tr>
                              <td colSpan={11}>
                                <NoData />
                              </td>
                            </tr>
                          ) : (
                            salesByMonthDetail?.map((d, i) => {
                              return (
                                <>
                                  <tr className>
                                    <td className>
                                      <FontAwesomeIcon
                                        className="las la-angle-down text-dark fs-4"
                                        icon={
                                          expand === i ? faAngleUp : faAngleDown
                                        }
                                        onClick={() => {
                                          setExpand((prev) =>
                                            prev === i ? setExpand(null) : i
                                          );
                                        }}
                                      />
                                    </td>
                                    <td>
                                      <a
                                        href="#"
                                        className="fw-boldest text-dark"
                                      >
                                        {d?.month_name}
                                      </a>
                                    </td>
                                    <td
                                      className={visibilityClass(
                                        "Sum of Ordered Product Sales"
                                      )}
                                    >
                                      {currencyFormat(
                                        d?.totalOrderedProductSales
                                      )}
                                    </td>
                                    <td
                                      className={visibilityClass(
                                        "Sum of Sessions"
                                      )}
                                    >
                                      {numberFormat(d?.totalSession)}
                                    </td>
                                    <td
                                      className={visibilityClass(
                                        "Sum of Session Percentage"
                                      )}
                                    >
                                      {percentageFormat(
                                        d?.totalSessionPercentage
                                      )}
                                    </td>
                                    <td
                                      className={visibilityClass(
                                        "Sum of Page Views"
                                      )}
                                    >
                                      {numberFormat(d?.totalPageViews)}</td>
                                    <td
                                      className={visibilityClass(
                                        "Sum of Page Views Percentage"
                                      )}
                                    >
                                      {percentageFormat(
                                        d?.avgPageViewPercentage
                                      )}
                                    </td>
                                    <td
                                      className={visibilityClass(
                                        "Average of Buy Box"
                                      )}
                                    >
                                      {percentageFormat(d?.avgBuyBox)}</td>
                                    <td
                                      className={visibilityClass(
                                        "Sum of Units Ordered"
                                      )}
                                    >
                                      {numberFormat(d?.totalUnitOrdered)}</td>
                                    <td
                                      className={visibilityClass(
                                        "Sum of Unit Session Percentage"
                                      )}
                                    >

                                      {percentageFormat(d?.avgUnitSession)}
                                    </td>
                                    <td
                                      className={visibilityClass(
                                        "Sum of Total Order Items"
                                      )}
                                    >
                                      {numberFormat(d?.totalOrderItems)}</td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={11}
                                      className="hiddenRow  bg-light bg-opacity-100"
                                    >
                                      {expand === i && (
                                        <div>
                                          <div className="table-responsive m-0">
                                            <table
                                              className="table align-middle table-row-gray-300 table-row-dashed fs-7 gy-4 gx-5 bg-white mb-0"
                                              id
                                            >
                                              <thead className="border-bottom border-bottom-dashed">
                                                <tr className="fw-bolder text-gray-800">
                                                  <th className="min-w-50px p-0" />
                                                  <th className="min-w-250px p-0" />
                                                  <th
                                                    className={`${visibilityClass(
                                                      "Sum of Ordered Product Sales"
                                                    )} min-w-225px p-0`}
                                                  />
                                                  <th
                                                    className={`${visibilityClass(
                                                      "Sum of Sessions"
                                                    )} min-w-150px p-0`}
                                                  />
                                                  <th
                                                    className={`${visibilityClass(
                                                      "Sum of Session Percentage"
                                                    )} min-w-225px p-0`}
                                                  />
                                                  <th
                                                    className={`${visibilityClass(
                                                      "Sum of Page Views"
                                                    )} min-w-175px p-0`}
                                                  />
                                                  <th
                                                    className={`${visibilityClass(
                                                      "Sum of Page Views Percentage"
                                                    )} min-w-250px p-0`}
                                                  />
                                                  <th
                                                    className={`${visibilityClass(
                                                      "Average of Buy Box"
                                                    )} min-w-150px p-0`}
                                                  />
                                                  <th
                                                    className={`${visibilityClass(
                                                      "Sum of Units Ordered"
                                                    )} min-w-200px p-0`}
                                                  />
                                                  <th
                                                    className={`${visibilityClass(
                                                      "Sum of Unit Session Percentage"
                                                    )} min-w-250px p-0`}
                                                  />
                                                  <th
                                                    className={`${visibilityClass(
                                                      "Sum of Total Order Items"
                                                    )} min-w-225px p-0`}
                                                  />
                                                </tr>
                                              </thead>
                                              <tbody className="text-gray-700 fw-bold">
                                                {d?.asin_data?.map((r, t) => {
                                                  return (
                                                    <tr key={r} data-key={0}>
                                                      <td />
                                                      <td>
                                                        <div className="fs-7">
                                                          <b className="one mb-2 ">
                                                            <Link
                                                              className="text-dark"
                                                              href={`https://amazon.com/dp/${r?.child_asin}`}
                                                              title="Click to view on Amazon"
                                                              target="_blank"
                                                            >
                                                              {r?.title}
                                                            </Link>
                                                          </b>
                                                          <span className="d-flex mt-0">
                                                            <b className="fw-boldest me-2 text-dark">
                                                              Parent ASIN:{" "}
                                                            </b>{" "}
                                                            {r?.parent_asin}
                                                          </span>
                                                          <span className="d-flex mt-1">
                                                            <b className="fw-boldest me-2 text-dark">
                                                              Child ASIN:{" "}
                                                            </b>{" "}
                                                            <Link
                                                              href={`https://amazon.com/dp/${r?.child_asin}`}
                                                              target="_blank"
                                                            >
                                                              {r?.child_asin}
                                                            </Link>
                                                          </span>
                                                          <span className="d-flex mt-1">
                                                            <b className="fw-boldest me-2 text-dark">
                                                              SKU:{" "}
                                                            </b>{" "}
                                                            {r?.sku}
                                                          </span>
                                                        </div>
                                                      </td>
                                                      <td
                                                        className={visibilityClass(
                                                          "Sum of Ordered Product Sales"
                                                        )}
                                                      >
                                                        {currencyFormat(
                                                          r?.total_ordered_product_sales
                                                        )}
                                                      </td>
                                                      <td
                                                        className={visibilityClass(
                                                          "Sum of Sessions"
                                                        )}
                                                      >
                                                        {numberFormat(
                                                          r?.total_session
                                                        )}
                                                      </td>
                                                      <td
                                                        className={visibilityClass(
                                                          "Sum of Session Percentage"
                                                        )}
                                                      >
                                                        {percentageFormat(
                                                          r?.avg_session_percentage
                                                        )}
                                                      </td>
                                                      <td
                                                        className={visibilityClass(
                                                          "Sum of Page Views"
                                                        )}
                                                      >
                                                        {numberFormat(
                                                          r?.total_page_views
                                                        )}
                                                      </td>
                                                      <td
                                                        className={visibilityClass(
                                                          "Sum of Page Views Percentage"
                                                        )}
                                                      >
                                                        {percentageFormat(
                                                          r?.avg_page_view_percentage
                                                        )}
                                                      </td>
                                                      <td
                                                        className={visibilityClass(
                                                          "Average of Buy Box"
                                                        )}
                                                      >
                                                        {percentageFormat(
                                                          r?.avg_buy_box_percentage
                                                        )}
                                                      </td>
                                                      <td
                                                        className={visibilityClass(
                                                          "Sum of Units Ordered"
                                                        )}
                                                      >
                                                        {numberFormat(
                                                          r?.total_ordered_units
                                                        )}
                                                      </td>
                                                      <td
                                                        className={visibilityClass(
                                                          "Sum of Unit Session Percentage"
                                                        )}
                                                      >
                                                        {percentageFormat(
                                                          r?.avg_unit_session_percentage
                                                        )}
                                                      </td>
                                                      <td
                                                        className={visibilityClass(
                                                          "Sum of Total Order Items"
                                                        )}
                                                      >
                                                        {numberFormat(
                                                          r?.total_order_items
                                                        )}
                                                      </td>
                                                    </tr>
                                                  );
                                                })}
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      )}
                                    </td>
                                  </tr>
                                </>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {tableConfigOpen && (
          <Drawer
            columnsList={columns}
            columnConfig={columnConfig}
            setColumnConfig={setColumnConfig}
            defaultConfig={columns}
            open={tableConfigOpen}
            onHide={() => {
              setTableConfigOpen(false);
            }}
          />
        )}

        {graphConfigOpen && (
          <Drawer
            columnsList={columns}
            columnConfig={graphColumnConfig}
            setColumnConfig={setGraphColumnConfig}
            defaultConfig={columns}
            open={graphConfigOpen}
            onHide={() => {
              setGraphConfigOpen(false);
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
