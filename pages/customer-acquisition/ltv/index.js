import { useEffect, useMemo, useState } from "react";
import { TopBarFilter } from "@/src/components/sales-analytics/sales";
import Loading from "@/src/components/loading";
import ASINTable from "@/src/components/table";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { defaultMonth, defaultYear } from "@/src/config";
import { getCustomerAcquisitionLTV } from "@/src/services/customerAcquisition.services";
import { selectCustomerAcquisitionLTV } from "@/src/store/slice/customerAcquisitionLTV.slice";
import moment from "moment";
import { currencyFormat } from "@/src/helpers/formatting.helpers";
import { numberFormat } from "@/src/helpers/formatting.helpers";
import { ExportToExcel } from "@/src/hooks/Excelexport";

export default function SalesByMonth() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const [filter, setFilter] = useState({
    month: _.range(0, 12),
    year: _.range(2020, 2026),
  });

  const CustomerAcquisitionLTVRes = useSelector(selectCustomerAcquisitionLTV);

  const { year, month } = filter;

  useEffect(() => {
    if (month.length > 0 && year) {
      let time = setTimeout(() => {
        dispatch(
          getCustomerAcquisitionLTV({
            search_year: year?.join(","),
            search_month: month?.join(","),
          })
        );
      }, 600);
      return () => {
        clearTimeout(time);
      };
    }
  }, [year, month]);

  useEffect(() => {
    if (CustomerAcquisitionLTVRes.status) {
      setList(CustomerAcquisitionLTVRes.data || []);
      setLoading(false);
    } else if (CustomerAcquisitionLTVRes?.status === false) {
      setList([]);
      setLoading(false);
    }
  }, [CustomerAcquisitionLTVRes]);

  const listContent = list
    .map((item) => {
      const months = item.otherMonths.reduce((acc, item) => {
        acc[`m-${item.year * 12 + item.month}`] = item.newCustomerSalesTotal;
        return acc;
      }, {});
      return {
        row_id: item.year * 12 + item.month,
        row_label: `${moment().month(item.month).format("MMM")}-${item.year}`,
        customers: numberFormat(item.newCustomerCount),
        ...months,
      };
    })
    .sort((a, b) => a.row_id - b.row_id);
  const columns = useMemo(() => {
    return [
      {
        title: "CUSTOMER MADE FIRST ORDER AT",
        width: 200,
        align: "center",
        fixed: true,
        render: (text) => {
          return <b>{text?.row_label}</b>;
        },
      },
      {
        title: "NUMBER OF NEW CUSTOMERS",
        width: 110,
        align: "center",
        render: (text) => {
          return text?.customers;
        },
      },
      ...list
        .slice()
        .map((item,key) => {
          console.log(item);
          return {
            title: `Month ${key}`,
            width: 100,
            align: "center",
            index: item.year * 12 + item.month,
            render: (text) => {
              return text[`m-${item.year * 12 + item.month}`]
                ? currencyFormat(text[`m-${item.year * 12 + item.month}`])
                : null;
            },
          };
        })
        .sort((a, b) => a.index - b.index),
    ];
  }, [list]);

  return (
    <DashboardLayout>
      <div className="content d-flex flex-column flex-column-fluid">
        <div className="container-fluid">
          {/* {TopBarFilter(filter, setFilter, "Month", {
            month: false,
            year: false,
          })} */}

          <div className="col-lg-12">
            <div className="card mb-7 pt-5">
              <div className="card-body pt-2">
                <div className="mb-5 d-flex flex-row justify-content-end">
                  <ExportToExcel
                    columns={columns.map((item) => item.title)}
                    rows={listContent.map((item) => {
                      return columns.reduce((acc, col) => {
                        acc[col.title] = col.render(item);
                        return acc;
                      }, {});
                    })}
                    loading={loading}
                    fileName={"customer-acquisition-ltv"}
                  />
                </div>

                {loading ? (
                  <Loading months={month} />
                ) : (
                  <ASINTable
                    columns={columns}
                    dataSource={listContent}
                    // ellipsis
                    rowKey="key"
                    loading={loading}
                    pagination={false}
                    scroll={{
                      y:
                        typeof window !== "undefined"
                          ? window.innerHeight - 310
                          : undefined,
                      x:
                        columns
                          ?.map((d) => d.width)
                          .reduce((a, b) => a + b, 0) + 900,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
