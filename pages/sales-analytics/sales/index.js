/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import {
  selectSalesByReportCallOuts,
  selectSalesByWeekData,
  selectSalesGraphData,
} from "@/src/store/slice/sales.slice";
import _ from "lodash";

export default function Sales() {
  const dispatch = useDispatch();
  const salesGraphData = useSelector(selectSalesGraphData);
  const salesByWeekData = useSelector(selectSalesByWeekData);
  const salesReportCallOuts = useSelector(selectSalesByReportCallOuts);

  const [filter, setFilter] = useState({
    week: _.range(1, defaultWeek() + 1),
    year: defaultYear(),
  });

  const [chartData, setChartData] = useState({});
  const [reportData, setReportData] = useState({});
  const [tableList, setTableList] = useState([]);

  const [salesGraphLoading, setSalesGraphLoading] = useState(true);
  const [reportCallOutLoading, setReportCallOutLoading] = useState(true);
  const [salesByWeekLoading, setSalesByWeekLoading] = useState(true);

  useEffect(() => {
    setChartData(salesGraphData?.data);
    setSalesGraphLoading(false);
  }, [salesGraphData]);

  useEffect(() => {
    setReportData(salesReportCallOuts?.data || {});
    setReportCallOutLoading(false);
  }, [salesReportCallOuts]);

  useEffect(() => {
    setTableList(Object.values(salesByWeekData?.data || []));
    setSalesByWeekLoading(false);
  }, [salesByWeekData]);

  useEffect(() => {
    if (filter.week.length > 0 && filter.year) {
      setSalesGraphLoading(true);
      setReportCallOutLoading(true);
      setSalesByWeekLoading(true);
      const time = setTimeout(() => {
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
      }, 600);
      // dispatch(
      //   getSalesByWeekData({
      //     search_year: filter?.year,
      //     search_week: filter?.week?.join(","),
      //   })
      // );
      return () => {
        clearTimeout(time);
      };
    }
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
