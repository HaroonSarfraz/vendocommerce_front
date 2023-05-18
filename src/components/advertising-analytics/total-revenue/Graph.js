import { Skeleton } from "antd";
import dynamic from "next/dynamic";
import { DotChartOutlined } from "@ant-design/icons";
import {
  currencyFormat,
  numberFormat,
  percentageFormat,
} from "@/src/helpers/formatting.helpers";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Graph({ loading, chartData, columnConfig }) {
  return (
    <div className="card card-flush h-xl-100 fadeInRight">
      <div
        className="card-body px-5 py-5 chart-area"
        style={{ position: "relative" }}
      >
        {loading ? (
          <div className="h-200px">
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
        ) : chartData ? (
          <Chart
            options={{
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: "smooth",
              },
              xaxis: {
                categories: Object.values(chartData || {})?.map(
                  (d) => "WK" + d?.week
                ),
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
                    const heading = w?.config?.series[seriesIndex]?.name || "";
                    if (
                      heading.includes("Change") ||
                      heading.includes("ACoS")
                    ) {
                      return percentageFormat(val);
                    }
                    if (
                      heading.includes("Sales") ||
                      heading.includes("Spend") ||
                      heading.includes("Revenue")
                    ) {
                      return currencyFormat(val);
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
            }}
            series={[
              {
                name: "Spend",
                title: "SPEND",
                data: Object.values(chartData || {})?.map((d) => d?.twSpend),
              },
              {
                name: "Spend Change",
                title: "SPEND CHG",
                data: Object.values(chartData || {})?.map(
                  (d) => d?.spendChange
                ),
              },
              {
                name: "Ad Revenue",
                title: "AD REVENUE",
                data: Object.values(chartData || {})?.map((d) => d?.twRevenue),
              },
              {
                name: "Ad Change",
                title: "AD CHG",
                data: Object.values(chartData || {})?.map((d) => d?.adChange),
              },
              {
                name: "Organic Sales",
                title: "ORGANIC SALES",
                data: Object.values(chartData || {})?.map(
                  (d) => d?.organicSales
                ),
              },
              {
                name: "Organic Change",
                title: "ORGANIC CHG",
                data: Object.values(chartData || {})?.map(
                  (d) => d?.organicSalesChange
                ),
              },
              {
                name: "Total Sales",
                title: "TOTAL SALES",
                data: Object.values(chartData || {})?.map((d) => d?.totalSales),
              },
              {
                name: "Total ACoS",
                title: "TOTAL ACOS",
                data: Object.values(chartData || {})?.map(
                  (d) => d?.ACoS_percentage
                ),
              },
              {
                name: "Impressions",
                title: "IMPRESSIONS",
                data: Object.values(chartData || {})?.map((d) => d?.impression),
              },
              {
                name: "Clicks",
                title: "CLICKS",
                data: Object.values(chartData || {})?.map((d) => d?.clicks),
              },
              {
                name: "Total Unit Orders",
                title: "TOTAL UNIT ORDERS",
                data: Object.values(chartData || {})?.map(
                  (d) => d?.totalUnitOrder
                ),
              },
              {
                name: "Branded Spend",
                title: "BRANDED SPEND",
                data: Object.values(chartData || {})?.map(
                  (d) => d?.brandedSpends
                ),
              },
              {
                name: "Branded Sales",
                title: "BRANDED SALES",
                data: Object.values(chartData || {})?.map(
                  (d) => d?.brandedSales
                ),
              },
              {
                name: "Non-Branded Spend",
                title: "NON BRANDED SPEND",
                data: Object.values(chartData || {})?.map(
                  (d) => d?.nonBrandedSpends
                ),
              },
              {
                name: "Non-Branded Sales",
                title: "NON BRANDED SALES",
                data: Object.values(chartData || {})?.map(
                  (d) => d?.nonBrandedSales
                ),
              },
              {
                name: "Branded ROAS",
                title: "BRANDED ROAS",
                data: Object.values(chartData || {})?.map(
                  (d) => d?.brandedRoAS
                ),
              },
              {
                name: "Non-Branded ROAS",
                title: "NON BRANDED ROAS",
                data: Object.values(chartData || {})?.map(
                  (d) => d?.nonBrandedRoAS
                ),
              },
            ].filter((c) => columnConfig.includes(c.title))}
            type="area"
            height={300}
          />
        ) : (
          <h4 className="text-center">Graph data not found</h4>
        )}
        <div className="resize-triggers">
          <div className="expand-trigger">
            <div style={{ width: "535px", height: "327px" }} />
          </div>
          <div className="contract-trigger" />
        </div>
      </div>
    </div>
  );
}
