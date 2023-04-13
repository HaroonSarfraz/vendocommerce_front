import { DotChartOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Graph({ loading, heading, chartData }) {
  return (
    <div className="card card-flush h-xl-100 fadeInRight">
      <div className="card-header min-h-55px d-flex flex-row justify-content-center">
        <h3 className="card-title">
          <span className="card-label fw-bolder text-dark">{heading}</span>
        </h3>
      </div>
      <div
        className="card-body px-4 py-4 chart-area"
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
                categories: ['wk1', 'wk2', 'wk3', 'wk4']
              },
              colors: ["#000", "#1BC5BD"],
            }}
            series={[
              {
                name: "asdsad",
                // data: Object.values(chartData?.[0] || {})?.map(
                //   (d) => d?.total_ordered_product_sales
                // ),
                data: [1,3,5,7]
              },
              {
                name: "vbvbn",
                // data: Object.values(chartData?.[0] || {})?.map(
                //   (d) => d?.total_ordered_product_sales
                // ),
                data: [2,4,6,8]
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
