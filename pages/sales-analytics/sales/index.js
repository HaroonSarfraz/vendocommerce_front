/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import dynamic from "next/dynamic";
import { defaultWeek, defaultYear } from "@/src/config";
import {
  getSalesGraphData,
  getSalesByWeekData,
  getSalesReportCallOuts,
} from "@/src/services/sales.services";
import {
  TopBarFilter,
  SalesByWeek,
  ReportCallOuts,
  LSales,
  RSales,
  SalesBySKU,
} from "@/src/components/sales-analytics/sales";
import DashboardLayout from "@/src/layouts/DashboardLayout";

export default function Sales() {
  const dispatch = useDispatch();
  const salesGraphData = useSelector((state) => state.sales.salesGraphData);
  const salesByWeekData = useSelector((state) => state.sales.salesByWeekData);
  const salesReportCallOuts = useSelector((state) => state.sales.salesReportCallOuts);

  const [filter, setFilter] = useState({
    week: [defaultWeek()],
    year: defaultYear(),
  });

  const [chartData, setChartData] = useState({});
  const [reportData, setReportData] = useState({});
  const [tableList, setTableList] = useState([]);

  const [salesGraphLoading, setSalesGraphLoading] = useState(true);
  const [reportCallOutLoading, setReportCallOutLoading] = useState(true);
  const [salesByWeekLoading, setSalesByWeekLoading] = useState(true);

  useEffect(() => {
    if (salesGraphData?.status === true) {
      setChartData(salesGraphData?.data);
      setSalesGraphLoading(false);
    } else if (salesGraphData?.status === false) {
      setSalesGraphLoading(false);
    }
  }, [salesGraphData]);

  useEffect(() => {
    if (salesReportCallOuts?.status === true) {
      setReportData(salesReportCallOuts?.data || {});
      setReportCallOutLoading(false);
    } else if (salesReportCallOuts?.status === false) {
      setReportCallOutLoading(false);
    }
  }, [salesReportCallOuts]);

  useEffect(() => {
    if (salesByWeekData?.status === true) {
      setTableList(Object.values(salesByWeekData?.data || []));
      setSalesByWeekLoading(false);
    } else if (salesByWeekData?.status === false) {
      setSalesByWeekLoading(false);
    }
  }, [salesByWeekData]);

  useEffect(() => {
    setSalesGraphLoading(true);
    setReportCallOutLoading(true);
    setSalesByWeekLoading(true);

    dispatch(
      getSalesGraphData({
        search_year: filter?.year,
        search_week: filter?.week?.join(","),
      })
    );
    dispatch(
      getSalesReportCallOuts({
        search_year: filter?.year,
        search_week: filter?.week?.join(","),
      })
    );
    // dispatch(
    //   getSalesByWeekData({
    //     search_year: filter?.year,
    //     search_week: filter?.week?.join(","),
    //   })
    // );
  }, [filter]);

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
              {SalesByWeek(salesGraphLoading, chartData)}
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
