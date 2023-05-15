import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { TopBarFilter } from "@/src/components/sales-analytics/sales";
import Loading from "@/src/components/loading";
import ASINTable from "@/src/components/table";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import { defaultYear } from "@/src/config";
import { selectCustomerAcquisitionList } from "@/src/store/slice/customerAcquisition.slice";
import { getCustomerAcquisitionList } from "@/src/services/customerAcquisition.services";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import moment from "moment";
import { currencyFormat, numberFormat } from "@/src/helpers/formatting.helpers";
import NoData from "@/src/components/no-data";

export default function CustomerAcquisitionLtv() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [list , setList] = useState();

  const [filter, setFilter] = useState({
    month: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    year: defaultYear(),
  });
  const CustomerAcquisitionListRes = useSelector(selectCustomerAcquisitionList);
  const brand = typeof window !== 'undefined' && JSON.parse(localStorage.getItem("brand"));

  useEffect(() => {
    const { year, month } = filter;
    dispatch(
      getCustomerAcquisitionList({
        brand_id: brand?.id,
        search_year: year,
        search_month: month?.join(','),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    if (!_.isEmpty(CustomerAcquisitionListRes)) {
      setList(Object.values([...CustomerAcquisitionListRes.data] || {}));
      setLoading(false);
    }
  }, [CustomerAcquisitionListRes]);

  const columns = [
    {
      title: "CUSTOMER MADE FIRST ORDER AT",
      width: 200,
      align: "center",
      render: (text) => {
        return <span>{moment().month(text.month - 1).format("MMM") + '-' + text.year}</span>;
      },
    },
    {
      title: "NUMBER OF NEW CUSTOMERS",
      width: 180,
      align: "center",
      render: (text) => {
        return <span>{numberFormat(text?.new_customer_count)}</span>;
      },
    },
    {
      title: "MONTH0",
      width: 60,
      align: "center",
      render: (text) => {
        return <span>{`${currencyFormat(text.revenue)}`}</span>;
      },
    },
    {
      title: "MONTH1",
      width: 60,
      align: "center",
      render: (text) => {
        return <span>{`${currencyFormat(text.revenue)}`}</span>;
      },
    },
    {
      title: "MONTH2",
      width: 60,
      align: "center",
      render: (text) => {
        return <span>{`${currencyFormat(text.revenue)}`}</span>;
      },
    },
    {
      title: "MONTH3",
      width: 60,
      align: "center",
      render: (text) => {
        return <span>{`${currencyFormat(text.revenue)}`}</span>;
      },
    },
    {
      title: "MONTH4",
      width: 60,
      align: "center",
      render: (text) => {
        return <span>{`${currencyFormat(text.revenue)}`}</span>;
      },
    },
    {
      title: "MONTH5",
      width: 60,
      align: "center",
      render: (text) => {
        return <span>{`${currencyFormat(text.revenue)}`}</span>;
      },
    },
    {
      title: "MONTH6",
      width: 60,
      align: "center",
      render: (text) => {
        return <span>{`${currencyFormat(text.revenue)}`}</span>;
      },
    },
    {
      title: "MONTH7",
      width: 60,
      align: "center",
      render: (text) => {
        return <span>{`${currencyFormat(text.revenue)}`}</span>;
      },
    },
    {
      title: "MONTH8",
      width: 60,
      align: "center",
      render: (text) => {
        return <span>{`${currencyFormat(text.revenue)}`}</span>;
      },
    },
  ];

  return (
    <DashboardLayout>
      <div className="content d-flex flex-column flex-column-fluid">
        <div className="container-fluid">
          {TopBarFilter(filter, setFilter, "Month")}

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
                ) : (
                  <NoData/>
                )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
