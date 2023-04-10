import dynamic from "next/dynamic";
import { Select, Skeleton } from "antd";
import { useState, useEffect } from "react";
import { DotChartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
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
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const DashboardLayout = dynamic(() => import("@/src/layouts/DashboardLayout"), {
  ssr: false,
});

export default function SalesByWeek() {
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(null);
  const [filter, setFilter] = useState({
    week: [],
    year: 2023,
  });

  const [graphFilter, setGraphFilter] = useState("child_asin");

  const [graphLoading, setGraphLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(true);

  const [isGraph, setIsGraph] = useState({});
  const [isDetails, setIsDetails] = useState([]);
  const [isWeekList, setIsWeekList] = useState({});

  const SalesWeekDetailsListRes = useSelector(
    (state) => state.salesByWeek.salesWeekDetailList
  );
  const SalesWeekGraphRes = useSelector(
    (state) => state.salesByWeek.salesWeekGraph
  );
  const SalesByWeekDataRes = useSelector(
    (state) => state.salesByWeek.salesWeekData
  );

  useEffect(() => {
    setGraphLoading(true);
    setTableLoading(true);
    setDetailsLoading(true);

    const { week, year } = filter;
    dispatch(
      getSalesWeekDetailList({
        search_year: year,
        search_week: week?.join(","),
      })
    );
    dispatch(
      getSalesWeekGraph({
        graph_filter_type: graphFilter,
        search_year: year,
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
      setIsWeekList(SalesByWeekDataRes?.data?.[0] || {});
      setTableLoading(false);
    } else if (SalesByWeekDataRes?.status === false) {
      setTableLoading(false);
      setIsWeekList({});
    }
  }, [SalesByWeekDataRes]);

  let series = isGraph?.series || [];
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
    labels: isGraph?.label || [],
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
    yaxis: {
      title: {
        text: "",
      },
      min: 0,
    },
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
                  <div className="d-flex flex-stack flex-wrap gap-4">
                    <div className="position-relative ">
                      <Select
                        onChange={(e) => setGraphFilter(e)}
                        value={graphFilter || null}
                        size="large"
                        placeholder="Week"
                        className="min-w-200px"
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
                    <div className="position-relative">
                      <button
                        onClick={() => {
                          setGraphLoading(true);
                          dispatch(
                            getSalesWeekGraph({
                              graph_filter_type: graphFilter,
                              search_year: filter?.year,
                            })
                          );
                        }}
                        className="btn btn-danger btn-sm fs-7 ps-5 px-5"
                      >
                        <FontAwesomeIcon icon={faSearch} />
                      </button>
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
                          value: isWeekList?.total_ordered_product_sales,
                        },
                        {
                          title: "Sum of Sessions",
                          value: isWeekList?.total_session,
                        },
                        {
                          title: "Sum of Session Percentage",
                          value: isWeekList?.avg_session_percentage,
                        },
                        {
                          title: "Sum of Page Views",
                          value: isWeekList?.total_page_views,
                        },
                        {
                          title: "Sum of Page Views Percentage",
                          value: isWeekList?.avg_page_view_percentage,
                        },
                        {
                          title: "Average of Buy Box",
                          value: isWeekList?.avg_buy_box_percentage,
                        },
                        {
                          title: "Sum of Units Ordered",
                          value: isWeekList?.total_ordered_units,
                        },
                        {
                          title: "Sum of Unit Session",
                          value: isWeekList?.avg_unit_session_percentage,
                        },
                        {
                          title: "Sum of Total Order Items",
                          value: isWeekList?.total_order_items,
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
                                <td>{d?.total_ordered_product_sales}</td>
                                <td>{d?.total_session}</td>
                                <td>{d?.avg_session_percentage}</td>
                                <td>{d?.total_page_views}</td>
                                <td>{d?.avg_page_view_percentage}</td>
                                <td>{d?.avg_buy_box_percentage}</td>
                                <td>{d?.total_ordered_units}</td>
                                <td>{d?.avg_unit_session_percentage}</td>
                                <td>{d?.total_order_items}</td>
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
                                                    <a href>{r?.child_asin}</a>
                                                  </span>
                                                  <span className="d-flex mt-1">
                                                    <b className="fw-boldest me-2 text-dark">
                                                      SKU:{" "}
                                                    </b>
                                                    {r?.sku}
                                                  </span>
                                                </div>
                                              </td>
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
