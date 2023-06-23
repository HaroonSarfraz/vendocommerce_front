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
    month: _.range(0, defaultMonth()),
    year: defaultYear(),
  });

  const CustomerAcquisitionLTVRes = useSelector(selectCustomerAcquisitionLTV);

  const { year, month } = filter;

  useEffect(() => {
    if (month.length > 0 && year) {
      let time = setTimeout(() => {
        dispatch(
          getCustomerAcquisitionLTV({
            search_year: year,
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

  const listContent = list.map((item) => {
    const months = item.otherMonths.reduce((acc, item) => {
      acc[`m-${item.month}`] = item.newCustomerSalesTotal;
      return acc;
    }, {});
    return {
      row_label: `${moment().month(item.month).format("MMM")}-${item.year}`,
      customers: numberFormat(item.newCustomerCount),
      ...months,
    };
  });

  const columns = useMemo(() => {
    return [
      {
        title: "CUSTOMER MADE FIRST ORDER AT",
        width: 200,
        align: "center",
        render: (text) => {
          return text?.row_label;
        },
      },
      {
        title: "NUMBER OF NEW CUSTOMERS",
        width: 180,
        align: "center",
        render: (text) => {
          return text?.customers;
        },
      },
      ...list.slice().reverse()
        .map((item) => ({
          title: item.month_name,
          width: 60,
          align: "center",
          index: item,
          render: (text) => {
            return text[`m-${item.month + 1}`] ? currencyFormat(text[`m-${item.month + 1}`]) : null;
          },
        }))
        .sort((a, b) => b.index - a.index),
    ];
  }, [list]);

  return (
    <DashboardLayout>
      <div className="content d-flex flex-column flex-column-fluid">
        <div className="container-fluid">
          {TopBarFilter(filter, setFilter, "Month", {
            month: false,
            year: false,
          })}

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
                      x:
                        columns
                          ?.map((d) => d.width)
                          .reduce((a, b) => a + b, 0) + 300,
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
