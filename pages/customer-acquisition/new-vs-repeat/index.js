import { useEffect, useState } from "react";
import { TopBarFilter } from "@/src/components/sales-analytics/sales";
import Details from "@/src/components/customer-acquisition/Details";
import Loading from "@/src/components/loading";
import ASINTable from "@/src/components/table";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import { defaultYear } from "@/src/config";
import { getCustomerAcquisition } from "@/src/services/customerAcquisition.services";
import NoData from "@/src/components/no-data";
import { useDispatch, useSelector } from "react-redux";
import { selectCustomerAcquisition } from "@/src/store/slice/customerAcquisition.slice";
import _ from "lodash";
import { currencyFormat, numberFormat } from "@/src/helpers/formatting.helpers";
import moment from "moment";

export default function CustomerAcquisitionNewVSRepeat() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const [filter, setFilter] = useState({
    month: [0, 1, 2],
    year: defaultYear(),
  });

  const CustomerAcquisitionRes = useSelector(selectCustomerAcquisition);

  const totalCustomers = CustomerAcquisitionRes.data.reduce(
    (a, b) => a + b.customer_count,
    0
  );
  const repeatingCustomers = CustomerAcquisitionRes.data.reduce(
    (a, b) => a + b.old_customer_count,
    0
  );
  const newCustomers = CustomerAcquisitionRes.data.reduce(
    (a, b) => a + b.new_customer_count,
    0
  );

  useEffect(() => {
    setLoading(true);
    const { year, month } = filter;
    dispatch(
      getCustomerAcquisition({
        search_year: year,
        search_month: month?.join(","),
      })
    );
  }, [filter]);

  useEffect(() => {
    if (!_.isEmpty(CustomerAcquisitionRes)) {
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
          <span>
            {moment()
              .month(text.month - 1)
              .format("MMM") +
              "-" +
              (text.year || filter.year) }
          </span>
        );
      },
    },
    {
      title: "CUSTOMERS",
      width: "80px",
      align: "center",
      sorter: (a, b) => a.customer_count - b.customer_count,
      render: (text) => {
        return <span>{numberFormat(text?.customer_count)}</span>;
      },
    },
    {
      title: "REPEATING CUSOMER",
      width: "120px",
      align: "center",
      sorter: (a, b) => a.old_customer_count - b.old_customer_count,
      render: (text) => {
        return <span>{numberFormat(text?.old_customer_count)}</span>;
      },
    },
    {
      title: "NEW CUSTOMER",
      width: "130px",
      align: "center",
      sorter: (a, b) => a.new_customer_count - b.new_customer_count,
      render: (text) => {
        return <span>{numberFormat(text?.new_customer_count)}</span>;
      },
    },
    {
      title: "AD SPENDS",
      width: "90px",
      align: "center",
      sorter: (a, b) => (a.spend || 0) - (b.spend || 0),
      render: (text) => {
        return <span>{`${currencyFormat(text?.spend)}`}</span>;
      },
    },
    {
      title: "CAC",
      width: "100px",
      align: "center",
      sorter: (a, b) => (a.CPC || 0) - (b.CPC || 0),
      render: (text) => {
        return <span>{`${currencyFormat(text?.CPC)}`}</span>;
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
                  <button className="btn btn-light btn-active-light-dark btn-sm fw-bolder me-3">
                    Export
                  </button>
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
