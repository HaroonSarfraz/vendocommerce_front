import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import Loading from "@/src/components/loading";
import { defaultWeek, defaultYear } from "@/src/config";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Table } from "antd";
import { currencyFormat } from "@/src/helpers/formatting.helpers";
import NoData from "@/src/components/no-data";
import TopBarFilter from "./top-bar-filter-product-report";
import { getProductReportList } from "@/src/services/productReport.services";
import { selectProductReportList } from "@/src/store/slice/productReport.slice";
import { getCategoryList } from "@/src/services/categoryList.services";
import { ExportToExcel } from "@/src/hooks/Excelexport";

const columnToggleOptions = [
  { label: "Active status", value: "status" },
  { label: "Product Detail", value: "pg" },
  { label: "Sales", value: "sales" },
  { label: "AD Sales", value: "ad_sales" },
  { label: "AD Spend", value: "ad_spend" },
];

const columnToggleInitialValues = [
  "sales",
  "ad_spend",
  "ad_sales",
  "status",
  "pg",
];

export default function ProductReportPage() {
  const dispatch = useDispatch();

  const ProductReportListRes = useSelector(selectProductReportList);

  const [tableLoading, setTableLoading] = useState(true);
  const [list, setList] = useState([]);
  const [columnToggle, setColumnToggle] = useState(columnToggleInitialValues);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = JSON.parse(localStorage.getItem("cr-pr") || "[]");
      if (data.length !== 0) {
        setColumnToggle(data);
      }
    }
  }, [setColumnToggle]);

  const onChange = (checkedValues) => {
    const valid = checkedValues.some(
      (item) => item === "sales" || item === "ad_spend" || item === "ad_sales"
    );
    const data = valid ? checkedValues : columnToggleInitialValues;
    localStorage.setItem("cr-pr", JSON.stringify(data));
    setColumnToggle(data);
  };

  const [filter, setFilter] = useState({
    week: _.range(1, defaultWeek() + 1),
    year: defaultYear(),
    asin: "",
    category: [],
  });

  useEffect(() => {
    dispatch(getCategoryList({ limit: 9999 }));
  }, []);

  useEffect(() => {
    const { year, week, asin, category } = filter;
    if (week.length > 0 && year) {
      const time = setTimeout(() => {
        dispatch(
          getProductReportList({
            search_year: year,
            search_week: week?.join(","),
            asin,
            category: category.join(","),
          })
        );
      }, 600);
      return () => {
        clearTimeout(time);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    setList(ProductReportListRes.data);
    setTableLoading(false);
  }, [ProductReportListRes]);

  console.log(ProductReportListRes);
  const findWeeksCount = useMemo(
    () =>
      _.uniqBy(
        list.reduce((acc, item) => {
          const weeks = item.weekly_sales.map((item) => item.week);
          acc = acc.concat(weeks);
          return acc;
        }, [])
      ),
    [list, filter]
  );

  const weekGroupColumn =
    findWeeksCount.map((item) => ({
      title: `WK${item}`,
      key: `WK${item}`,
      children: [
        columnToggle.includes("sales") && {
          title: "Sales",
          dataIndex: `sales${item}`,
          key: `sales${item}`,
          width: 110,
        },
        columnToggle.includes("ad_sales") && {
          title: "AD Sales",
          dataIndex: `ad_sales${item}`,
          key: `ad_sales${item}`,
          width: 110,
        },
        columnToggle.includes("ad_spend") && {
          title: "AD Spend",
          dataIndex: `ad_spend${item}`,
          key: `ad_spend${item}`,
          width: 110,
        },
      ].filter(Boolean),
    })) || [];

  const columns = useMemo(
    () =>
      [
        {
          title: "",
          width: 40,
          fixed: "left",
        },
        {
          title: "Row Labels",
          width: 155,
          ellipsis: true,
          dataIndex: "name",
          key: "name",
          fixed: "left",
        },
        columnToggle.includes("pg") && {
          title: "Product Detail",
          width: 221,
          dataIndex: "pd",
          key: "pd",
        },
        columnToggle.includes("status") && {
          title: "Active Status",
          width: 129,
          dataIndex: "status",
          key: "status",
        },
        ...weekGroupColumn,
        {
          title: "Total",
          dataIndex: "total",
          key: "total",
          children: [
            columnToggle.includes("sales") && {
              title: "Sales",
              dataIndex: `sales_total`,
              key: `sales_total`,
              width: 110,
            },
            columnToggle.includes("ad_sales") && {
              title: "AD Sales",
              dataIndex: `ad_sales_total`,
              key: `ad_sales_total`,
              width: 110,
            },
            columnToggle.includes("ad_spend") && {
              title: "AD Spend",
              dataIndex: `ad_spend_total`,
              key: `ad_spend_total`,
              width: 110,
            },
          ].filter(Boolean),
        },
      ].filter(Boolean),
    [list, filter, weekGroupColumn, columnToggle]
  );

  const data = useMemo(
    () =>
      list
        ?.reduce((acc, item, key) => {
          const {
            total_sales,
            total_ad_sales,
            total_ad_spend,
            weekly_sales,
            products,
            products_total,
          } = item;

          5403.21;
          const alterProducts = Object.values(
            products.reduce((pacc, pitem, key) => {
              if (pacc[pitem.asin]) {
                pacc[pitem.asin] = {
                  ...pacc[pitem.asin],
                  [`sales${pitem.week}`]: currencyFormat(pitem.sales),
                  [`ad_sales${pitem.week}`]: currencyFormat(pitem.ad_sales),
                  [`ad_spend${pitem.week}`]: currencyFormat(pitem.ad_spend),
                  // products_total
                  sales_total: currencyFormat(
                    products_total.find((fid) => fid.asin === pitem.asin)
                      ?.sales || "0"
                  ),
                  ad_sales_total: currencyFormat(
                    products_total.find((fid) => fid.asin === pitem.asin)
                      ?.ad_sales || "0"
                  ),
                  ad_spend_total: currencyFormat(
                    products_total.find((fid) => fid.asin === pitem.asin)
                      ?.ad_spend || "0"
                  ),
                };
              } else {
                pacc[pitem.asin] = {
                  name: pitem.asin,
                  pd: `SKU:${pitem.sku} ${pitem.title}`,
                  status: pitem.status,
                  sku: pitem.sku,
                  [`sales${pitem.week}`]: currencyFormat(pitem.sales),
                  [`ad_sales${pitem.week}`]: currencyFormat(pitem.ad_sales),
                  [`ad_spend${pitem.week}`]: currencyFormat(pitem.ad_spend),
                };
              }
              return pacc;
            }, {})
          );

          const weeks = weekly_sales.reduce((wacc, witem, key) => {
            wacc[`sales${witem.week}`] = currencyFormat(witem.sales);
            wacc[`ad_sales${witem.week}`] = currencyFormat(witem.ad_sales);
            wacc[`ad_spend${witem.week}`] = currencyFormat(witem.ad_spend);
            return wacc;
          }, {});

          const row1 = {
            key: key + 1,
            name: item.category,
            ...weeks,
            sales_total: currencyFormat(total_sales),
            total_sales,
            ad_sales_total: currencyFormat(total_ad_sales),
            ad_spend_total: currencyFormat(total_ad_spend),
            children: alterProducts,
          };

          acc.push(row1);

          return acc;
        }, [])
        .sort((a, b) => b.total_sales - a.total_sales),
    [list, filter]
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
                    <Checkbox.Group
                      options={columnToggleOptions}
                      value={columnToggle}
                      onChange={onChange}
                    />
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
                      bordered
                      columns={columns}
                      dataSource={data}
                      loading={tableLoading}
                      pagination={false}
                      scroll={{
                        y:
                          typeof window !== "undefined"
                            ? window.innerHeight - 310
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
