import { Skeleton } from "antd";

export default function LSales(reportData, loading) {
  return <div className="col-xl-9 mb-5 mb-xl-5 fadeInRight">
    <div className="card card-flush h-xl-100">
      <div className="card-body px-2 py-3">
        <div className="table-responsive">
          <table className="table table-row-dashed fs-7 table-row-gray-300 align-middle gx-4 gy-4 mb-0">
            <thead>
              <tr className="text-start text-gray-800 fw-boldest fs-7 ">
                <th colSpan={3} className="text-center">
                  {loading ? titleLoading() : 'LW'}
                </th>
                <th
                  colSpan={4}
                  className="text-center"
                  style={{ borderLeft: "1px dashed #ddd" }}
                >

                  {loading ? titleLoading() : 'LW VS L4WK'}
                </th>
                <th
                  colSpan={3}
                  className="text-center"
                  style={{ borderLeft: "1px dashed #ddd" }}
                >
                  {loading ? titleLoading() : 'LW'}
                </th>
                <th
                  colSpan={4}
                  className="text-center"
                  style={{ borderLeft: "1px dashed #ddd" }}
                >

                  {loading ? titleLoading() : 'LW VS L4WK'}
                </th>
              </tr>
              <tr
                className="text-start text-gray-800 fw-boldest fs-7 text-center"
                style={{ background: "#f8f8f8" }}
              >
                <th colSpan={3} className="min-w-75px">

                  {loading ? title2Loading() : 'Sales'}
                </th>
                <th
                  colSpan={4}
                  className="min-w-75px"
                  style={{ borderLeft: "1px dashed #ddd" }}
                >
                  {loading ? title2Loading() : 'Sales'}
                </th>
                <th
                  colSpan={3}
                  className="min-w-75px"
                  style={{ borderLeft: "1px dashed #ddd" }}
                >
                  {loading ? title2Loading() : 'Units'}
                </th>
                <th
                  colSpan={4}
                  className="min-w-75px"
                  style={{ borderLeft: "1px dashed #ddd" }}
                >
                  {loading ? title2Loading() : 'Units'}
                </th>
              </tr>
            </thead>
            <tbody className="fw-bold text-gray-800 text-center">
              <tr>
                {
                  loading ? <>
                    <td>{title3Loading()}</td>
                    <td>{title3Loading()}</td>
                    <td>{title3Loading()}</td>
                    <td style={{ borderLeft: "1px dashed #ddd" }}>{title3Loading()}</td>
                    <td>{title3Loading()}</td>
                    <td>{title3Loading()}</td>
                    <td>{title3Loading()}</td>
                    <td style={{ borderLeft: "1px dashed #ddd" }}>{title3Loading()}</td>
                    <td>{title3Loading()}</td>
                    <td>{title3Loading()}</td>
                    <td style={{ borderLeft: "1px dashed #ddd" }}>{title3Loading()}</td>
                    <td>{title3Loading()}</td>
                    <td>{title3Loading()}</td>
                    <td>{title3Loading()}</td>
                  </> :
                    <>
                      <td className="shimmer">LW</td>
                      <td>DIF</td>
                      <td>CHG</td>
                      <td style={{ borderLeft: "1px dashed #ddd" }}>LW</td>
                      <td>L4WK</td>
                      <td>DIF</td>
                      <td>CHG</td>
                      <td style={{ borderLeft: "1px dashed #ddd" }}>LW</td>
                      <td>DIF</td>
                      <td>CHG</td>
                      <td style={{ borderLeft: "1px dashed #ddd" }}>LW</td>
                      <td>L4WK</td>
                      <td>DIF</td>
                      <td>CHG</td>
                    </>
                }
              </tr>
              {
                loading ? <></> :
                  <tr>
                    <td className={`${parseInt((reportData?.totalSalesLastWeek || '0')?.toString()?.replace('$' || '%' || '', '')) < 0 ? 'text-danger' : 'text-success'}`}>${reportData?.totalSalesLastWeek || '0'}</td>
                    <td className="text-success">{reportData?.upLwDiff || '$0'}</td>
                    <td>{reportData?.upVsLw || '0%'}</td>
                    <td>{reportData?.totalSalesLastWeek || '0'}</td>
                    <td>{reportData?.vsSalesL4wk || '0'}</td>
                    <td className={`${parseInt((reportData?.vsSalesDiff || '0')?.toString()?.replace('$' || '%' || '', '')) < 0 ? 'text-danger' : 'text-success'}`}>{reportData?.vsSalesDiff || '0'}</td>
                    <td className="text-danger">{reportData?.vsSalesChg || '0%'}</td>
                    <td>{reportData?.unitsLw || 0}</td>
                    <td className={`${parseInt((reportData?.UnitsDiff || '0')?.toString()?.replace('$' || '%' || '', '')) < 0 ? 'text-danger' : 'text-success'}`}>{reportData?.UnitsDiff || 0}</td>
                    <td>{reportData?.UnitsChg || 0}</td>
                    <td>{reportData?.vsUnitsLw || 0}</td>
                    <td>{reportData?.vsUnitsL4wk || 0}</td>
                    <td className={`${parseInt((reportData?.vsUnitsDiff || '0')?.toString()?.replace('$' || '%' || '', '')) < 0 ? 'text-danger' : 'text-success'}`}>{reportData?.vsUnitsDiff || 0}</td>
                    <td className={`${parseInt((reportData?.vsUnitsChg || '0')?.toString()?.replace('$' || '%' || '', '')) < 0 ? 'text-danger' : 'text-success'}`}>{reportData?.vsUnitsChg || 0}</td>
                  </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>;
}

function titleLoading() {
  return <Skeleton.Input active={true} />;
}
function title3Loading() {
  return <Skeleton.Button active={true} />;
}
function title2Loading() {
  return <Skeleton.Input size="small" active={true} />;
}
