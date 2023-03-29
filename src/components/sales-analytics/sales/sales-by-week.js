import { DotChartOutlined } from "@ant-design/icons";
import { Select, Skeleton } from "antd";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function SalesByWeek(handleChange, loading, chartData) {
  return (
    <div className="card card-flush h-xl-100 fadeInRight">
      <div className="card-header min-h-55px ">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder text-dark">Sales By Week</span>
        </h3>
        <div className="card-toolbar">
          <Select
            defaultValue="Sales by week"
            style={{ width: 200 }}
            onChange={handleChange}
            options={[
              {
                value: "total_ordered_product_sales",
                label: "Sales by week",
              },
              {
                value: "total_ordered_units",
                label: "Units by week",
              },
              {
                value: "total_session",
                label: "Sessions by week",
              },
              {
                value: "conversion_rate",
                label: "Conversion By Week",
              },
              {
                value: "avg_buy_box_percentage",
                label: "Buy Box % By Week",
              },
            ]}
          />
        </div>
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
        ) : (
          <Chart
            options={{
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: "smooth",
              },
              xaxis: {
                categories: Object.values(chartData?.[0] || {})?.map(
                  (d) => d?.week_name
                ),
              },
              colors: ["#000", "#1BC5BD"],
            }}
            series={[
              {
                name: "Sales",
                data: Object.values(chartData?.[0] || {})?.map(
                  (d) => d?.total_ordered_product_sales
                ),
              },
            ]}
            type="area"
            height={300}
          />
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
