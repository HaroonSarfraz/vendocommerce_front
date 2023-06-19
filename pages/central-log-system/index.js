import DashboardLayout from "@/src/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ASINTable from "@/src/components/table";
import Loading from "@/src/components/loading";
import NoData from "@/src/components/no-data";
import Pagination from "@/src/components/pagination";
import { timeInterval, timeFormat, timeSince } from "@/src/helpers/formatting.helpers";
import { selectReportLogs } from "@/src/store/slice/reportLogs.slice";
import { getReportLogs } from "@/src/services/reportLogs.services";
import _ from "lodash";
import { DefaultPerPage } from "@/src/config";
import TopBarFilter from "@/src/components/central-log-system/top-bar-filter";
import dayjs from "dayjs";
import moment from "moment";

export default function ProductReportPage() {
  const [tableLoading, setTableLoading] = useState(true);

  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const reportLogs = useSelector(selectReportLogs);

  const [filter, setFilter] = useState({
    page: 1,
    totalPage: 1,
    pageSize: DefaultPerPage,
    orderBy: "id",
    order: "desc",
    marketplace: "",
    reportType: "",
  });

  const [dateFilter, setDateFilter] = useState([dayjs().add(-7, "d"), dayjs()]);

  useEffect(() => {
    let time = setTimeout(() => {
      setTableLoading(true);
      dispatch(
        getReportLogs({
          ...filter,
          startDate: moment(dateFilter[0]["$d"]).format("YYYY-MM-DD"),
          endDate: moment(dateFilter[1]["$d"]).format("YYYY-MM-DD"),
        })
      );
    }, 600);
    return () => {
      clearTimeout(time);
    };
  }, [filter, dateFilter]);

  useEffect(() => {
    if (reportLogs?.status === true) {
      setList(reportLogs.data);
      setTableLoading(false);
    } else if (reportLogs.status === false) {
      setList([]);
      setTableLoading(false);
    }
  }, [reportLogs]);

  const handleChange = (_pagination, _filters, sorter) => {
    setFilter({
      ...filter,
      orderBy: sorter?.columnKey,
      order: sorter?.order?.slice(0, -3),
    });
  };

  const onPageNo = (e) => {
    setFilter({ ...filter, page: e });
  };

  const onPerPage = (e) => {
    setFilter({ ...filter, page: 1, pageSize: e });
  };

  const report_types = [
    {
      label: "All",
      value: "",
    },
    {
      label: "Ads product report",
      value: "AdsProductReport",
    },
    {
      label: "Campaign brand report",
      value: "CampaignBrandReport",
    },
    {
      label: "Campaign display report",
      value: "CampaignDisplayReport",
    },
    {
      label: "Merchant listings all data",
      value: "GET_MERCHANT_LISTINGS_ALL_DATA",
    },
    {
      label: "Sales and traffic report",
      value: "GET_SALES_AND_TRAFFIC_REPORT",
    },
    {
      label: "Amazon fulfilled shipments data general",
      value: "GET_AMAZON_FULFILLED_SHIPMENTS_DATA_GENERAL",
    },
  ];

  const reportStatus = (report_log) => {
    if (report_log.status === 0) {
      return "waiting for amazon";
    } else {
      return [
        "In-process",
        "Got error from Amazon",
        "Done",
        "Error while processing",
      ][report_log.report_request_status - 2];
    }
  };

  const columns = [
    {
      title: "#",
      width: 60,
      align: "left",
      sorter: true,
      key: "id",
      render: (text) => {
        return <span>{text?.id}</span>;
      },
    },
    {
      title: "Report Type",
      width: 180,
      align: "left",
      key: "report_type",
      sorter: true,
      render: (text) => {
        return (
          <span>
            {report_types.find((r) => r.value === text?.report_type)?.label ||
              text?.report_type}
          </span>
        );
      },
    },
    {
      title: "Final Status",
      width: 120,
      align: "left",
      key: "overall_status",
      render: (text) => {
        return <b>{reportStatus(text) || "N/A"}</b>;
      },
    },
    {
      title: "Marketplace",
      width: 100,
      align: "left",
      key: "marketplace",
      sorter: true,
      render: (text) => {
        return <span>{text?.marketplace || "N/A"}</span>;
      },
    },
    {
      title: "Initiated At",
      width: 130,
      align: "left",
      key: "created_at",
      sorter: true,
      render: (text) => {
        return (
          <div>
            <span>{timeFormat(text.created_at)}</span>
            <br />
            <span className="timeStampColor">
              ({timeSince(text.created_at)})
            </span>
          </div>
        );
      },
    },
    {
      title: "Data Fetching Date",
      width: 125,
      align: "left",
      render: (text) => {
        return (
          <div>
            {text.data_start_time !== text.data_end_time && (
              <div>
                <span>{`${moment(new Date(text.data_start_time)).format("MM/DD/YYYY")} to`}</span>
                <br />
              </div>
            )}
            <span>{moment(new Date(text.data_end_time)).format("MM/DD/YYYY")}</span>
            <br />
          </div>
        )
      },
    },
    {
      title: "Processing Time",
      width: 110,
      align: "left",
      render: (text) => {
        return (
          <div>
            <span>{text.processing_end_time ? timeInterval(text.processing_start_time, text.processing_end_time) : "N/A"}</span>
          </div>
        );
      },
    },
  ];

  return (
    <DashboardLayout>
      <div className="content d-flex flex-column flex-column-fluid">
        <div className="container-fluid">
          {TopBarFilter(
            filter,
            setFilter,
            dateFilter,
            setDateFilter,
            report_types
          )}
          <div className="row mb-4">
            <div className="col-lg-12"></div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card mb-7 pt-5">
                <div className="card-body pt-2">
                  <div className="mb-5 d-flex flex-row justify-content-between">
                    <h1>Central Log System</h1>
                  </div>
                  {tableLoading ? (
                    <Loading />
                  ) : list?.length != 0 ? (
                    <ASINTable
                      columns={columns}
                      dataSource={list}
                      ellipsis
                      onChange={handleChange}
                      rowKey="key"
                      loading={tableLoading}
                      pagination={false}
                      scroll={{
                        x:
                          columns
                            ?.map((d) => d.width)
                            .reduce((a, b) => a + b, 0) + 300,
                      }}
                    />
                  ) : (
                    <div>
                      <NoData />
                    </div>
                  )}
                  <Pagination
                    loading={tableLoading || list?.length === 0}
                    pageSize={parseInt(filter.pageSize)}
                    page={parseInt(filter.page)}
                    totalPage={parseInt(reportLogs.count)}
                    onPerPage={onPerPage}
                    onPageNo={onPageNo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}