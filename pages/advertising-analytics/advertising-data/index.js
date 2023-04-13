import { useState } from "react";
import dynamic from "next/dynamic";
import KPITable from "@/src/components/advertising-analytics/advertising-data/KPITable";
import Graph from "@/src/components/advertising-analytics/advertising-data/Graph";
import TopBarFilter from "@/src/components/advertising-analytics/top-bar-filter";

const DashboardLayout = dynamic(() => import("@/src/layouts/DashboardLayout"), {
  ssr: false,
});

export default function Users() {
  const [filter, setFilter] = useState({
    week: [],
    year: 2023,
  });

  return (
    <DashboardLayout>
      <div className="content d-flex flex-column flex-column-fluid">
        <div className="container-fluid">
          {TopBarFilter(filter, setFilter, "Week")}

          <div className="row gx-5 gx-xl-5">
            <div className="col-xl-6 h-550px h-md-100">
              <KPITable heading="KPI YTD" />
            </div>
            <div className="col-xl-6 h-550px h-md-100">
              <KPITable heading="KPI LW" />
            </div>
          </div>

          <div className="row gx-5 gx-xl-5">
            <div className="col-xl-6 mb-5">
              <Graph heading="REVENUE" loading={true} />
            </div>
            <div className="col-xl-6 mb-5">
              <Graph heading="SPEND" loading={true} />
            </div>
            <div className="col-xl-6 mb-5">
              <Graph heading="ACOS" loading={true} />
            </div>
            <div className="col-xl-6 mb-5">
              <Graph heading="CPO" loading={true} />
            </div>
            <div className="col-xl-6 mb-5">
              <Graph
                heading="TOTAL SALES & ACOS"
                loading={false}
                chartData={true}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
