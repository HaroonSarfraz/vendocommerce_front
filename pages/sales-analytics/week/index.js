import dynamic from "next/dynamic";
import cloneDeep from "lodash/cloneDeep";
import { Select, Skeleton } from "antd";
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
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import {
  selectSalesWeekData,
  selectSalesWeekDetail,
  selectSalesWeekGraph,
} from "@/src/store/slice/salesByWeek.slice";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function SalesByWeek() {
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(null);
  const [filter, setFilter] = useState({
    week: [defaultWeek()],
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
    setGraphLoading(true);
    setTableLoading(true);
    setDetailsLoading(true);
    setGraphSelected([]);

    const { week, year } = filter;
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
  }, [filter]);

  useEffect(() => {
    const { week, year } = filter;
    setGraphLoading(true);
    setGraphSelected([]);

    dispatch(
      getSalesWeekGraph({
        search_year: year,
        search_week: week?.sort()?.join(","),
        graph_filter_type: graphFilter,
      })
    );
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
    tooltip: {},
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
                      <div className="col-10">
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
                      series={series}
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
                          value: isWeekList?.totalOrderedProductSales,
                        },
                        {
                          title: "Sum of Sessions",
                          value: isWeekList?.totalSession,
                        },
                        {
                          title: "Sum of Session Percentage",
                          value: isWeekList?.totalSessionPercentage,
                        },
                        {
                          title: "Sum of Page Views",
                          value: isWeekList?.totalPageViews,
                        },
                        {
                          title: "Sum of Page Views Percentage",
                          value: isWeekList?.avgPageViewPercentage,
                        },
                        {
                          title: "Average of Buy Box",
                          value: isWeekList?.avgBuyBox,
                        },
                        {
                          title: "Sum of Units Ordered",
                          value: isWeekList?.totalUnitOrdered,
                        },
                        {
                          title: "Sum of Unit Session",
                          value: isWeekList?.avgUnitSession,
                        },
                        {
                          title: "Sum of Total Order Items",
                          value: isWeekList?.totalOrderItems,
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
                    <button className="btn btn-light-danger btn-sm fw-bolder ">
                      Export Data
                    </button>
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
                            <th className="min-w-225px">
                              Sum of Ordered Product Sales{" "}
                            </th>
                            <th className="min-w-150px">Sum of Sessions</th>
                            <th className="min-w-225px">
                              Sum of Session Percentage{" "}
                            </th>
                            <th className="min-w-175px">Sum of Page Views </th>
                            <th className="min-w-250px">
                              Sum of Page Views Percentage{" "}
                            </th>
                            <th className="min-w-150px">Average of Buy Box </th>
                            <th className="min-w-200px">
                              Sum of Units Ordered{" "}
                            </th>
                            <th className="min-w-250px">
                              Sum of Unit Session Percentage{" "}
                            </th>
                            <th className="min-w-225px">
                              Sum of Total Order Items
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-700 fw-bold">
                          {isDetails?.map((d, i) => (
                            <>
                              <tr className>
                                <td className>
                                  <FontAwesomeIcon
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
                                </td>
                                <td>
                                  {d?.start_date}&nbsp;to&nbsp;{d?.end_date}
                                </td>
                                <td>
                                  <span className="fw-boldest text-dark">
                                    {d?.week_name}
                                  </span>
                                </td>
                                <td>{d?.totalOrderedProductSales}</td>
                                <td>{d?.totalSession}</td>
                                <td>{d?.totalSessionPercentage}</td>
                                <td>{d?.totalPageViews}</td>
                                <td>{d?.avgPageViewPercentage}</td>
                                <td>{d?.avgBuyBox}</td>
                                <td>{d?.totalUnitOrdered}</td>
                                <td>{d?.avgUnitSession}</td>
                                <td>{d?.totalOrderItems}</td>
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
                                            <th className="min-w-225px p-0" />
                                            <th className="min-w-150px p-0" />
                                            <th className="min-w-225px p-0" />
                                            <th className="min-w-175px p-0" />
                                            <th className="min-w-250px p-0" />
                                            <th className="min-w-150px p-0" />
                                            <th className="min-w-200px p-0" />
                                            <th className="min-w-250px p-0" />
                                            <th className="min-w-225px p-0" />
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
                                              <td>
                                                {r?.total_ordered_product_sales}
                                              </td>
                                              <td>{r?.total_session}</td>
                                              <td>
                                                {r?.avg_session_percentage}
                                              </td>
                                              <td>{r?.total_page_views}</td>
                                              <td>
                                                {r?.avg_page_view_percentage}
                                              </td>
                                              <td>
                                                {r?.avg_buy_box_percentage}
                                              </td>
                                              <td>{r?.total_ordered_units}</td>
                                              <td>
                                                {r?.avg_unit_session_percentage}
                                              </td>
                                              <td>{r?.total_order_items}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            </>
                          ))}
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
      </div>
    </DashboardLayout>
  );
}
