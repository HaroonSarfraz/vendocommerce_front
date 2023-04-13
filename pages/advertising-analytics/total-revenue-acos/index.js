import { useState } from "react";
import dynamic from "next/dynamic";
import TopBarFilter from "@/src/components/advertising-analytics/top-bar-filter";
import Graph from "@/src/components/advertising-analytics/total-revenue/Graph";

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

          <Graph loading={false} chartData={true} />
        </div>
      </div>
    </DashboardLayout>
  );
}
