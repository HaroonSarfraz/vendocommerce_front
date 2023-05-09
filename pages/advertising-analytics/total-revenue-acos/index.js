import { useState } from "react";
import dynamic from "next/dynamic";
import TopBarFilter from "@/src/components/advertising-analytics/top-bar-filter";
import Graph from "@/src/components/advertising-analytics/total-revenue/Graph";
import Drawers from "@/src/components/advertising-analytics/total-revenue/Drawer";
import Loading from "@/src/components/loading";
import ASINTable from "@/src/components/table";
import DashboardLayout from "@/src/layouts/DashboardLayout";

export default function Users() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [filter, setFilter] = useState({
    week: [],
    year: 2023,
  });

  const list = [];

  const columns = [
    {
      title: "WEEK",
      width: "80px",
      align: "center",
      // render: (text) => {
      //   return <span>{text?.week_name}</span>;
      // },
    },
    {
      title: "SPEND",
      width: "80px",
      align: "center",
      // render: (text) => {
      //   return <span>{text?.week_name}</span>;
      // },
    },
    {
      title: "SPEND CHG",
      width: "120px",
      align: "center",
      // render: (text) => {
      //   return <span>{text?.week_name}</span>;
      // },
    },
    {
      title: "AD REVENUE",
      width: "130px",
      align: "center",
      // render: (text) => {
      //   return <span>{text?.week_name}</span>;
      // },
    },
    {
      title: "AD CHG",
      width: "90px",
      align: "center",
      // render: (text) => {
      //   return <span>{text?.week_name}</span>;
      // },
    },
    {
      title: "ORGANIC SALES",
      width: "150px",
      align: "center",
      // render: (text) => {
      //   return <span>{text?.week_name}</span>;
      // },
    },
    {
      title: "ORGANIC CHG",
      width: "140px",
      align: "center",
      // render: (text) => {
      //   return <span>{text?.week_name}</span>;
      // },
    },
    {
      title: "TOTAL SALES",
      width: "130px",
      align: "center",
      // render: (text) => {
      //   return <span>{text?.week_name}</span>;
      // },
    },
    {
      title: "TOTAL ACOS",
      width: "120px",
      align: "center",
      // render: (text) => {
      //   return <span>{text?.week_name}</span>;
      // },
    },
    {
      title: "IMPRESSIONS",
      width: "130px",
      align: "center",
      // render: (text) => {
      //   return <span>{text?.week_name}</span>;
      // },
    },
    {
      title: "CLICKS",
      width: "90px",
      align: "center",
      // render: (text) => {
      //   return <span>{text?.week_name}</span>;
      // },
    },
    {
      title: "TOTAL UNIT ORDERS",
      width: "180px",
      align: "center",
      // render: (text) => {
      //   return <span>{text?.week_name}</span>;
      // },
    },
    {
      title: "BRANDED SPEND",
      width: "160px",
      align: "center",
      // render: (text) => {
      //   return <span>{text?.week_name}</span>;
      // },
    },
    {
      title: "BRANDED SALES",
      width: "160px",
      align: "center",
      // render: (text) => {
      //   return <span>{text?.week_name}</span>;
      // },
    },
    {
      title: "BRANDED ROAS",
      width: "160px",
      align: "center",
      // render: (text) => {
      //   return <span>{text?.week_name}</span>;
      // },
    },
    {
      title: "NON BRANDED SPEND",
      width: "200px",
      align: "center",
      // render: (text) => {
      //   return <span>{text?.week_name}</span>;
      // },
    },
    {
      title: "NON BRANDED SALES",
      width: "200px",
      align: "center",
      // render: (text) => {
      //   return <span>{text?.week_name}</span>;
      // },
    },
    {
      title: "NON BRANDED ROAS",
      width: "200px",
      align: "center",
      // render: (text) => {
      //   return <span>{text?.week_name}</span>;
      // },
    },
  ];

  return (
    <DashboardLayout>
      <div className="content d-flex flex-column flex-column-fluid">
        <div className="container-fluid">
          {TopBarFilter(filter, setFilter, "Week")}

          <Graph loading={false} chartData={true} />

          <div className="mt-5 col-lg-12">
            <div className="card mb-7 pt-5">
              <div className="card-body pt-2">
                <div className="mb-5 d-flex flex-row justify-content-end">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="btn btn-light btn-active-light-dark btn-sm fw-bolder me-3"
                  >
                    Configuration
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
        {isOpen && (
          <Drawers
            data={columns}
            open={isOpen}
            onHide={() => setIsOpen(false)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
