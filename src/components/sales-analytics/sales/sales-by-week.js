import { DotChartOutlined } from "@ant-design/icons";
import { Drawer, Modal, Select, Skeleton } from "antd";
import { cloneElement, useState } from "react";
import {
  currencyFormat,
  numberFormat,
  percentageFormat,
} from "@/src/helpers/formatting.helpers";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function SalesByWeek(loading, chartData) {
  const [open, setOpen] = useState(false);
  const [graphSelected, setGraphSelected] = useState(
    "sum_of_ordered_product_sales"
  );

  const options = [
    {
      value: "sum_of_ordered_product_sales",
      label: "Sales by week",
      formatter: currencyFormat,
    },
    {
      value: "sum_of_units_ordered",
      label: "Units by week",
      formatter: numberFormat,
    },
    {
      value: "sum_of_sessions",
      label: "Sessions by week",
      formatter: numberFormat,
    },
    {
      value: "conversion_rate",
      label: "Conversion By Week",
      formatter: percentageFormat,
    },
    {
      value: "average_of_buy_box_percentage",
      label: "Buy Box % By Week",
      formatter: percentageFormat,
    },
  ];

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
            onChange={(e) => setGraphSelected(e)}
            options={options}
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
          (() => {
            const chart = (
              <Chart
                options={{
                  chart: {
                    id: "sales-by-week",
                    toolbar: {
                      show: true,
                      tools: {
                        customIcons: [
                          {
                            icon: '<img src="/assets/fullscreen.svg" width="20">',
                            index: 4,
                            title: "Fullscreen",
                            class:
                              "apexcharts-reset-icon apexcharts-reset-icon apexcharts-reset-icon",
                            click: function (chart, options, e) {
                              setOpen(true);
                            },
                          },
                        ],
                      },
                    },
                  },
                  selection: {
                    enabled: true,
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  stroke: {
                    curve: "smooth",
                  },
                  xaxis: {
                    categories: Object.values(chartData || [])?.map(
                      (d) => d?.label
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
                        return options
                          .find((l) => l?.value == graphSelected)
                          ?.formatter(val);
                      },
                    },
                  },
                  colors: ["#000", "#1BC5BD"],
                }}
                series={[
                  {
                    name: options.find((l) => l?.value == graphSelected)?.label,
                    data: Object.values(chartData || [])?.map(
                      (d) => d?.[graphSelected] || 0
                    ),
                  },
                ]}
                type="area"
                height={300}
              />
            );
            return (
              <>
                {chart}
                <Drawer
                  title="Sales By Week Chart"
                  placement="top"
                  onClose={() => setOpen(false)}
                  open={open}
                  forceRender
                  height={"100vh"}
                >
                  {cloneElement(chart, {
                    height: (window.outerWidth / window.outerHeight) * 300,
                  })}
                </Drawer>
              </>
            );
          })()
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
