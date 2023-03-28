/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { message } from 'antd'
import {
  TopBarFilter,
  SalesByWeek,
  ReportCallOuts,
  LSales,
  RSales,
  SalesBySKU,
} from "@/src/components/sales-analytics/sales";

import axios from "axios";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/src/constants/api";

const DashboardLayout = dynamic(() => import("@/src/layouts/DashboardLayout"), {
  ssr: false,
});

const getSalesGraphDataAction = (data, setData, push) => {
  const path = `get-sales-graph-data?search_year=${data?.search_year || ''}&search_week=${data?.search_week || ''}`;
  const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };

  axios
    .get(`${BASE_URL}/${path}`, { headers: headers })
    .then((res) => {
      if (res.data.status) {
        setData(res.data)
      } else {
        message.error(res.data.message);
      }
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        localStorage.clear();
        push("/login");
      } else {
        message.error(err?.response?.message || "Something Went Wrong.")
      }
    });
};

const getSalesReportCallOutsAction = (data, setData, push) => {
  const path = `get-sales-report-call-outs?search_year=${data?.search_year || ''}&search_week=${data?.search_week || ''}`;
  const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };

  axios
    .get(`${BASE_URL}/${path}`, {headers: headers})
    .then((res) => {
      if (res.data.status) {
        setData(res.data)
      } else {
        message.error(res.data.message);
      }
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        localStorage.clear();
        push("/login");
      } else {
        message.error(err?.response?.message || "Something Went Wrong.")
      }
    });
};

const getSalesByWeekDataAction = (data, setData, push) => {
  const path = `get-sales-by-week-data?search_year=${data?.search_year || ""}&search_week=${data?.search_week || ""}`;
  const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };

  axios
    .get(`${BASE_URL}/${path}`, {headers: headers})
    .then((res) => {
      if (res.data.status) {
        setData(res.data)
      } else {
        message.error(res.data.message);
      }
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        localStorage.clear();
        push("/login");
      } else {
        message.error(err?.response?.message || "Something Went Wrong.")
      }
    });
};

export default function Sales() {
  const { push } = useRouter();
  const [GetSalesGraphDataRes, setGetSalesGraphDataRes] = useState({});
  const [GetSalesByWeekDataRes, setGetSalesByWeekDataRes] = useState({});
  const [GetSalesReportCallOutsRes, setGetSalesReportCallOutsRes] = useState({});

  const [filter, setFilter] = useState({
    week: [],
    year: 2023,
  });

  const [chartData, setChartData] = useState({});
  const [reportData, setReportData] = useState({});
  const [tableList, setTableList] = useState([]);

  const [salesGraphLoading, setSalesGraphLoading] = useState(true);
  const [reportCallOutLoading, setReportCallOutLoading] = useState(true);
  const [salesByWeekLoading, setSalesByWeekLoading] = useState(true);

  useEffect(() => {
    if (GetSalesGraphDataRes?.status === true) {
      setChartData(GetSalesGraphDataRes?.data);
      setSalesGraphLoading(false);
    } else if (GetSalesGraphDataRes?.status === false) {
      setSalesGraphLoading(false);
    }
  }, [GetSalesGraphDataRes]);

  useEffect(() => {
    if (GetSalesReportCallOutsRes?.status === true) {
      setReportData(GetSalesReportCallOutsRes?.data?.[0] || {});
      setReportCallOutLoading(false);
    } else if (GetSalesReportCallOutsRes?.status === false) {
      setReportCallOutLoading(false);
    }
  }, [GetSalesReportCallOutsRes]);

  useEffect(() => {
    if (GetSalesByWeekDataRes?.status === true) {
      setTableList(Object.values(GetSalesByWeekDataRes?.data?.[0] || {}));
      setSalesByWeekLoading(false);
    } else if (GetSalesByWeekDataRes?.status === false) {
      setSalesByWeekLoading(false);
    }
  }, [GetSalesByWeekDataRes]);

  useEffect(() => {
    setSalesGraphLoading(true);
    setReportCallOutLoading(true);
    setSalesByWeekLoading(true);
    getSalesGraphDataAction({
      search_year: filter?.year,
      search_week: filter?.week?.join(","),
    }, setGetSalesGraphDataRes, push);
    getSalesReportCallOutsAction({
      search_year: filter?.year,
      search_week: filter?.week?.join(","),
    }, setGetSalesReportCallOutsRes, push);
    getSalesByWeekDataAction({
      search_year: filter?.year,
      search_week: filter?.week?.join(","),
    }, setGetSalesByWeekDataRes, push);
  }, [filter]);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <DashboardLayout>
      <div className="content d-flex flex-column flex-column-fluid">
        <div className="container-fluid" id="kt_content_container">
          {TopBarFilter(filter, setFilter, "Week")}
          <div className="row gx-5 gx-xl-5">
            <div
              className="col-xl-6 mb-5 mb-xl-5"
              data-select2-id="select2-data-17-s07q"
            >
              {SalesByWeek(handleChange, salesGraphLoading, chartData)}
            </div>
            <div className="col-xl-6 mb-5 mb-xl-5">
              {ReportCallOuts(reportData, reportCallOutLoading)}
            </div>
          </div>
          <div className="row gx-5 gx-xl-5">
            {LSales(reportData, salesByWeekLoading)}
            {RSales(reportData, salesByWeekLoading)}
          </div>
          {SalesBySKU(tableList, salesByWeekLoading)}
        </div>
      </div>
    </DashboardLayout>
  );
}
