import { DotChartOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Graph({ heading, loading, chartData, formatter, columns }) {
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
        ) : chartData.length > 0 ? (
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
                  formatter: function (val) {
                    return formatter(val);
                  },
                },
              },
              colors: ["#000", "#1BC5BD"],
            }}
            series={columns.map((column) => {
              return {
                name: column.name,
                data: Object.values(chartData || {})?.map(
                  (d) => d?.[column.data]
                ),
              };
            })}
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
