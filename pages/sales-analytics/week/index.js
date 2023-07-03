import dynamic from "next/dynamic";
import _ from "lodash";
import cloneDeep from "lodash/cloneDeep";
import { message, Select, Skeleton, Tooltip } from "antd";
import { useState, useEffect } from "react";
import { DotChartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { defaultWeek, defaultYear } from "@/src/config";
import { TopBarFilter } from "@/src/components/sales-analytics/sales";
import Details from "@/src/components/Details";
import Loading from "@/src/components/loading";
import {
  getSalesWeekData,
  getSalesWeekDetailList,
  getSalesWeekGraph,
} from "@/src/services/salesByWeek.services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faFileExcel,
} from "@fortawesome/free-solid-svg-icons";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import {
  selectSalesWeekData,
  selectSalesWeekDetail,
  selectSalesWeekGraph,
} from "@/src/store/slice/salesByWeek.slice";
import {
  currencyFormat,
  numberFormat,
  percentageFormat,
} from "@/src/helpers/formatting.helpers";
import NoData from "@/src/components/no-data";
import { ExportToExcel, exportToExcel } from "@/src/hooks/Excelexport";
import Drawer from "@/src/components/drawer";
import {
  fetchConfigurations,
  updateConfigurations,
} from "@/src/api/configurations.api";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const configurationTableKey = "sales-by-week-table";
const configurationGraphKey = "sales-by-week-graph";

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

export default function SalesByWeek() {
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(null);
  const [filter, setFilter] = useState({
    week: _.range(1, defaultWeek()),
    year: defaultYear(),
  });

  const [graphFilter, setGraphFilter] = useState("week");
  const [graphSelected, setGraphSelected] = useState([]);

  const [graphLoading, setGraphLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(true);

  const [isGraph, setIsGraph] = useState({});
  const [isDetails, setIsDetails] = useState([]);
  const [isWeekList, setIsWeekList] = useState({});

  const SalesWeekDetailsListRes = useSelector(selectSalesWeekDetail);
  const SalesWeekGraphRes = useSelector(selectSalesWeekGraph);
  const SalesByWeekDataRes = useSelector(selectSalesWeekData);

  const [tableConfigOpen, setTableConfigOpen] = useState(false);
  const [graphConfigOpen, setGraphConfigOpen] = useState(false);
  const [columnConfig, setColumnConfig] = useState([]);
  const [columnConfigLoaded, setColumnConfigLoaded] = useState(false);
  const [graphColumnConfig, setGraphColumnConfig] = useState([]);
  const [graphColumnConfigLoaded, setGraphColumnConfigLoaded] = useState(false);

  const graphOptions = isGraph?.label?.map((name, index) => {
    return { label: name, value: index };
  });

  const graphSelectedLabels = isGraph?.label?.filter((_, index) => {
    return (
      graphFilter === "week" ||
      graphSelected.length === 0 ||
      graphSelected.includes(index)
    );
  });

  const graphSelectedSeries = cloneDeep(isGraph?.series)?.map((data) => {
    data.data = data.data?.filter((_, index) => {
      return (
        graphFilter === "week" ||
        graphSelected.length === 0 ||
        graphSelected.includes(index)
      );
    });
    return data;
  });

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
    const { week, year } = filter;
    if (week.length > 0 && year) {
      setGraphLoading(true);
      setTableLoading(true);
      setDetailsLoading(true);
      setGraphSelected([]);

      const time = setTimeout(() => {
        dispatch(
          getSalesWeekDetailList({
            search_year: year,
            search_week: week?.sort()?.join(","),
          })
        );
        dispatch(
          getSalesWeekGraph({
            search_year: year,
            search_week: week?.sort()?.join(","),
            graph_filter_type: graphFilter,
          })
        );
        dispatch(
          getSalesWeekData({
            search_week: week?.join(","),
            search_year: year,
          })
        );
      }, 600);

      return () => {
        clearTimeout(time);
      };
    }
  }, [filter]);

  useEffect(() => {
    const { week, year } = filter;
    if (week.length > 0 && year) {
      setGraphLoading(true);
      setGraphSelected([]);

      const time = setTimeout(() => {
        dispatch(
          getSalesWeekGraph({
            search_year: year,
            search_week: week?.sort()?.join(","),
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
    if (SalesWeekGraphRes?.status === true) {
      const series_ = [];
      let labels_ = [];
      if (SalesWeekGraphRes?.data?.length !== 0) {
        labels_ = SalesWeekGraphRes?.data?.map((d) => d?.label);
        const name_ = Object.keys(SalesWeekGraphRes?.data?.[0])?.filter((d) =>
          d?.includes("_label")
        );
        name_?.forEach((name) => {
          const name__ = name;
          series_.push({
            name: SalesWeekGraphRes?.data?.[0]?.[name],
            data: SalesWeekGraphRes?.data?.map(
              (d) => d?.[name__?.replace("_label", "")]
            ),
            type: "line",
          });
        });
      }
      setIsGraph({
        series: series_ || [],
        label: labels_ || [],
      });
      setGraphLoading(false);
    } else if (SalesWeekGraphRes?.status === false) {
      setIsGraph({});
      setGraphLoading(false);
    }
  }, [SalesWeekGraphRes]);

  useEffect(() => {
    if (SalesWeekDetailsListRes?.status === true) {
      setIsDetails(SalesWeekDetailsListRes?.data);
      setDetailsLoading(false);
    } else if (SalesWeekDetailsListRes?.status === false) {
      setIsDetails([]);
      setDetailsLoading(false);
    }
  }, [SalesWeekDetailsListRes]);

  useEffect(() => {
    if (SalesByWeekDataRes?.status === true) {
      setIsWeekList(SalesByWeekDataRes?.data || {});
      setTableLoading(false);
    } else if (SalesByWeekDataRes?.status === false) {
      setTableLoading(false);
      setIsWeekList({});
    }
  }, [SalesByWeekDataRes]);

  let series = graphSelectedSeries || [];
  let options = {
    chart: {
      height: 300,
      type: "line",
      stacked: false,
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    plotOptions: {
      bar: {
        // columnWidth: '50%'
      },
    },

    fill: {
      opacity: [1, 0.0, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.0,
        opacityTo: 0.0,
        stops: [0, 100, 100, 100],
      },
    },
    labels: graphSelectedLabels || [],
    markers: {
      size: 0,
    },
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
        formatter: (value, amy) => {
          return numberFormat(value);
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val, { seriesIndex, w }) {
          const heading = w?.config?.series[seriesIndex]?.name || "";
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
      "#e86c86",
      "#f55420",
      "#0abdd5",
      "#0cb774",
      "#29d07b",
      "#bdc0e7",
      "#3cbea1",
      "#108a9c",
      "#16050f",
    ],
    grid: {
      row: {
        colors: ["transparent", "transparent"],
        opacity: 0.3,
      },
      borderColor: "#f1f1f1",
      strokeDashArray: 4,
    },
  };

  const visibilityClass = (columnName) => {
    return columnConfig.includes(columnName) ? "" : "d-none";
  };

  return (
    <DashboardLayout>
      <div className="content d-flex flex-column flex-column-fluid">
        <div className="container-fluid" id="kt_content_container">
          {TopBarFilter(filter, setFilter, "Week")}
          <div className="row gx-5 gx-xl-5">
            {/*begin::Col*/}
            <div className="col-xl-12 mb-5 mb-xl-5">
              <div className="card card-flush h-xl-100">
                <div className="card-header min-h-55px ">
                  <div className="container mt-2 gap-4">
                    <div className="row">
                      <div className="col-2">
                        <Select
                          onChange={(e) => setGraphFilter(e)}
                          value={graphFilter || null}
                          style={{ width: "100%" }}
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
                              label: "Week",
                              value: "week",
                            },
                          ]}
                        />
                      </div>
                      <div className="col-8">
                        {graphFilter !== "week" && !graphLoading && (
                          <Select
                            mode="multiple"
                            allowClear
                            style={{
                              width: "100%",
                            }}
                            size="large"
                            filterOption={(input, option) =>
                              option.label
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
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
                <div
                  className="card-body px-4 py-4"
                  style={{ position: "relative" }}
                >
                  {graphLoading ? (
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
                    <ReactApexChart
                      options={options}
                      series={series.filter((c) =>
                        graphColumnConfig.includes(c.name)
                      )}
                      type="line"
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
                      loading={tableLoading}
                      data={[
                        {
                          title: "Sum of Ordered Product Sales",
                          value: currencyFormat(
                            isWeekList?.totalOrderedProductSales
                          ),
                        },
                        {
                          title: "Sum of Sessions",
                          value: numberFormat(isWeekList?.totalSession),
                        },
                        {
                          title: "Sum of Session Percentage",
                          value: percentageFormat(
                            isWeekList?.totalSessionPercentage
                          ),
                        },
                        {
                          title: "Sum of Page Views",
                          value: numberFormat(isWeekList?.totalPageViews),
                        },
                        {
                          title: "Sum of Page Views Percentage",
                          value: percentageFormat(
                            isWeekList?.avgPageViewPercentage
                          ),
                        },
                        {
                          title: "Average of Buy Box",
                          value: percentageFormat(isWeekList?.avgBuyBox),
                        },
                        {
                          title: "Sum of Units Ordered",
                          value: numberFormat(isWeekList?.totalUnitOrdered),
                        },
                        {
                          title: "Sum of Unit Session",
                          value: percentageFormat(isWeekList?.avgUnitSession),
                        },
                        {
                          title: "Sum of Total Order Items",
                          value: numberFormat(isWeekList?.totalOrderItems),
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
                {/*begin::Header*/}
                <div className="card-header border-bottom border-bottom-dashed">
                  <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bolder fs-3 mb-0">
                      Analytics by Week
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
                      sheets={[
                        {
                          title: "main",
                          columns: [
                            "Week",
                            "Sum of Ordered Product Sales",
                            "Sum of Sessions",
                            "Sum of Session Percentage",
                            "Sum of Page Views",
                            "Sum of Page Views Percentage",
                            "Average of Buy Box",
                            "Sum of Units Ordered",
                            "Sum of Unit Session Percentage",
                            "Sum of Total Order Items",
                          ],
                          rows: isDetails.map((d) => {
                            return {
                              ["Week"]: d?.week_name,
                              ["Sum of Ordered Product Sales"]: currencyFormat(
                                d?.totalOrderedProductSales
                              ),
                              ["Sum of Sessions"]: numberFormat(
                                d?.totalSession
                              ),
                              ["Sum of Session Percentage"]: percentageFormat(
                                d?.totalSessionPercentage
                              ),
                              ["Sum of Page Views"]: numberFormat(
                                d?.totalPageViews
                              ),
                              ["Sum of Page Views Percentage"]:
                                percentageFormat(d?.avgPageViewPercentage),
                              ["Average of Buy Box"]: percentageFormat(
                                d?.avgBuyBox
                              ),
                              ["Sum of Units Ordered"]: numberFormat(
                                d?.totalUnitOrdered
                              ),
                              ["Sum of Unit Session Percentage"]:
                                percentageFormat(d?.avgUnitSession),
                              ["Sum of Total Order Items"]: numberFormat(
                                d?.totalOrderItems
                              ),
                            };
                          }),
                        },
                        ...isDetails.map((d) => {
                          return {
                            title: d?.week_name,
                            columns: [
                              "Title",
                              "Parent ASIN",
                              "Child ASIN",
                              "SKU",
                              "Sum of Ordered Product Sales",
                              "Sum of Sessions",
                              "Sum of Session Percentage",
                              "Sum of Page Views",
                              "Sum of Page Views Percentage",
                              "Average of Buy Box",
                              "Sum of Units Ordered",
                              "Sum of Unit Session Percentage",
                              "Sum of Total Order Items",
                            ],
                            fileName: `sales-by-week{${d?.start_date}}__{${d?.end_date}}`,
                            loading: detailsLoading,
                            rows: d?.asin_data.map((item) => {
                              return {
                                Title: item.title,
                                "Parent ASIN": item.parent_asin,
                                "Child ASIN": item.child_asin,
                                SKU: item.sku,
                                ["Sum of Ordered Product Sales"]:
                                  currencyFormat(
                                    item?.total_ordered_product_sales
                                  ),
                                ["Sum of Sessions"]: numberFormat(
                                  item?.total_session
                                ),
                                ["Sum of Session Percentage"]: percentageFormat(
                                  item?.total_session_percentage
                                ),
                                ["Sum of Page Views"]: numberFormat(
                                  item?.total_page_views
                                ),
                                ["Sum of Page Views Percentage"]:
                                  percentageFormat(
                                    item?.avg_page_view_percentage
                                  ),
                                ["Average of Buy Box"]: percentageFormat(
                                  item?.avg_buy_box
                                ),
                                ["Sum of Units Ordered"]: numberFormat(
                                  item?.total_unit_ordered
                                ),
                                ["Sum of Unit Session Percentage"]:
                                  percentageFormat(item?.avg_unit_session),
                                ["Sum of Total Order Items"]: numberFormat(
                                  item?.total_order_items
                                ),
                              };
                            }),
                          };
                        }),
                      ]}
                      fileName={"sales-data-by-week"}
                      loading={detailsLoading}
                    >
                      <button className="btn btn-light-danger btn-sm fw-bolder ">
                        Export Data
                      </button>
                    </ExportToExcel>
                  </div>
                </div>
                {/*end::Header*/}
                {/*begin::Body*/}
                <div className="card-body pt-2">
                  {/*begin::Table container*/}
                  {detailsLoading ? (
                    <Loading />
                  ) : (
                    <div className="table-responsive">
                      <table
                        className="table align-middle table-row-dashed  table-row-gray-300 fs-7 gy-4 gx-5 border-top-d"
                        id
                      >
                        <thead>
                          <tr className="fw-boldest text-dark">
                            <th className="min-w-50px" />
                            <th className="min-w-275px">Week Date Range</th>
                            <th className="min-w-150px">Row Labels</th>
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
                          {isDetails.length === 0 ? (
                            <tr>
                              <td colSpan={12}>
                                <NoData />
                              </td>
                            </tr>
                          ) : (
                            isDetails?.map((d, i) => (
                              <>
                                <tr className>
                                  <td
                                    className={"d-flex"}
                                    style={{ border: "none" }}
                                  >
                                    <FontAwesomeIcon
                                      style={{ marginRight: "10px" }}
                                      icon={
                                        expand === i ? faAngleUp : faAngleDown
                                      }
                                      color="#181C32"
                                      onClick={() => {
                                        setExpand((prev) =>
                                          prev === i ? setExpand(null) : i
                                        );
                                      }}
                                    />
                                    <Tooltip title={`Export`}>
                                      <FontAwesomeIcon
                                        icon={faFileExcel}
                                        color="#181C32"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          exportToExcel({
                                            columns: [
                                              "Week",
                                              "Title",
                                              "Parent ASIN",
                                              "Child ASIN",
                                              "SKU",
                                              "Sum of Ordered Product Sales",
                                              "Sum of Sessions",
                                              "Sum of Session Percentage",
                                              "Sum of Page Views",
                                              "Sum of Page Views Percentage",
                                              "Average of Buy Box",
                                              "Sum of Units Ordered",
                                              "Sum of Unit Session Percentage",
                                              "Sum of Total Order Items",
                                            ],
                                            fileName: `sales-by-week{${d?.start_date}}__{${d?.end_date}}`,
                                            loading: detailsLoading,
                                            rows: d?.asin_data.map((item) => {
                                              return {
                                                Week: item.week,
                                                Title: item.title,
                                                "Parent ASIN": item.parent_asin,
                                                "Child ASIN": item.child_asin,
                                                SKU: item.sku,
                                                ["Sum of Ordered Product Sales"]:
                                                  currencyFormat(
                                                    item?.total_ordered_product_sales
                                                  ),
                                                ["Sum of Sessions"]:
                                                  numberFormat(
                                                    item?.total_session
                                                  ),
                                                ["Sum of Session Percentage"]:
                                                  percentageFormat(
                                                    item?.total_session_percentage
                                                  ),
                                                ["Sum of Page Views"]:
                                                  numberFormat(
                                                    item?.total_page_views
                                                  ),
                                                ["Sum of Page Views Percentage"]:
                                                  percentageFormat(
                                                    item?.avg_page_view_percentage
                                                  ),
                                                ["Average of Buy Box"]:
                                                  percentageFormat(
                                                    item?.avg_buy_box
                                                  ),
                                                ["Sum of Units Ordered"]:
                                                  numberFormat(
                                                    item?.total_unit_ordered
                                                  ),
                                                ["Sum of Unit Session Percentage"]:
                                                  percentageFormat(
                                                    item?.avg_unit_session
                                                  ),
                                                ["Sum of Total Order Items"]:
                                                  numberFormat(
                                                    item?.total_order_items
                                                  ),
                                              };
                                            }),
                                          });
                                        }}
                                      />
                                    </Tooltip>
                                  </td>
                                  <td>
                                    {d?.start_date}&nbsp;to&nbsp;{d?.end_date}
                                  </td>
                                  <td>
                                    <span className="fw-boldest text-dark">
                                      {d?.week_name}
                                    </span>
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
                                    {numberFormat(d?.totalPageViews)}
                                  </td>
                                  <td
                                    className={visibilityClass(
                                      "Sum of Page Views Percentage"
                                    )}
                                  >
                                    {percentageFormat(d?.avgPageViewPercentage)}
                                  </td>
                                  <td
                                    className={visibilityClass(
                                      "Average of Buy Box"
                                    )}
                                  >
                                    {percentageFormat(d?.avgBuyBox)}
                                  </td>
                                  <td
                                    className={visibilityClass(
                                      "Sum of Units Ordered"
                                    )}
                                  >
                                    {numberFormat(d?.totalUnitOrdered)}
                                  </td>
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
                                    {numberFormat(d?.totalOrderItems)}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    colSpan={12}
                                    className="hiddenRow  bg-light bg-opacity-100"
                                  >
                                    {expand === i && (
                                      <div className="table-responsive m-0">
                                        <table
                                          className="table align-middle table-row-gray-300 table-row-dashed fs-7 gy-4 gx-5 bg-white mb-0"
                                          id
                                        >
                                          {/*begin::Table body*/}
                                          <thead className="border-bottom border-bottom-dashed">
                                            <tr className="fw-bolder text-gray-800">
                                              <th className="min-w-50px p-0" />
                                              <th className="min-w-275px p-0" />
                                              <th className="min-w-150px p-0" />
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
                                            {d?.asin_data?.map((r, t) => (
                                              <tr data-key={t} key={t}>
                                                <td />
                                                <td>
                                                  <div className="fs-7">
                                                    <b className="one mb-2 ">
                                                      <a
                                                        className="text-dark"
                                                        href="https://amazon.com/dp/B09M88F21R"
                                                        title="Click to view on Amazon"
                                                        target="_blank"
                                                      >
                                                        {r?.title}
                                                      </a>
                                                    </b>
                                                    <span className="d-flex mt-0">
                                                      <b className="fw-boldest me-2 text-dark">
                                                        Parent ASIN:{" "}
                                                      </b>
                                                      {r?.parent_asin}
                                                    </span>
                                                    <span className="d-flex mt-1">
                                                      <b className="fw-boldest me-2 text-dark">
                                                        Child ASIN:{" "}
                                                      </b>{" "}
                                                      <a href="#">
                                                        {r?.child_asin}
                                                      </a>
                                                    </span>
                                                    <span className="d-flex mt-1">
                                                      <b className="fw-boldest me-2 text-dark">
                                                        SKU:{" "}
                                                      </b>
                                                      {r?.sku}
                                                    </span>
                                                  </div>
                                                </td>
                                                <td />
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
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              </>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                {/*begin::Body*/}
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
