import dynamic from "next/dynamic";
import { useState } from "react";
import { TopBarFilter } from "@/src/components/sales-analytics/sales";
import Details from "@/src/components/customer-acquisition/Details";
import Loading from "@/src/components/loading";
import ASINTable from "@/src/components/table";

const DashboardLayout = dynamic(() => import("@/src/layouts/DashboardLayout"), {
  ssr: false,
});

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
      repeating_customer: "0",
      new_customer: "78",
      ad_spends: "0",
      cac: "0",
    },
    {
      row_label: "OCT-2022",
      customers: "279",
      repeating_customer: "11",
      new_customer: "268",
      ad_spends: "0",
      cac: "0",
    },
    {
      row_label: "NOV-2022",
      customers: "279",
      repeating_customer: "30",
      new_customer: "249",
      ad_spends: "0",
      cac: "0",
    },
    {
      row_label: "DEC-2022",
      customers: "273",
      repeating_customer: "33",
      new_customer: "240",
      ad_spends: "0",
      cac: "0",
    },
  ];

  const columns = [
    {
      title: "ROW LABEL",
      width: "80px",
      align: "center",
      render: (text) => {
        return <span>{text?.row_label}</span>;
      },
    },
    {
      title: "CUSTOMERS",
      width: "80px",
      align: "center",
      render: (text) => {
        return <span>{text?.customers}</span>;
      },
    },
    {
      title: "REPEATING CUSOMER",
      width: "120px",
      align: "center",
      render: (text) => {
        return <span>{text?.repeating_customer}</span>;
      },
    },
    {
      title: "NEW CUSTOMER",
      width: "130px",
      align: "center",
      render: (text) => {
        return <span>{text?.new_customer}</span>;
      },
    },
    {
      title: "AD SPENDS",
      width: "90px",
      align: "center",
      render: (text) => {
        return <span>{`$${text?.ad_spends}`}</span>;
      },
    },
    {
      title: "CAC",
      width: "100px",
      align: "center",
      render: (text) => {
        return <span>{`$${text?.cac}`}</span>;
      },
    },
  ];

  return (
    <DashboardLayout>
      <div className="content d-flex flex-column flex-column-fluid">
        <div className="container-fluid">
          {TopBarFilter(filter, setFilter, "Month")}

          <div className="row gx-5 gx-xl-5">
            <div className="col-xl-12 mb-5 mb-xl-5">
              <div className="card card-flush h-xl-100">
                <div className="card-body py-3 pt-5">
                  <div className="row g-3">
                    <Details
                      loading={loading}
                      data={[
                        {
                          title: "Customers",
                          value: 2366,
                        },
                        {
                          title: "Repeating Customer",
                          value: 299,
                        },
                        {
                          title: "New Customer",
                          value: 2067,
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                    ellipsis
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
