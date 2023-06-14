import {
  currencyFormat,
  numberFormat,
  percentageFormat,
} from "@/src/helpers/formatting.helpers";
import { Empty, Skeleton } from "antd";
import NoData from "../../no-data";
import { ExportToExcel } from "@/src/hooks/Excelexport";

export default function SalesBySKU(tableList, loading) {
  return (
    <div className="row fadeInRight">
      <div className="col-lg-12">
        <div className="card" style={{}}>
          <div className="card-header">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bolder fs-3 mb-1">
                Sales by Week
              </span>
            </h3>
            <div className="card-toolbar">
              <div className="dropdown">
                <ExportToExcel
                  columns={[
                    "WK",
                    "Week Date Range",
                    "TW Sales",
                    "TW Sales Change",
                    "TW Sales Change (%)",
                    "TW Units",
                    "TW Units Change",
                    "TW Units Change (%)",
                    "LY Sales",
                    "LY Sales Change",
                    "LY Sales Change (%)",
                    "LY Units",
                    "LY Units Change",
                    "LY Units Change (%)",
                  ]}
                  rows={tableList.map((d) => {
                    return {
                      ["WK"]: `WK${d?.week}`,
                      ["Week Date Range"]: `${d?.startdate || ""} to ${
                        d?.enddate || ""
                      }`,
                      ["TW Sales"]: currencyFormat(d?.this_week_total_sales),
                      ["TW Sales Change"]: currencyFormat(
                        d?.this_week_sales_diff
                      ),
                      ["TW Sales Change (%)"]: percentageFormat(
                        d?.this_week_sales_change
                      ),
                      ["TW Units"]: numberFormat(
                        d?.this_week_total_units || "0"
                      ),
                      ["TW Units Change"]:
                        numberFormat(d?.this_week_units_diff) || "0",
                      ["TW Units Change (%)"]: percentageFormat(
                        d?.this_week_units_change
                      ),
                      ["LY Sales"]: currencyFormat(d?.last_year_total_sales),
                      ["LY Sales Change"]: currencyFormat(
                        d?.last_year_sales_diff
                      ),
                      ["LY Sales Change (%)"]: percentageFormat(
                        d?.last_year_sales_change
                      ),
                      ["LY Units"]: numberFormat(d?.last_year_total_units),
                      ["LY Units Change"]: numberFormat(
                        d?.last_year_units_diff
                      ),
                      ["LY Units Change (%)"]: percentageFormat(
                        d?.last_year_units_change
                      ),
                    };
                  })}
                  fileName={"sales-data-by-week"}
                  loading={loading}
                >
                  <button
                    className="btn btn-light-danger fs-7 px-10"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Export
                  </button>
                </ExportToExcel>
              </div>
            </div>
          </div>
          <div className="card-body pt-0 px-4" style={{}}>
            <div className="table-responsive">
              <table className="table table-row-dashed fs-7 table-row-gray-300 align-middle gx-4 gy-4">
                <thead>
                  <tr className="text-start text-gray-800 fw-boldest fs-7 ">
                    <th rowSpan={2} style={{}} className="min-w-75px">
                      {loading ? <Skeleton.Input /> : "Week"}
                    </th>
                    <th
                      rowSpan={2}
                      style={{ borderLeft: "1px dashed #ddd" }}
                      className="min-w-200px"
                    >
                      {loading ? <Skeleton.Input /> : "Week Date Range"}
                    </th>
                    <th
                      colSpan={3}
                      className="text-center"
                      style={{ borderLeft: "1px dashed #ddd" }}
                    >
                      {loading ? title2Loading() : "Sales"}
                    </th>
                    <th
                      colSpan={3}
                      className="text-center"
                      style={{ borderLeft: "1px dashed #ddd" }}
                    >
                      {loading ? title2Loading() : "Units"}
                    </th>
                    <th
                      colSpan={3}
                      className="text-center"
                      style={{ borderLeft: "1px dashed #ddd" }}
                    >
                      {loading ? title2Loading() : "Sales"}
                    </th>
                    <th
                      colSpan={3}
                      className="text-center"
                      style={{ borderLeft: "1px dashed #ddd" }}
                    >
                      {loading ? title2Loading() : "Units"}
                    </th>
                  </tr>
                  <tr
                    className="text-start text-gray-800 fw-boldest fs-7 "
                    style={{ background: "#f8f8f8" }}
                  >
                    <th
                      className="min-w-75px"
                      style={{ borderLeft: "1px dashed #ddd" }}
                    >
                      {loading ? title2Loading() : "Total"}
                    </th>
                    <th className="min-w-75px">
                      {loading ? title2Loading() : "CHG"}
                    </th>
                    <th className="min-w-75px">
                      {loading ? title2Loading() : "CHG %"}
                    </th>
                    <th
                      className="min-w-75px"
                      style={{ borderLeft: "1px dashed #ddd" }}
                    >
                      {loading ? title2Loading() : "Total"}
                    </th>
                    <th className="min-w-75px">
                      {loading ? title2Loading() : "CHG"}
                    </th>
                    <th className="min-w-75px">
                      {loading ? title2Loading() : "CHG %"}
                    </th>
                    <th
                      className="min-w-75px"
                      style={{ borderLeft: "1px dashed #ddd" }}
                    >
                      {loading ? title2Loading() : "LY"}
                    </th>
                    <th className="min-w-75px">
                      {loading ? title2Loading() : "CHG"}
                    </th>
                    <th className="min-w-75px">
                      {loading ? title2Loading() : "CHG %"}
                    </th>
                    <th
                      className="min-w-75px"
                      style={{ borderLeft: "1px dashed #ddd" }}
                    >
                      {loading ? title2Loading() : "LY"}
                    </th>
                    <th className="min-w-75px">
                      {loading ? title2Loading() : "CHG"}
                    </th>
                    <th className="min-w-75px">
                      {loading ? title2Loading() : "CHG %"}
                    </th>
                  </tr>
                </thead>
                <tbody className="fw-bold text-gray-800 ">
                  {loading ? (
                    <tr>
                      <td>{title4Loading()}</td>
                      <td>{title4Loading()}</td>
                      <td>{title4Loading()}</td>
                      <td>{title4Loading()}</td>
                      <td>{title4Loading()}</td>
                      <td>{title4Loading()}</td>
                      <td>{title4Loading()}</td>
                      <td>{title4Loading()}</td>
                      <td>{title4Loading()}</td>
                      <td>{title4Loading()}</td>
                      <td>{title4Loading()}</td>
                      <td>{title4Loading()}</td>
                      <td>{title4Loading()}</td>
                      <td>{title4Loading()}</td>
                    </tr>
                  ) : tableList.length === 0 ? (
                    <tr>
                      <td colSpan={14}>
                        <NoData />
                      </td>
                    </tr>
                  ) : (
                    tableList?.map((d, i) => (
                      <tr key={i}>
                        <td>
                          <a className="fw-boldest text-dark fs13">
                            {`WK${d?.week}`}
                          </a>
                        </td>
                        <td>
                          {d?.startdate || ""} to {d?.enddate || ""}
                        </td>
                        <td>{currencyFormat(d?.this_week_total_sales)}</td>
                        <td>{currencyFormat(d?.this_week_sales_diff)}</td>
                        <td
                          className={`${
                            d?.this_week_sales_change < 0
                              ? "text-danger"
                              : "text-success"
                          }`}
                        >
                          {percentageFormat(d?.this_week_sales_change)}
                        </td>
                        <td>{numberFormat(d?.this_week_total_units || "0")}</td>
                        <td>{numberFormat(d?.this_week_units_diff) || "0"}</td>
                        <td
                          className={`${
                            d?.this_week_units_change < 0
                              ? "text-danger"
                              : "text-success"
                          }`}
                        >
                          {percentageFormat(d?.this_week_units_change)}
                        </td>
                        <td>{currencyFormat(d?.last_year_total_sales)}</td>
                        <td>{currencyFormat(d?.last_year_sales_diff)}</td>
                        <td
                          className={`${
                            d?.last_year_sales_change < 0
                              ? "text-danger"
                              : "text-success"
                          }`}
                        >
                          {percentageFormat(d?.last_year_sales_change)}
                        </td>
                        <td>{numberFormat(d?.last_year_total_units)}</td>
                        <td>{numberFormat(d?.last_year_units_diff)}</td>
                        <td
                          className={`${
                            d?.last_year_units_change < 0
                              ? "text-danger"
                              : "text-success"
                          }`}
                        >
                          {percentageFormat(d?.last_year_units_change)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* <div className="d-none flex-stack flex-wrap pt-0 mt-5">
            <div className="fs13 font-weight-bolder text-gray-700 d-flex align-items-center">
              <select className="form-select form-select-sm form-select-solid w-75px me-3">
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              Showing 1 to 3 of 50 entries
            </div>
            <ul className="pagination">
              <li className="page-item previous">
                <a href="#" className="page-link">
                  <i className="previous" />
                </a>
              </li>
              <li className="page-item active">
                <a href="#" className="page-link">
                  1
                </a>
              </li>
              <li className="page-item">
                <a href="#" className="page-link">
                  2
                </a>
              </li>
              <li className="page-item">
                <a href="#" className="page-link">
                  3
                </a>
              </li>
              <li className="page-item">
                <a href="#" className="page-link">
                  4
                </a>
              </li>
              <li className="page-item">
                <a href="#" className="page-link">
                  5
                </a>
              </li>
              <li className="page-item">
                <a href="#" className="page-link">
                  6
                </a>
              </li>
              <li className="page-item next">
                <a href="#" className="page-link">
                  <i className="next" />
                </a>
              </li>
            </ul>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function title4Loading() {
  return <Skeleton title={false} active={true} />;
}
function title3Loading() {
  return <Skeleton.Button active={true} />;
}
function title2Loading() {
  return <Skeleton.Input size="small" active={true} />;
}
