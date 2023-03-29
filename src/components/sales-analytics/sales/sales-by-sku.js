import { Skeleton } from "antd";

export default function SalesBySKU(tableList, loading) {
  return (
    <div className="row fadeInRight">
      <div className="col-lg-12">
        <div className="card" style={{}}>
          <div className="card-header">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bolder fs-3 mb-1">
                Sales by SKU
              </span>
            </h3>
            <div className="card-toolbar">
              <div className="dropdown">
                <button
                  className="btn btn-light-danger fs-7 px-10 dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Export
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Export to csv
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Export to xlsx
                    </a>
                  </li>
                </ul>
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
                      {loading ? title2Loading() : "TW"}
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
                      {loading ? title2Loading() : "TW"}
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
                      {loading ? title2Loading() : "TW"}
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
                      {loading ? title2Loading() : "TW"}
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
                  ) : (
                    tableList?.map((d, i) => (
                      <tr key={i}>
                        <td>
                          <a className="fw-boldest text-dark fs13">
                            {d?.week_name || ""}
                          </a>
                        </td>
                        <td>
                          {d?.week_start_date || ""} to {d?.week_end_date || ""}
                        </td>
                        <td>${d?.twSales || "0"}</td>
                        <td>${d?.salesDiff || "0"}</td>
                        <td
                          className={`${
                            d?.salesChange < 0 ? "text-danger" : "text-success"
                          }`}
                        >
                          {d?.salesChange || "0"}%
                        </td>
                        <td>{d?.twUnits || "0"}</td>
                        <td>{d?.unitsDiff || "0"}</td>
                        <td
                          className={`${
                            d?.unitsChange < 0 ? "text-danger" : "text-success"
                          }`}
                        >
                          {d?.unitsChange || "0"}%
                        </td>
                        <td>${d?.lastYearSales || "0"}</td>
                        <td>${d?.salesDiffLy || "0"}</td>
                        <td
                          className={`${
                            d?.salesChangeLy < 0
                              ? "text-danger"
                              : "text-success"
                          }`}
                        >
                          {d?.salesChangeLy || "0"}%
                        </td>
                        <td>{d?.lastYearUnits || "0"}</td>
                        <td>{d?.unitsDiffLy || "0"}</td>
                        <td
                          className={`${
                            d?.unitsChangeLy < 0
                              ? "text-danger"
                              : "text-success"
                          }`}
                        >
                          {d?.unitsChangeLy || "0"}%
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
