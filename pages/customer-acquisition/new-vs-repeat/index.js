import { useEffect, useState } from "react";
import { TopBarFilter } from "@/src/components/sales-analytics/sales";
import Details from "@/src/components/customer-acquisition/Details";
import Loading from "@/src/components/loading";
import ASINTable from "@/src/components/table";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import { defaultYear, defaultMonth } from "@/src/config";
import { getCustomerAcquisition } from "@/src/services/customerAcquisition.services";
import NoData from "@/src/components/no-data";
import { useDispatch, useSelector } from "react-redux";
import { selectCustomerAcquisition } from "@/src/store/slice/customerAcquisition.slice";
import _ from "lodash";
import { currencyFormat, numberFormat } from "@/src/helpers/formatting.helpers";
import moment from "moment";
import { ExportToExcel } from "@/src/hooks/Excelexport";

export default function CustomerAcquisitionNewVSRepeat() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const [filter, setFilter] = useState({
    month: _.range(0, defaultMonth() + 1),
    year: defaultYear(),
  });

  const CustomerAcquisitionRes = useSelector(selectCustomerAcquisition);

  const totalCustomers = CustomerAcquisitionRes.data.reduce(
    (a, b) => a + parseFloat(b.customer_count),
    0
  );
  const repeatingCustomers = CustomerAcquisitionRes.data.reduce(
    (a, b) => a + parseFloat(b.old_customer_count),
    0
  );
  const newCustomers = CustomerAcquisitionRes.data.reduce(
    (a, b) => a + parseFloat(b.new_customer_count),
    0
  );

  useEffect(() => {
    const { year, month } = filter;
    if (month.length > 0 && year) {
      setLoading(true);
      const time = setTimeout(() => {
        dispatch(
          getCustomerAcquisition({
            search_year: year,
            search_month: month?.join(","),
          })
        );
      }, 600);
      return () => {
        clearTimeout(time);
      };
    }
  }, [filter]);

  useEffect(() => {
    if (CustomerAcquisitionRes.status) {
      setList(CustomerAcquisitionRes.data || []);
      setLoading(false);
    } else if (CustomerAcquisitionRes?.status === false) {
      setList([]);
      setLoading(false);
    }
  }, [CustomerAcquisitionRes]);

  const columns = [
    {
      title: "ROW LABEL",
      width: "80px",
      align: "center",
      sorter: (a, b) => a.month - b.month,
      render: (text) => {
        return (
          text.month_name.substring(0, 3) +
          "-" +
          (text.year || filter.year)
        );
      },
    },
    {
      title: "CUSTOMERS",
      width: "80px",
      align: "center",
      sorter: (a, b) => a.customer_count - b.customer_count,
      render: (text) => {
        return numberFormat(text?.customer_count);
      },
    },
    {
      title: "REPEATING CUSOMER",
      width: "120px",
      align: "center",
      sorter: (a, b) => a.old_customer_count - b.old_customer_count,
      render: (text) => {
        return numberFormat(text?.old_customer_count);
      },
    },
    {
      title: "NEW CUSTOMER",
      width: "130px",
      align: "center",
      sorter: (a, b) => a.new_customer_count - b.new_customer_count,
      render: (text) => {
        return numberFormat(text?.new_customer_count);
      },
    },
    {
      title: "AD SPENDS",
      width: "90px",
      align: "center",
      sorter: (a, b) => (a.spend || 0) - (b.spend || 0),
      render: (text) => {
        return currencyFormat(text?.spend);
      },
    },
    {
      title: "CAC",
      width: "100px",
      align: "center",
      render: (text) => {
        return currencyFormat(text?.spend / text?.new_customer_count);
      },
    },
  ];

  return (
    <DashboardLayout>
      <div className="content d-flex flex-column flex-column-fluid">
        <div className="container-fluid">
          {TopBarFilter(filter, setFilter, "Month")}

          <div className="row gx-5 gx-xl-5">
            <div className="col-xl-12 mb-5 mb-xl-5">
              <div className="card card-flush h-xl-100">
                <div className="card-body py-3 pt-5">
                  <div className="row g-3">
                    <Details
                      loading={loading}
                      data={[
                        {
                          title: "Customers",
                          value: totalCustomers,
                        },
                        {
                          title: "Repeating Customer",
                          value: repeatingCustomers,
                        },
                        {
                          title: "New Customer",
                          value: newCustomers,
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="card mb-7 pt-5">
              <div className="card-body pt-2">
                <div className="mb-5 d-flex flex-row justify-content-end">
                  <ExportToExcel
                    columns={[
                      "mounth",
                      ...columns
                        .slice(1)
                        .map((item) => item.title.toLowerCase()),
                    ]}
                    rows={list.map((data) =>
                      columns.map((item) => item.render(data))
                    )}
                    fileName={"new-vs-repeat"}
                    loading={loading}
                  >
                    <button className="btn btn-light btn-active-light-dark btn-sm fw-bolder me-3">
                      Export Data
                    </button>
                  </ExportToExcel>
                </div>

                {loading ? (
                  <Loading />
                ) : list?.length != 0 ? (
                  <ASINTable
                    columns={columns}
                    dataSource={list}
                    ellipsis
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
                ) : (
                  <NoData />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
