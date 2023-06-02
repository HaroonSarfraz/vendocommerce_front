import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "@/src/components/loading";
import TopBarFilter from "./top-bar-filter-Category";
import _ from "lodash";
import { defaultWeek, defaultYear } from "@/src/config";
import { getCategoryPerformanceList } from "@/src/services/categoryPerformance.services";
import ImportFileModal from "@/src/modals/importFile.modal";
import { selectCategoryPerformanceList } from "@/src/store/slice/categoryPerformanceReport.slice";
import NoData from "@/src/components/no-data";
import { Table } from "antd";
import { currencyFormat } from "@/src/helpers/formatting.helpers";
import { percentageFormat } from "@/src/helpers/formatting.helpers";
import { getCategoryList } from "@/src/services/categoryList.services";
import { ExportToExcel } from "@/src/hooks/Excelexport";

export default function CategoryPerformanceReport() {
  const dispatch = useDispatch();

  const CategoryPerformanceListRes = useSelector(selectCategoryPerformanceList);

  const [modalOpen, setModalOpen] = useState(false);

  const [tableLoading, setTableLoading] = useState(true);
  const [list, setList] = useState([]);

  const [filter, setFilter] = useState({
    week: [],
    year: defaultYear(),
    category: null,
  });

  useEffect(() => {
    dispatch(getCategoryList({ limit: 9999 }));
  }, []);

  useEffect(() => {
    const { year, week, category } = filter;
    const time = setTimeout(() => {
      dispatch(
        getCategoryPerformanceList({
          search_year: year,
          search_week: week?.join(","),
          category,
        })
      );
    }, 600);
    return () => {
      clearTimeout(time);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    if (CategoryPerformanceListRes.length !== 0) {
      setList(CategoryPerformanceListRes);
      setTableLoading(false);
    }
  }, [CategoryPerformanceListRes]);

  const listLength = list.length;

  const findWeeksCount = useMemo(
    () =>
      list.reduce((acc, item) => {
        const count = item.weekly_report.length;
        if (acc <= count) {
          return count;
        }
      }, 0),
    [list, filter]
  );

  const columns = useMemo(
    () => [
      {
        title: "Row Labels",
        width: 110,
        dataIndex: "name",
        key: "name",
        fixed: "left",
      },
      ...(Array(findWeeksCount)
        .fill("")
        .map((_, key) => ({
          title: `WK${key + 1}`,
          dataIndex: `WK${key + 1}`,
          key: `WK${key + 1}`,
          width: 90,
        })) || []),
      {
        title: "Total",
        width: 100,
        dataIndex: "total",
        key: "total",
      },
      {
        title: "% Change week over week",
        width: 160,
        dataIndex: "cwow",
        key: "cwow",
      },
    ],
    [findWeeksCount, filter]
  );

  const res = useMemo(
    () =>
      list?.reduce(
        (acc, item, key) => {
          const { data, totals } = acc;
          const { change_week_over_week, total, weekly_report } = item;

          const weeks = (type, formatter = (val) => val) =>
            weekly_report.reduce((wacc, witem) => {
              wacc[witem.week_name] = formatter(witem[type]);
              return wacc;
            }, {});

          const row1 = { name: item.category };
          const row2 = {
            name: "Shipped Revenue",
            ...weeks("shipped_revenue", currencyFormat),
            total: currencyFormat(total?.shipped_revenue),
            cwow: percentageFormat(change_week_over_week.shipped_revenue),
          };
          const row3 = {
            name: "TACoS",
            ...weeks("TACoS", percentageFormat),
            total: percentageFormat(total?.TACoS),
            cwow: percentageFormat(change_week_over_week.TACoS),
          };
          const row4 = {
            name: "Ad Sales",
            ...weeks("ad_sales", currencyFormat),
            total: currencyFormat(total?.ad_sales),
            cwow: percentageFormat(change_week_over_week.ad_sales),
          };
          const row5 = {
            name: "Ad Spend",
            ...weeks("ad_spend", currencyFormat),
            total: currencyFormat(total?.ad_spend),
            cwow: percentageFormat(change_week_over_week.ad_spend),
          };
          data.push(row1);
          data.push(row2);
          data.push(row3);
          data.push(row4);
          data.push(row5);

          totals["Shipped Revenue"] += total?.shipped_revenue;
          totals["TACoS"] += total?.TACoS;
          totals["Ad Sales"] += total?.ad_sales;
          totals["Ad Spend"] += total?.ad_spend;

          return acc;
        },
        {
          data: [],
          totals: {
            "Shipped Revenue": 0,
            TACoS: 0,
            "Ad Sales": 0,
            "Ad Spend": 0,
          },
        }
      ) || [],
    [list, filter]
  );

  const shippedRevenue = currencyFormat(
    res.totals["Shipped Revenue"] / list.length
  );
  const tACoS = percentageFormat(res.totals["TACoS"] / list.length);
  const adSales = currencyFormat(res.totals["Ad Sales"] / list.length);
  const adSpend = currencyFormat(res.totals["Ad Spend"] / list.length);

  return (
    <>
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
                    <ExportToExcel
                      columns={columns.map((item) => item.title) || []}
                      rows={res.data}
                      fileName={"category-performance-report"}
                      loading={tableLoading}
                    >
                      <button className="btn btn-light-danger btn-sm fw-bolder">
                        Export Data
                      </button>
                    </ExportToExcel>
                  </div>
                </div>
                <div className="card-body pt-2 table-responsive">
                  <div className="table-responsive">
                    {tableLoading ? (
                      <Loading />
                    ) : list?.length != 0 ? (
                      <>
                        <Table
                          pagination={false}
                          columns={[
                            {
                              title: "",
                              width: 80,
                            },
                            {
                              title: "Shipped Revenue Average",
                              width: 90,
                              dataIndex: "shippedRevenue",
                              key: "shippedRevenue",
                            },
                            {
                              title: "TACoS Average",
                              width: 90,
                              dataIndex: "tACoS",
                              key: "tACoS",
                            },
                            {
                              title: "Ad Sales Average",
                              width: 90,
                              dataIndex: "adSales",
                              key: "adSales",
                            },
                            {
                              title: "Ad Spend Average",
                              width: 90,
                              dataIndex: "adSpend",
                              key: "adSpend",
                            },
                            {
                              title: "",
                              width: 25,
                            },
                          ]}
                          dataSource={[
                            {
                              shippedRevenue,
                              tACoS,
                              adSales,
                              adSpend,
                            },
                          ]}
                          size={"small"}
                        />
                        <Table
                          pagination={false}
                          columns={columns}
                          dataSource={res.data}
                          loading={tableLoading}
                          scroll={{
                            x:
                              columns
                                ?.map((d) => d.width)
                                .reduce((a, b) => a + b, 0) + 300,
                          }}
                          size={"small"}
                        />
                      </>
                    ) : (
                      <NoData />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ImportFileModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
      </div>
    </>
  );
}
