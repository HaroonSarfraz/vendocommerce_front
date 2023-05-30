import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import Loading from "@/src/components/loading";
import { defaultWeek, defaultYear } from "@/src/config";
import { useDispatch, useSelector } from "react-redux";
import Image from "rc-image";
import { Table, Tooltip } from "antd";
import { currencyFormat, numberFormat } from "@/src/helpers/formatting.helpers";
import ASINTable from "@/src/components/table";
import NoData from "@/src/components/no-data";
import TopBarFilter from "./top-bar-filter-product-report";
import { getProductReportList } from "@/src/services/productReport.services";
import { selectProductReportList } from "@/src/store/slice/productReport.slice";
import { getCategoryList } from "@/src/services/categoryList.services";
import { ExportToExcel } from "@/src/hooks/Excelexport";

export default function ProductReportPage() {
  const dispatch = useDispatch();

  const ProductReportListRes = useSelector(selectProductReportList);

  const [tableLoading, setTableLoading] = useState(true);
  const [list, setList] = useState([]);

  const [filter, setFilter] = useState({
    week: [],
    year: defaultYear(),
    asin: "",
    category: "",
  });

  useEffect(() => {
    dispatch(getCategoryList({ limit: 9999 }));
  }, []);

  useEffect(() => {
    const time = setTimeout(() => {
      const { year, week, asin, category } = filter;
      dispatch(
        getProductReportList({
          search_year: year,
          search_week: week?.join(","),
          asin,
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
    if (ProductReportListRes.status) {
      setList(ProductReportListRes.data);
      setTableLoading(false);
    }
  }, [ProductReportListRes]);

  const listLength = list.length;

  const findWeeksCount = useMemo(
    () =>
      list.reduce((acc, item) => {
        const count = item.weekly_sales.length;
        if (acc <= count) {
          return count;
        }
      }, 0),
    [listLength]
  );

  const columns = useMemo(
    () => [
      {
        title: "",
        width: 40,
      },
      {
        title: "Row Labels",
        width: 155,
        ellipsis: true,
        dataIndex: "name",
        key: "name",
        fixed: "left",
      },
      {
        title: "Product Detail",
        width: 221,
        dataIndex: "pd",
        key: "pd",
      },
      {
        title: "Active Status",
        width: 129,
        dataIndex: "status",
        key: "status",
      },
      ...(Array(findWeeksCount)
        .fill("")
        .map((_, key) => ({
          title: `WK${key + 1}`,
          key: `WK${key + 1}`,
          children: [
            {
              title: "Sales",
              dataIndex: `sales${key + 1}`,
              key: `sales${key + 1}`,
              width: 110,
            },
            {
              title: "AD Sales",
              dataIndex: `ad_sales${key + 1}`,
              key: `ad_sales${key + 1}`,
              width: 110,
            },
          ],
        })) || []),
      {
        title: "Total",
        width: 100,
        dataIndex: "total",
        key: "total",
      },
    ],
    [findWeeksCount]
  );

  const data = useMemo(
    () =>
      list?.reduce((acc, item, key) => {
        const { total_sales, weekly_sales, products } = item;

        const alterProducts = Object.values(
          products.reduce((pacc, pitem, key) => {
            if (pacc[pitem.asin]) {
              pacc[pitem.asin] = {
                ...pacc[pitem.asin],
                [`sales${pitem.week}`]: currencyFormat(pitem.sales),
                [`ad_sales${pitem.week}`]: currencyFormat(pitem.ad_sales),
              };
            } else {
              pacc[pitem.asin] = {
                name: pitem.asin,
                pd: `SKU:${pitem.sku} ${pitem.title}`,
                status: pitem.status,
                sku: pitem.sku,
                [`sales${pitem.week}`]: currencyFormat(pitem.sales),
                [`ad_sales${pitem.week}`]: currencyFormat(pitem.ad_sales),
              };
            }
            return pacc;
          }, {})
        );

        const weeks = weekly_sales.reduce((wacc, witem, key) => {
          wacc[`sales${witem.week}`] = currencyFormat(witem.sales);
          wacc[`ad_sales${witem.week}`] = currencyFormat(witem.ad_sales);
          return wacc;
        }, {});

        const row1 = {
          key: key + 1,
          name: item.category,
          ...weeks,
          total: currencyFormat(total_sales),
          children: alterProducts,
        };

        acc.push(row1);

        return acc;
      }, []) || [],
    [listLength]
  );

  return (
    <DashboardLayout>
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
                      Product Report List
                    </span>
                  </h3>
                  <div className="card-toolbar gap-3">
                    <ExportToExcel
                      columns={columns.slice(1).reduce((acc, item) => {
                        if (item.children) {
                          acc = acc.concat(
                            item.children.map(
                              (child) => `${item.title} - ${child.title}`
                            )
                          );
                        } else {
                          acc.push(item.title);
                        }
                        return acc;
                      }, [])}
                      rows={data.reduce(
                        (acc, { children, key, name: category, ...item }) => {
                          acc.push({
                            category,
                            ["Product Detail"]: "",
                            ["Active Status"]: "",
                            ...item,
                          });
                          acc = acc.concat(
                            children.map(({ pd, status, name, ...child }) => ({
                              category,
                              ["Product Detail"]: pd,
                              ["Active Status"]: status,
                              ...child,
                            }))
                          );

                          return acc;
                        },
                        []
                      )}
                      fileName={"category-performance-report"}
                      loading={tableLoading}
                    >
                      <button className="btn btn-light-danger btn-sm fw-bolder">
                        Export Data
                      </button>
                    </ExportToExcel>
                  </div>
                </div>
                <div className="card-body pt-0 px-4" style={{}}>
                  {tableLoading ? (
                    <Loading />
                  ) : list?.length != 0 ? (
                    <Table
                      columns={columns}
                      dataSource={data}
                      loading={tableLoading}
                      pagination={false}
                      scroll={{
                        y:
                          typeof window !== "undefined"
                            ? window.innerHeight - 410
                            : undefined,
                        x:
                          columns
                            ?.map((d) => d.width)
                            .reduce((a, b) => a + b, 0) + 500,
                      }}
                    />
                  ) : (
                    <NoData />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
