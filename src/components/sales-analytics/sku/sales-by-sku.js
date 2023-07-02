import { useState, useEffect } from "react";
import { Tooltip } from "antd";
import Loading from "../../loading";
import ASINTable from "../../table";
import Image from "rc-image";
import NoData from "@/src/components/no-data";
import {
  currencyFormat,
  numberFormat,
  percentageFormat,
} from "@/src/helpers/formatting.helpers";
import { ExportToExcel } from "@/src/hooks/Excelexport";
import Drawer from "@/src/components/drawer";
import {
  fetchConfigurations,
  updateConfigurations,
} from "@/src/api/configurations.api";

const configurationTableKey = "sales-by-sku-table";

export default function SalesBySkuTable({ loading, list }) {
  const [isOpen, setIsOpen] = useState(false);
  const [columnConfig, setColumnConfig] = useState([]);
  const [columnConfigLoaded, setColumnConfigLoaded] = useState(false);

  useEffect(() => {
    setColumnConfig(columns.slice(1).map((d) => d.title));

    fetchConfigurations(configurationTableKey)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          res.data?.length > 0 && setColumnConfig(res.data);
          setColumnConfigLoaded(true);
        }
      })
      .catch((_err) => {
        message.error("Something went wrong");
      });
  }, []);

  useEffect(() => {
    if (columnConfigLoaded && columnConfig.length > 0) {
      updateConfigurations(configurationTableKey, columnConfig);
    }
  }, [columnConfig]);

  const columns = [
    {
      title: "Row Labels",
      width: 320,
      fixed: "left",
      align: "left",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text) => {
        return (
          <div className="d-flex align-items-center position-relative">
            <div className="symbol symbol-75px me-5">
              <Image
                src={text?.image_urls || "/images/no-product-image.png"}
                onError={(ev) =>
                  (ev.target.src = "/images/no-product-image.png")
                }
                loading="lazy"
                style={{ objectFit: "contain" }}
                alt="product image"
                width={50}
                height={50}
              />
            </div>
            <div className="d-flex justify-content-start flex-column">
              <span className="text-dark fw-boldest fs-6 one mb-1">
                <Tooltip row={2} rule title={text?.title}>
                  {text?.title?.substring(0, 50) || ""}
                </Tooltip>
              </span>
              <span className="text-muted font-weight-bold  fs-12 d-flex mt-1">
                <div className="text-dark">
                  <b className="text-dark fw-boldest">Child ASIN:</b>{" "}
                  <a
                    className
                    href={`https://amazon.com/dp/${text?.child_asin}`}
                    title="View on Amazon"
                    target="_blank"
                  >
                    {text?.child_asin}
                  </a>
                </div>
              </span>
              <span className="text-muted font-weight-bold  fs-12 d-flex mt-1">
                <div className="text-dark">
                  <b className="text-dark fw-boldest">Parent ASIN:</b>{" "}
                  {text?.parent_asin}
                </div>
              </span>
              <span className="text-muted font-weight-bold  fs-12 d-flex mt-1">
                <div className="text-dark">
                  <b className="text-dark fw-boldest">SKU:</b> {text?.sku}
                </div>
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: "Sum Of Units Ordered",
      width: 175,
      align: "left",
      ellipsis: true,
      sorter: (a, b) => a.astr_units_ordered_sum - b.astr_units_ordered_sum,
      render: (text) => {
        return numberFormat(text?.astr_units_ordered_sum);
      },
    },
    {
      title: "Sum Of Ordered Product Sales",
      width: 225,
      align: "left",
      ellipsis: true,
      sorter: (a, b) =>
        a.ordered_product_sales_sum - b.ordered_product_sales_sum,
      render: (text) => {
        return currencyFormat(text?.ordered_product_sales_sum);
      },
    },
    {
      title: "Average Of Buy Box",
      width: 150,
      align: "left",
      ellipsis: true,
      sorter: (a, b) =>
        a.astr_buy_box_percentage_avg - b.astr_buy_box_percentage_avg,
      render: (text) => {
        return percentageFormat(text?.astr_buy_box_percentage_avg);
      },
    },
    {
      title: "Sum Of Unit Session",
      width: 150,
      align: "left",
      ellipsis: true,
      sorter: (a, b) =>
        a.unit_session_percentage_avg - b.unit_session_percentage_avg,
      render: (text) => {
        return percentageFormat(text?.unit_session_percentage_avg);
      },
    },
    {
      title: "Sum Of Sessions",
      width: 150,
      align: "left",
      ellipsis: true,
      sorter: (a, b) => a.astr_sessions_sum - b.astr_sessions_sum,
      render: (text) => {
        return numberFormat(text?.astr_sessions_sum);
      },
    },
    {
      title: "Sum Of Page Views",
      width: 175,
      align: "left",
      ellipsis: true,
      sorter: (a, b) => a.astr_page_views_sum - b.astr_page_views_sum,
      render: (text) => {
        return numberFormat(text?.astr_page_views_sum);
      },
    },
    {
      title: "Sum Of Session Percentage",
      width: 200,
      align: "left",
      ellipsis: true,
      sorter: (a, b) =>
        a.astr_session_percentage_avg - b.astr_session_percentage_avg,
      render: (text) => {
        return percentageFormat(text?.astr_session_percentage_avg);
      },
    },
    {
      title: "Sum Of Total Order Items",
      width: 200,
      align: "left",
      ellipsis: true,
      sorter: (a, b) => a.total_order_items_sum - b.total_order_items_sum,
      render: (text) => {
        return numberFormat(text?.total_order_items_sum);
      },
    },
    {
      title: "Sum Of Page Views Percentage",
      width: 225,
      align: "left",
      ellipsis: true,
      sorter: (a, b) =>
        a.astr_page_view_percentage_avg - b.astr_page_view_percentage_avg,
      render: (text) => {
        return percentageFormat(text?.astr_page_view_percentage_avg);
      },
    },
  ];

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bolder fs-3 mb-1">
                Sales by SKU
              </span>
            </h3>

            <div className="card-toolbar">
              <button
                onClick={() => setIsOpen(true)}
                className="btn btn-light btn-active-light-dark btn-sm fw-bolder me-3"
                id="kt_drawer_example_basic_button"
              >
                {" "}
                Configuration{" "}
              </button>
              <div className="dropdown">
                <ExportToExcel
                  columns={[
                    "ASIN",
                    "SKU",
                    "Title",
                    "Parent ASIN",
                    "Sum Of Units Ordered",
                    "Sum Of Ordered Product Sales",
                    "Average Of Buy Box",
                    "Sum Of Unit Session",
                    "Sum Of Sessions",
                    "Sum Of Page Views",
                    "Sum Of Session Percentage",
                    "Sum Of Total Order Items",
                    "Sum Of Page Views Percentage",
                  ]}
                  rows={list.map((text) => {
                    return {
                      ["ASIN"]: text?.child_asin,
                      ["SKU"]: text?.sku,
                      ["Title"]: text?.title,
                      ["Parent ASIN"]: text?.parent_asin,
                      ["Sum Of Units Ordered"]: numberFormat(
                        text?.astr_units_ordered_sum
                      ),
                      ["Sum Of Ordered Product Sales"]: currencyFormat(
                        text?.ordered_product_sales_sum
                      ),
                      ["Average Of Buy Box"]: percentageFormat(
                        text?.astr_buy_box_percentage_avg
                      ),
                      ["Sum Of Unit Session"]: percentageFormat(
                        text?.unit_session_percentage_avg
                      ),
                      ["Sum Of Sessions"]: numberFormat(
                        text?.astr_sessions_sum
                      ),
                      ["Sum Of Page Views"]: numberFormat(
                        text?.astr_page_views_sum
                      ),
                      ["Sum Of Session Percentage"]: percentageFormat(
                        text?.astr_session_percentage_avg
                      ),
                      ["Sum Of Total Order Items"]: numberFormat(
                        text?.total_order_items_sum
                      ),
                      ["Sum Of Page Views Percentage"]: percentageFormat(
                        text?.astr_page_view_percentage_avg
                      ),
                    };
                  })}
                  fileName={"sales-data-by-sku-"}
                  loading={loading}
                >
                  <button
                    className="btn btn-light-danger fs-7 px-10"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Export
                  </button>
                </ExportToExcel>
              </div>
            </div>
          </div>
          <div className="card-body pt-0 px-4" style={{}}>
            {loading ? (
              <Loading />
            ) : list?.length != 0 ? (
              <ASINTable
                columns={columns.filter(
                  (c) =>
                    c.title == "Row Labels" || columnConfig.includes(c.title)
                )}
                dataSource={list}
                rowKey="key"
                loading={loading}
                pagination={false}
                scroll={{
                  x:
                    columns?.map((d) => d.width).reduce((a, b) => a + b, 0) +
                    300,
                }}
              />
            ) : (
              <NoData />
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <Drawer
          columnsList={columns.slice(1).map((d) => d.title)}
          columnConfig={columnConfig}
          setColumnConfig={setColumnConfig}
          defaultConfig={columns.slice(1).map((d) => d.title)}
          open={isOpen}
          onHide={() => {
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
}
