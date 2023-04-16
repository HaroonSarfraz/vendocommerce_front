import { Skeleton } from "antd";
import dynamic from "next/dynamic";
import { DotChartOutlined } from "@ant-design/icons";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Graph({ loading, chartData }) {
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
                // categories: Object.values(chartData?.[0] || {})?.map(
                //   (d) => d?.week_name
                // ),
                categories: [
                  "week1",
                  "week2",
                  "week3",
                  "week4",
                  "week5",
                  "week6",
                ],
              },
              colors: ["#000", "#1BC5BD"],
            }}
            series={[
              {
                name: "Spend",
                // data: Object.values(chartData?.[0] || {})?.map(
                //   (d) => d?.total_ordered_product_sales
                // ),
                data: [0, 0, 0, 0, 0, 0],
              },
              {
                name: "Spend Change",
                data: [0, 0, 0, 0, 0, 0],
              },
              {
                name: "Ad Revenue",
                data: [0, 0, 0, 0, 0, 0],
              },
              {
                name: "Ad Change",
                data: [0, 0, 0, 0, 0, 0],
              },
              {
                name: "Organic Sales",
                data: [0, 0, 0, 0, 0, 0],
              },
              {
                name: "Organic Change",
                data: [0, 0, 0, 0, 0, 0],
              },
              {
                name: "Total Sales",
                data: [0, 0, 0, 0, 0, 0],
              },
              {
                name: "Total ACoS",
                data: [0, 0, 0, 0, 0, 0],
              },
              {
                name: "Impressions",
                data: [0, 0, 0, 0, 0, 0],
              },
              {
                name: "Clicks",
                data: [0, 0, 0, 0, 0, 0],
              },
              {
                name: "Toatl Unit Orders",
                data: [0, 0, 0, 0, 0, 0],
              },
              {
                name: "Branded Spend",
                data: [0, 0, 0, 0, 0, 0],
              },
              {
                name: "Branded Sales",
                data: [0, 0, 0, 0, 0, 0],
              },
              {
                name: "Non-Branded Spend",
                data: [0, 0, 0, 0, 0, 0],
              },
              {
                name: "Non-Branded Sales",
                data: [0, 0, 0, 0, 0, 0],
              },
              {
                name: "Branded ROAS",
                data: [0, 0, 0, 0, 0, 0],
              },
              {
                name: "Non-Branded ROAS",
                data: [0, 0, 0, 0, 0, 0],
              },
            ]}
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
