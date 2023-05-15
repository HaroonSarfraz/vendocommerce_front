import { useEffect, useState } from "react";
import TopBarFilter from "@/src/components/advertising-analytics/top-bar-filter";
import Graph from "@/src/components/advertising-analytics/total-revenue/Graph";
import Drawers from "@/src/components/advertising-analytics/total-revenue/Drawer";
import Loading from "@/src/components/loading";
import ASINTable from "@/src/components/table";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import { useSelector, useDispatch } from "react-redux";
import { defaultWeek, defaultYear } from "@/src/config";
import { getAdvertising } from "@/src/services/advertising.services";
import { selectAdvertisements } from "@/src/store/slice/advertising.slice";
import _ from "lodash";

export default function TotalRevenueAcos() {
  const dispatch = useDispatch();

  const advertisements = useSelector(selectAdvertisements);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [filter, setFilter] = useState({
    week: _.range(1, defaultWeek() + 1),
    year: defaultYear(),
  });

  const [advertisementsData, setAdvertisementsData] = useState({});

  useEffect(() => {
    if (advertisements?.status === true) {
      setAdvertisementsData(advertisements?.data || []);
      setLoading(false);
    } else if (advertisements?.status === false) {
      setLoading(false);
    }
  }, [advertisements]);

  useEffect(() => {
    setLoading(true);

    dispatch(
      getAdvertising({
        search_year: filter?.year,
        search_week: filter?.week?.join(","),
      })
    );
  }, [filter]);

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

          <Graph loading={loading} chartData={advertisementsData} />

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
