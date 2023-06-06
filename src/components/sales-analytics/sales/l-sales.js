import {
  currencyFormat,
  numberFormat,
  percentageFormat,
  coloredTextClass,
} from "@/src/helpers/formatting.helpers";
import { Skeleton } from "antd";

export default function LSales(reportData, loading) {
  return (
    <div className="col-xl-9 mb-5 mb-xl-5 fadeInRight">
      <div className="card card-flush h-xl-100">
        <div className="card-body px-2 py-3">
          <div className="table-responsive">
            <table className="table table-row-dashed fs-7 table-row-gray-300 align-middle gx-4 gy-4 mb-0">
              <thead>
                <tr className="text-start text-gray-800 fw-boldest fs-7 ">
                  <th colSpan={3} className="text-center">
                    {loading ? titleLoading() : "LW"}
                  </th>
                  <th
                    colSpan={4}
                    className="text-center"
                    style={{ borderLeft: "1px dashed #ddd" }}
                  >
                    {loading ? titleLoading() : "LW VS L4WK"}
                  </th>
                  <th
                    colSpan={3}
                    className="text-center"
                    style={{ borderLeft: "1px dashed #ddd" }}
                  >
                    {loading ? titleLoading() : "LW"}
                  </th>
                  <th
                    colSpan={4}
                    className="text-center"
                    style={{ borderLeft: "1px dashed #ddd" }}
                  >
                    {loading ? titleLoading() : "LW VS L4WK"}
                  </th>
                </tr>
                <tr
                  className="text-start text-gray-800 fw-boldest fs-7 text-center"
                  style={{ background: "#f8f8f8" }}
                >
                  <th colSpan={3} className="min-w-75px">
                    {loading ? title2Loading() : "Sales"}
                  </th>
                  <th
                    colSpan={4}
                    className="min-w-75px"
                    style={{ borderLeft: "1px dashed #ddd" }}
                  >
                    {loading ? title2Loading() : "Sales"}
                  </th>
                  <th
                    colSpan={3}
                    className="min-w-75px"
                    style={{ borderLeft: "1px dashed #ddd" }}
                  >
                    {loading ? title2Loading() : "Units"}
                  </th>
                  <th
                    colSpan={4}
                    className="min-w-75px"
                    style={{ borderLeft: "1px dashed #ddd" }}
                  >
                    {loading ? title2Loading() : "Units"}
                  </th>
                </tr>
              </thead>
              <tbody className="fw-bold text-gray-800 text-center">
                <tr>
                  {loading ? (
                    <>
                      <td>{title3Loading()}</td>
                      <td>{title3Loading()}</td>
                      <td>{title3Loading()}</td>
                      <td style={{ borderLeft: "1px dashed #ddd" }}>
                        {title3Loading()}
                      </td>
                      <td>{title3Loading()}</td>
                      <td>{title3Loading()}</td>
                      <td>{title3Loading()}</td>
                      <td style={{ borderLeft: "1px dashed #ddd" }}>
                        {title3Loading()}
                      </td>
                      <td>{title3Loading()}</td>
                      <td>{title3Loading()}</td>
                      <td style={{ borderLeft: "1px dashed #ddd" }}>
                        {title3Loading()}
                      </td>
                      <td>{title3Loading()}</td>
                      <td>{title3Loading()}</td>
                      <td>{title3Loading()}</td>
                    </>
                  ) : (
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
                  )}
                </tr>
                {loading ? (
                  <></>
                ) : (
                  <tr>
                    <td>{currencyFormat(reportData?.totalSalesLastWeek)}</td>
                    <td className={coloredTextClass(reportData?.upVsLw)}>
                      {currencyFormat(reportData?.upVsLw)}
                    </td>
                    <td className={coloredTextClass(reportData?.upLwDiff)}>
                      {percentageFormat(reportData?.upLwDiff)}
                    </td>
                    <td>{currencyFormat(reportData?.totalSalesLastWeek)}</td>
                    <td>{currencyFormat(reportData?.totalSalesL4wk)}</td>
                    <td className={coloredTextClass(reportData?.totalSalesL4wkDiff)}>
                      {percentageFormat(reportData?.totalSalesL4wkDiff)}
                    </td>
                    <td className={coloredTextClass(reportData?.totalSalesL4wkChange)}>
                      {currencyFormat(reportData?.totalSalesL4wkChange)}
                    </td>
                    <td>{numberFormat(reportData?.unitsLw)}</td>
                    <td className={coloredTextClass(reportData?.UnitsDiff)}>
                      {numberFormat(reportData?.UnitsDiff)}
                    </td>
                    <td className={coloredTextClass(reportData?.UnitsChg)}>
                      {percentageFormat(reportData?.UnitsChg)}
                    </td>
                    <td>{numberFormat(reportData?.vsUnitsLw)}</td>
                    <td>{numberFormat(reportData?.vsUnitsL4wk)}</td>
                    <td className={coloredTextClass(reportData?.vsUnitsDiff)}>
                      {numberFormat(reportData?.vsUnitsDiff)}
                    </td>
                    <td className={coloredTextClass(reportData?.vsUnitsChg)}>
                      {percentageFormat(reportData?.vsUnitsChg)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
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
