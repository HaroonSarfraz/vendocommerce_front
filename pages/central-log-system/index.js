import DashboardLayout from "@/src/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ASINTable from "@/src/components/table";
import Loading from "@/src/components/loading";
import NoData from "@/src/components/no-data";
import Pagination from "@/src/components/pagination";
import { timeFormat, timeSince } from "@/src/helpers/formatting.helpers";
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
      label: "Flat file open listings data",
      value: "_GET_FLAT_FILE_OPEN_LISTINGS_DATA_",
    },
    { label: "Merchant listings data", value: "_GET_MERCHANT_LISTINGS_DATA_" },
    {
      label: "Merchant listings all data",
      value: "GET_MERCHANT_LISTINGS_ALL_DATA",
    },
    {
      label: "Merchant cancelled listings data",
      value: "_GET_MERCHANT_CANCELLED_LISTINGS_DATA_",
    },
    {
      label: "Converged flat file sold listings data",
      value: "_GET_CONVERGED_FLAT_FILE_SOLD_LISTINGS_DATA_",
    },
    {
      label: "Merchant listings defect data",
      value: "_GET_MERCHANT_LISTINGS_DEFECT_DATA_",
    },
    {
      label: "Flat file actionable order data",
      value: "_GET_FLAT_FILE_ACTIONABLE_ORDER_DATA_",
    },
    { label: "Flat file orders data", value: "_GET_FLAT_FILE_ORDERS_DATA_" },
    {
      label: "Converged flat file order report data",
      value: "_GET_CONVERGED_FLAT_FILE_ORDER_REPORT_DATA_",
    },
    {
      label: "Flat file all orders data by last update",
      value: "_GET_FLAT_FILE_ALL_ORDERS_DATA_BY_LAST_UPDATE_",
    },
    {
      label: "Flat file all orders data by order date general",
      value: "GET_FLAT_FILE_ALL_ORDERS_DATA_BY_ORDER_DATE_GENERAL",
    },
    {
      label: "FBA fulfillment removal order detail data",
      value: "_GET_FBA_FULFILLMENT_REMOVAL_ORDER_DETAIL_DATA_",
    },
    {
      label: "Amazon fulfilled shipments data",
      value: "_GET_AMAZON_FULFILLED_SHIPMENTS_DATA_",
    },
    {
      label: "FBA fulfillment customer shipment sales data",
      value: "_GET_FBA_FULFILLMENT_CUSTOMER_SHIPMENT_SALES_DATA_",
    },
    {
      label: "FBA fulfillment customer shipment promotion data",
      value: "GET_FBA_FULFILLMENT_CUSTOMER_SHIPMENT_PROMOTION_DATA",
    },
    { label: "AFN inventory data", value: "_GET_AFN_INVENTORY_DATA_" },
    {
      label: "AFN inventory data by country",
      value: "_GET_AFN_INVENTORY_DATA_BY_COUNTRY_",
    },
    {
      label: "FBA fulfillment inventory receipts data",
      value: "_GET_FBA_FULFILLMENT_INVENTORY_RECEIPTS_DATA_",
    },
    { label: "Reserved inventory data", value: "GET_RESERVED_INVENTORY_DATA" },
    {
      label: "FBA fulfillment monthly inventory data",
      value: "_GET_FBA_FULFILLMENT_MONTHLY_INVENTORY_DATA_",
    },
    {
      label: "FBA fulfillment inventory heaummary data",
      value: "_GET_FBA_FULFILLMENT_INVENTORY_HEALTH_DATA_",
    },
    {
      label: "FBA estimated fba fees txt data",
      value: "_GET_FBA_ESTIMATED_FBA_FEES_TXT_DATA_",
    },
    {
      label: "Date range financial transaction data",
      value: "_GET_DATE_RANGE_FINANCIAL_TRANSACTION_DATA_",
    },
    {
      label: "V2 settlement report data flat file",
      value: "GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE",
    },
    { label: "FBA reimbursements data", value: "GET_FBA_REIMBURSEMENTS_DATA" },
    {
      label: "FBA fulfillment customer returns data",
      value: "GET_FBA_FULFILLMENT_CUSTOMER_RETURNS_DATA",
    },
    {
      label: "FBA fulfillment customer shipment replacement data",
      value: "_GET_FBA_FULFILLMENT_CUSTOMER_SHIPMENT_REPLACEMENT_DATA_",
    },
    { label: "Seller feedback data", value: "_GET_SELLER_FEEDBACK_DATA_" },
    {
      label: "V1 seller performance report",
      value: "_GET_V1_SELLER_PERFORMANCE_REPORT_",
    },
    {
      label: "Sales and traffic report",
      value: "GET_SALES_AND_TRAFFIC_REPORT",
    },
    {
      label: "Referral fee preview report",
      value: "GET_REFERRAL_FEE_PREVIEW_REPORT",
    },
    {
      label: "Ads product report",
      value: "AdsProductReport",
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
      width: 150,
      align: "left",
      key: "report_type",
      sorter: true,
      render: (text) => {
        return (
          <b>
            {report_types.find((r) => r.value === text?.report_type)?.label ||
              text?.report_type}
          </b>
        );
      },
    },
    {
      title: "Final Status",
      width: 120,
      align: "left",
      key: "overall_status",
      render: (text) => {
        return <span>{reportStatus(text) || "N/A"}</span>;
      },
    },
    {
      title: "Marketplace",
      width: 120,
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
      title: "Data Fetching Time",
      width: 130,
      align: "left",
      render: (text) => {
        return (
          <div>
            <span>{`${timeFormat(text.data_start_time)} to`}</span>
            <br />
            <span>{timeFormat(text.data_end_time)}</span>
            <br />
          </div>
        );
      },
    },
    {
      title: "Processing Time",
      width: 130,
      align: "left",
      render: (text) => {
        return (
          <div>
            <span>{`${timeFormat(text.processing_start_time)} to`}</span>
            <br />
            <span>{timeFormat(text.processing_end_time)}</span>
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
