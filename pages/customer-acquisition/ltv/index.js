import dynamic from "next/dynamic";
import { useState } from "react";
import { TopBarFilter } from "@/src/components/sales-analytics/sales";
import Loading from "@/src/components/loading";
import ASINTable from "@/src/components/table";
import DashboardLayout from "@/src/layouts/DashboardLayout";

export default function SalesByMonth() {
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState({
    month: [],
    year: 2023,
  });

  const list = [
    {
      row_label: "SEP-2022",
      customers: "78",
      value: "0",
    },
    {
      row_label: "OCT-2022",
      customers: "268",
      value: "0",
    },
    {
      row_label: "NOV-2022",
      customers: "249",
      value: "0",
    },
    {
      row_label: "DEC-2022",
      customers: "240",
      value: "0",
    },
  ];

  const columns = [
    {
      title: "CUSTOMER MADE FIRST ORDER AT",
      width: 200,
      align: "center",
      render: (text) => {
        return <span>{text?.row_label}</span>;
      },
    },
    {
      title: "NUMBER OF NEW CUSTOMERS",
      width: 180,
      align: "center",
      render: (text) => {
        return <span>{text?.customers}</span>;
      },
    },
    {
      title: "MONTH0",
      width: 60,
      align: "center",
      render: (text) => {
        return <span>{`$${text?.value}`}</span>;
      },
    },
    {
      title: "MONTH1",
      width: 60,
      align: "center",
      render: (text) => {
        return <span>{`$${text?.value}`}</span>;
      },
    },
    {
      title: "MONTH2",
      width: 60,
      align: "center",
      render: (text) => {
        return <span>{`$${text?.value}`}</span>;
      },
    },
    {
      title: "MONTH3",
      width: 60,
      align: "center",
      render: (text) => {
        return <span>{`$${text?.value}`}</span>;
      },
    },
    {
      title: "MONTH4",
      width: 60,
      align: "center",
      render: (text) => {
        return <span>{`$${text?.value}`}</span>;
      },
    },
    {
      title: "MONTH5",
      width: 60,
      align: "center",
      render: (text) => {
        return <span>{`$${text?.value}`}</span>;
      },
    },
    {
      title: "MONTH6",
      width: 60,
      align: "center",
      render: (text) => {
        return <span>{`$${text?.value}`}</span>;
      },
    },
    {
      title: "MONTH7",
      width: 60,
      align: "center",
      render: (text) => {
        return <span>{`$${text?.value}`}</span>;
      },
    },
    {
      title: "MONTH8",
      width: 60,
      align: "center",
      render: (text) => {
        return <span>{`$${text?.value}`}</span>;
      },
    },
  ];

  return (
    <DashboardLayout>
      <div className="content d-flex flex-column flex-column-fluid">
        <div className="container-fluid">
          {TopBarFilter(filter, setFilter, "Month")}

          <div className="col-lg-12">
            <div className="card mb-7 pt-5">
              <div className="card-body pt-2">
                <div className="mb-5 d-flex flex-row justify-content-end">
                  <button className="btn btn-light btn-active-light-dark btn-sm fw-bolder me-3">
                    Export
                  </button>
                </div>

                {loading ? (
                  <Loading />
                ) : (
                  <ASINTable
                    columns={columns}
                    dataSource={list}
                    // ellipsis
                    rowKey="key"
                    loading={loading}
                    pagination={false}
                    scroll={{
                      x:
                        columns
                          ?.map((d) => d.width)
                          .reduce((a, b) => a + b, 0) + 300,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
