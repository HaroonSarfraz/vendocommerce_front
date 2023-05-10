import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "@/src/components/loading";
import TopBarFilter from "./top-bar-filter-Category";
import _ from "lodash";
import { defaultWeek, defaultYear } from "@/src/config";
import { getCategoryPerformanceList } from "@/src/services/categoryPerformance.services";
import ImportFileModal from "@/src/modals/importFile.modal";
import { selectCategoryPerformanceList } from "@/src/store/slice/categoryPerformanceReport.slice";

export default function CategoryPerformanceReport() {
  const dispatch = useDispatch();

  const CategoryPerformanceListRes = useSelector(selectCategoryPerformanceList);

  const [modalOpen, setModalOpen] = useState(false);

  const [tableLoading, setTableLoading] = useState(false);
  const [list, setList] = useState([]);

  const [filter, setFilter] = useState({
    week: [defaultWeek()],
    year: defaultYear(),
  });

  useEffect(() => {
    const { year, week } = filter;
    dispatch(
      getCategoryPerformanceList({
        search_year: year,
        search_week: week?.join(","),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    if (!_.isEmpty(CategoryPerformanceListRes)) {
      setList(Object.values(CategoryPerformanceListRes || {}));
      setTableLoading(false);
    } else if (CategoryPerformanceListRes?.status === false) {
      setList([]);
      setTableLoading(false);
    }
  }, [CategoryPerformanceListRes]);

  return (
    <div
      className="content d-flex flex-column flex-column-fluid"
      id="kt_content"
    >
      <div className="container-fluid" id="kt_content_container">
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n                            /* .table th, .table td{\n                                border:1px solid red\n                            } */\n                        ",
          }}
        />
        <div className="row gx-5 gx-xl-5">
          {TopBarFilter(filter, setFilter, "Week")}
          <div className="col-lg-12">
            <div className="card mb-1">
              <div className="card-header border-bottom border-bottom-dashed">
                <h3 className="card-title align-items-start flex-column">
                  <span className="card-label fw-bolder fs-3 mb-0">
                    Category Performance Report
                  </span>
                </h3>
                <div className="card-toolbar gap-3">
                  <button
                    className="btn btn-light-danger btn-sm fw-bolder"
                    onClick={() => setModalOpen(true)}
                  >
                    Import Data
                  </button>
                  <button className="btn btn-light-danger btn-sm fw-bolder">
                    Export Data
                  </button>
                </div>
              </div>
              <div className="card-body pt-2 table-responsive">
                <div className="table-responsive">
                  {tableLoading ? (
                    <Loading />
                  ) : (
                    <table className="table align-middle table-row-dashed table-row-gray-300 fs-7 gy-4 gx-5 border-top-d">
                      <thead>
                        <tr className="fw-boldest text-dark">
                          <th className="min-w-300px" colSpan="2">
                            Row Labels
                          </th>
                          <th className="min-w-300px" colSpan="2">
                            Total
                          </th>{" "}
                          <th className="min-w-300px" colSpan="2">
                            % CHANGE WEEK OVER WEEK
                          </th>
                        </tr>
                        <tr className="fw-boldest text-dark">
                          <th className="p-0" />
                          <th className="p-0" />
                        </tr>
                      </thead>
                      <tbody className="text-gray-700 fw-bold">
                        <td>No data found</td>
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImportFileModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
    </div>
  );
}
