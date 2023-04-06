import dynamic from "next/dynamic";

const DashboardLayout = dynamic(() => import("@/src/layouts/DashboardLayout"), {
  ssr: false,
});

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="content d-flex flex-column flex-column-fluid">
        <div className="container-fluid" id="kt_content_container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Dashboard</h1>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
