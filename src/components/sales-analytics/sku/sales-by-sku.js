// import Image from 'next/image';
import { Tooltip } from "antd";
import Loading from "../../loading";
import ASINTable from "../../table";
import Image from "rc-image";
import { NoDataSvg } from "@/src/assets";
import {
  currencyFormat,
  numberFormat,
  percentageFormat,
} from "@/src/helpers/formatting.helpers";

export default function SalesBySkuTable({ loading, list }) {
  const columns = [
    {
      title: "Row Labels",
      width: 500,
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
              <span className="text-dark fw-boldest  fs-6 one mb-1">
                <Tooltip row={2} rule title={text?.title}>
                  {text?.title || ""}
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
        return <span>{numberFormat(text?.astr_units_ordered_sum)}</span>;
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
        return <span>{currencyFormat(text?.ordered_product_sales_sum)}</span>;
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
        return (
          <span>{percentageFormat(text?.astr_buy_box_percentage_avg)}</span>
        );
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
        return (
          <span>{percentageFormat(text?.unit_session_percentage_avg)}</span>
        );
      },
    },
    {
      title: "Sum Of Sessions",
      width: 150,
      align: "left",
      ellipsis: true,
      sorter: (a, b) => a.astr_sessions_sum - b.astr_sessions_sum,
      render: (text) => {
        return <span>{numberFormat(text?.astr_sessions_sum)}</span>;
      },
    },
    {
      title: "Sum Of Page Views",
      width: 175,
      align: "left",
      ellipsis: true,
      sorter: (a, b) => a.astr_page_views_sum - b.astr_page_views_sum,
      render: (text) => {
        return <span>{numberFormat(text?.astr_page_views_sum)}</span>;
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
        return (
          <span>{percentageFormat(text?.astr_session_percentage_avg)}</span>
        );
      },
    },
    {
      title: "Sum Of Total Order Items",
      width: 200,
      align: "left",
      ellipsis: true,
      sorter: (a, b) => a.total_order_items_sum - b.total_order_items_sum,
      render: (text) => {
        return <span>{numberFormat(text?.total_order_items_sum)}</span>;
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
        return (
          <span>{percentageFormat(text?.astr_page_view_percentage_avg)}</span>
        );
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
              <div className="dropdown">
                <button
                  className="btn btn-light-danger fs-7 px-10 dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Export
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Export to csv
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Export to xlsx
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="card-body pt-0 px-4" style={{}}>
            {loading ? (
              <Loading />
            ) : list?.length != 0 ? (
              <ASINTable
                columns={columns}
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
              <NoDataSvg />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
