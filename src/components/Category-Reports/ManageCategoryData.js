import { useState } from "react";
import ASINTable from "../table";
import Loading from "../loading";
import Link from "next/link";
export default function ManageCategoryData() {
  const [loading, setLoading] = useState(false);
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
      title: "#",
      width: "80px",
      align: "center",
      render: (text) => {
        return <span>{text?.row_label}</span>;
      },
    },
    {
      title: "Name",
      width: "80px",
      align: "center",
      render: (text) => {
        return <span>{text?.customers}</span>;
      },
    },
    {
      title: "Created At",
      width: "120px",
      align: "center",
      render: (text) => {
        return <span>{text?.repeating_customer}</span>;
      },
    },
    {
      title: "Updated At",
      width: "130px",
      align: "center",
      render: (text) => {
        return <span>{text?.new_customer}</span>;
      },
    },
    {
      title: "Action",
      width: "90px",
      align: "center",
      render: (text) => {
        return <span>{`$${text?.ad_spends}`}</span>;
      },
    },
  ];

  return (
      <div className="content d-flex flex-column flex-column-fluid">
        <div className="container-fluid">
         
          <div className="col-lg-12">
            <div className="card mb-7 pt-5">
              <div className="card-body pt-2">
                <div className="mb-5 d-flex flex-row justify-content-between">
                  <h1>Category List</h1>
                 <Link href="/category-reports/manage-categories/create-category"><button className="btn btn-light btn-active-light-dark btn-sm fw-bolder me-3">
                    + Create New
                  </button>
                  </Link> 
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
  );
}
