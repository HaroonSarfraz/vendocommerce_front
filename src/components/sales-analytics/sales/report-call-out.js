import { Skeleton } from "antd";

export default function ReportCallOuts(reportData, reportCallOutLoading) {
  return (
    <div className="card card-flush h-xl-100 fadeInRight">
      <div className="card-header min-h-55px ">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder text-dark">
            Report Call Outs
          </span>
        </h3>
        <div className="card-toolbar"></div>
      </div>
      <div className="card-body py-4">
        <div className="row gx-10">
          <div className="col-md-6 pr-md-2 border-end border-end-dashed">
            <div className="d-flex justify-content-between mb-4">
              {reportCallOutLoading ? (
                TitleLoading()
              ) : (
                <>
                  <div className="">
                    <p className="mb-0 fs-6">
                      <b className="fw-boldest">Total Sales LW</b>
                    </p>
                  </div>
                  <div className="">
                    <h6 className="mb-0  fw-bolder">
                      <b>${reportData?.totalSalesLastWeek || 0}</b>
                    </h6>
                  </div>
                </>
              )}
            </div>
            <div className="d-flex justify-content-between mb-2">
              {reportCallOutLoading ? (
                <></>
              ) : (
                <>
                  <div className="">
                    <p className="mb-0">Up vs LW</p>
                  </div>
                  <div className="">
                    <h6 className="mb-0  fw-bolder">
                      {reportData?.upVsLw || "0%"}
                    </h6>
                  </div>
                </>
              )}
            </div>
            <div className="d-flex justify-content-between mb-2">
              {reportCallOutLoading ? (
                disLoading()
              ) : (
                <>
                  <div className="">
                    <p className="mb-0">Difference</p>
                  </div>
                  <div className="">
                    <p className="mb-0">${reportData?.upLwDiff || "0"}</p>
                  </div>
                </>
              )}
            </div>
            <div className="d-flex justify-content-between mb-2">
              {reportCallOutLoading ? (
                disLoading()
              ) : (
                <>
                  <div className="">
                    <p className="mb-0">Up vs L4WK Avg</p>
                  </div>
                  <div className="">
                    <h6 className="mb-0  fw-bolder">
                      {reportData?.upVsL4wk || "0%"}
                    </h6>
                  </div>
                </>
              )}
            </div>
            <div className="d-flex justify-content-between mt-6 mb-6">
              {reportCallOutLoading ? (
                TitleLoading()
              ) : (
                <>
                  <div className="">
                    <p className="mb-0 fs-6">
                      <b className="fw-boldest">YTD Sales</b>
                    </p>
                  </div>
                  <div className="">
                    <h6 className="mb-0  fw-bolder">
                      <b>{reportData?.ytdSales || "$0"}</b>
                    </h6>
                  </div>
                </>
              )}
            </div>
            <div className="d-flex justify-content-between mb-4">
              {reportCallOutLoading ? (
                TitleLoading()
              ) : (
                <>
                  <div className="">
                    <p className="mb-0 fs-6">
                      <b className="fw-boldest">Key Takeaways</b>
                    </p>
                  </div>
                  <div className="">
                    <h6 className="mb-0  fw-bolder">
                      <b />
                    </h6>
                  </div>
                </>
              )}
            </div>
            <div className="d-flex justify-content-between mb-3">
              {reportCallOutLoading ? (
                disLoading()
              ) : (
                <>
                  <div className="">
                    <p className="mb-0">Sessions Change</p>
                  </div>
                  <div className="">
                    <h6 className="mb-0  fw-bolder">
                      {reportData?.sessionsChange || "0%"}
                    </h6>
                  </div>
                </>
              )}
            </div>
            <div className="d-flex justify-content-between mb-3">
              {reportCallOutLoading ? (
                disLoading()
              ) : (
                <>
                  <div className="">
                    <p className="mb-0">Conversion Rate</p>
                  </div>
                  <div className="">
                    <h6 className="mb-0  fw-bolder">
                      {reportData?.conversionRate || "0%"}
                    </h6>
                  </div>
                </>
              )}
            </div>
            <div className="d-flex justify-content-between mb-3">
              {reportCallOutLoading ? (
                disLoading()
              ) : (
                <>
                  <div className="">
                    <p className="mb-0">Buy Box Percentage</p>
                  </div>
                  <div className="">
                    <h6 className="mb-0  fw-bolder">
                      {reportData?.avgBuyBoxPercentage || "0%"}
                    </h6>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col-md-6 pl-md-2">
            <div className="d-flex justify-content-between mb-4">
              {reportCallOutLoading ? (
                TitleLoading()
              ) : (
                <>
                  <div className="">
                    <p className="mb-0 fs-6">
                      <b className="fw-boldest">Ad Spend</b>
                    </p>
                  </div>
                  <div className="">
                    <h6 className="mb-0 fw-bolder">
                      <b>{reportData?.adSpend || "$0"}</b>
                    </h6>
                  </div>
                </>
              )}
            </div>
            <div className="d-flex justify-content-between mb-3">
              {reportCallOutLoading ? (
                disLoading()
              ) : (
                <>
                  <div className="">
                    <p className="mb-0">LW Ad Spend</p>
                  </div>
                  <div className="">
                    <h6 className="mb-0 fw-bolder">
                      {reportData?.lwAdSpend || "$0"}
                    </h6>
                  </div>
                </>
              )}
            </div>
            <div className="d-flex justify-content-between mb-3">
              {reportCallOutLoading ? (
                disLoading()
              ) : (
                <>
                  <div className="">
                    <p className="mb-0">LW Ad Revenue</p>
                  </div>
                  <div className="">
                    <h6 className="mb-0 fw-bolder">
                      {reportData?.lwAdRevenue || "$0"}
                    </h6>
                  </div>
                </>
              )}
            </div>
            <div className="d-flex justify-content-between mb-3">
              {reportCallOutLoading ? (
                disLoading()
              ) : (
                <>
                  <div className="">
                    <p className="mb-0">LW Organic Sales</p>
                  </div>
                  <div className="">
                    <h6 className="mb-0 fw-bolder">
                      {reportData?.lwOrganicSales || "$0"}
                    </h6>
                  </div>
                </>
              )}
            </div>
            <div className="d-flex justify-content-between mb-3">
              {reportCallOutLoading ? (
                disLoading()
              ) : (
                <>
                  <div className="">
                    <p className="mb-0">LW Total Sales</p>
                  </div>
                  <div className="">
                    <h6 className="mb-0 fw-bolder">
                      {reportData?.lwTotalSales || "$0"}
                    </h6>
                  </div>
                </>
              )}
            </div>
            <div className="d-flex justify-content-between mb-3">
              {reportCallOutLoading ? (
                disLoading()
              ) : (
                <>
                  <div className="">
                    <p className="mb-0">LW ROAS</p>
                  </div>
                  <div className="">
                    <h6 className="mb-0 fw-bolder">
                      {reportData?.lwRoas || "0%"}
                    </h6>
                  </div>
                </>
              )}
            </div>
            <div className="d-flex justify-content-between mb-3">
              {reportCallOutLoading ? (
                disLoading()
              ) : (
                <>
                  <div className="">
                    <p className="mb-0">LW Total ACoS</p>
                  </div>
                  <div className="">
                    <h6 className="mb-0 fw-bolder">
                      {reportData?.lwTotalAcos || "0%"}
                    </h6>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function disLoading() {
  return (
    <>
      <Skeleton.Input size="small" active={true} />
      <Skeleton.Button
        size="small"
        active={true}
        shape="default"
        block={false}
      />
    </>
  );
}

function TitleLoading() {
  return (
    <>
      <Skeleton.Input active={true} />
      <Skeleton.Button active={true} shape="default" block={false} />
    </>
  );
}
