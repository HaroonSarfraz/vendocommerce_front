import { useEffect, useState } from "react";
import TopBarFilter from "@/src/components/advertising-analytics/top-bar-filter";
import Graph from "@/src/components/advertising-analytics/total-revenue/Graph";
import Drawers from "@/src/components/advertising-analytics/total-revenue/Drawer";
import Loading from "@/src/components/loading";
import ASINTable from "@/src/components/table";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import { useSelector, useDispatch } from "react-redux";
import { defaultWeek, defaultYear } from "@/src/config";
import { getAdvertising } from "@/src/services/advertisingTotalRevenue.services";
import { selectAdvertisingTotalRevenue } from "@/src/store/slice/advertisingTotalRevenue.slice";
import _ from "lodash";
import {
  currencyFormat,
  numberFormat,
  percentageFormat,
} from "@/src/helpers/formatting.helpers";

import {
  fetchConfigurations,
  updateConfigurations,
} from "@/src/api/configurations.api";

const configurationTableKey = "total-revenue-acos-table";
const configurationGraphKey = "total-revenue-acos-graph";

export default function TotalRevenueAcos() {
  const dispatch = useDispatch();

  const advertisements = useSelector(selectAdvertisingTotalRevenue);

  const [loading, setLoading] = useState(true);
  const [tableConfigOpen, setTableConfigOpen] = useState(false);
  const [graphConfigOpen, setGraphConfigOpen] = useState(false);
  const [columnsList, setColumnsList] = useState([]);
  const [tableColumnConfig, setTableColumnConfig] = useState([]);
  const [tableColumnConfigLoaded, setTableColumnConfigLoaded] = useState(false);
  const [graphColumnConfig, setGraphColumnConfig] = useState([]);
  const [graphColumnConfigLoaded, setGraphColumnConfigLoaded] = useState(false);

  const [filter, setFilter] = useState({
    week: _.range(1, defaultWeek() + 1),
    year: defaultYear(),
  });

  const [advertisementsData, setAdvertisementsData] = useState([]);
  useEffect(() => {
    if (advertisements?.status === true) {
      setAdvertisementsData(advertisements?.data || []);
      setLoading(false);
    } else if (advertisements?.status === false) {
      setAdvertisementsData([]);
      setLoading(false);
    }
  }, [advertisements]);

  useEffect(() => {
    const time = setTimeout(() => {
      dispatch(
        getAdvertising({
          search_year: filter?.year,
          search_week: filter?.week?.join(","),
        })
      );
    }, 600);
    return () => {
      clearTimeout(time);
    };
  }, [filter]);

  const showDSP = advertisementsData.reduce(
    (acc, item) => acc + item.twDspRevenue,
    0
  );

  const columns = [
    {
      title: "WEEK",
      width: "100px",
      align: "center",
      sorter: (a, b) => a.week - b.week,
      render: (text) => {
        return <span>{"WK" + text?.week}</span>;
      },
    },
    {
      title: "SPEND",
      width: "100px",
      align: "center",
      sorter: (a, b) => a.twSpend - b.twSpend,
      render: (text) => {
        return <span>{currencyFormat(text?.twSpend)}</span>;
      },
    },
    {
      title: "SPEND CHG",
      width: "140px",
      align: "center",
      sorter: (a, b) => a.spendChange - b.spendChange,
      render: (text) => {
        return (
          <span style={{ color: text.spendChange < 0 ? "red" : "green" }}>
            {percentageFormat(text?.spendChange)}
          </span>
        );
      },
    },
    {
      title: "AD REVENUE",
      width: "150px",
      align: "center",
      sorter: (a, b) => a.twRevenue - b.twRevenue,
      render: (text) => {
        return <span>{currencyFormat(text?.twRevenue)}</span>;
      },
    },
    {
      title: "AD CHG",
      width: "120px",
      align: "center",
      sorter: (a, b) => a.adChange - b.adChange,
      render: (text) => {
        return (
          <span style={{ color: text.adChange < 0 ? "red" : "green" }}>
            {percentageFormat(text?.adChange)}
          </span>
        );
      },
    },
    {
      title: "ORGANIC SALES",
      width: "180px",
      align: "center",
      sorter: (a, b) => a.organicSales - b.organicSales,
      render: (text) => {
        return <span>{currencyFormat(text?.organicSales)}</span>;
      },
    },
    {
      title: "ORGANIC CHG",
      width: "150px",
      align: "center",
      sorter: (a, b) => a.organicSalesChange - b.organicSalesChange,
      render: (text) => {
        return (
          <span
            style={{ color: text.organicSalesChange < 0 ? "red" : "green" }}
          >
            {percentageFormat(text?.organicSalesChange)}
          </span>
        );
      },
    },
    {
      title: "TOTAL SALES",
      width: "150px",
      align: "center",
      sorter: (a, b) => a.totalSales - b.totalSales,
      render: (text) => {
        return <span>{currencyFormat(text?.totalSales)}</span>;
      },
    },
    {
      title: "TOTAL ACOS",
      width: "150px",
      align: "center",
      sorter: (a, b) => a.ACoS_percentage - b.ACoS_percentage,
      render: (text) => {
        return (
          <span style={{ color: text.ACoS_percentage < 0 ? "red" : "green" }}>
            {percentageFormat(text?.ACoS_percentage)}
          </span>
        );
      },
    },
    {
      title: "IMPRESSIONS",
      width: "150px",
      align: "center",
      sorter: (a, b) => a.impression - b.impression,
      render: (text) => {
        return <span>{numberFormat(text?.impression)}</span>;
      },
    },
    {
      title: "CLICKS",
      width: "120px",
      align: "center",
      sorter: (a, b) => a.clicks - b.clicks,
      render: (text) => {
        return <span>{numberFormat(text?.clicks)}</span>;
      },
    },
    {
      title: "TOTAL UNIT ORDERS",
      width: "200px",
      align: "center",
      sorter: (a, b) => a.totalUnitOrder - b.totalUnitOrder,
      render: (text) => {
        return <span>{numberFormat(text?.totalUnitOrder)}</span>;
      },
    },
    {
      title: "BRANDED SPEND",
      width: "170px",
      align: "center",
      sorter: (a, b) => a.brandedSpends - b.brandedSpends,
      render: (text) => {
        return <span>{currencyFormat(text?.brandedSpends)}</span>;
      },
    },
    {
      title: "BRANDED SALES",
      width: "170px",
      align: "center",
      sorter: (a, b) => a.brandedSales - b.brandedSales,
      render: (text) => {
        return <span>{currencyFormat(text?.brandedSales)}</span>;
      },
    },
    {
      title: "BRANDED ROAS",
      width: "160px",
      align: "center",
      sorter: (a, b) => a.brandedRoAS - b.brandedRoAS,
      render: (text) => {
        return <span>{numberFormat(text?.brandedRoAS)}</span>;
      },
    },
    {
      title: "NON BRANDED SPEND",
      width: "210px",
      align: "center",
      sorter: (a, b) => a.nonBrandedSpends - b.nonBrandedSpends,
      render: (text) => {
        return <span>{currencyFormat(text?.nonBrandedSpends)}</span>;
      },
    },
    {
      title: "NON BRANDED SALES",
      width: "200px",
      align: "center",
      sorter: (a, b) => a.nonBrandedSales - b.nonBrandedSales,
      render: (text) => {
        return <span>{currencyFormat(text?.nonBrandedSales)}</span>;
      },
    },
    {
      title: "NON BRANDED ROAS",
      width: "200px",
      align: "center",
      sorter: (a, b) => a.nonBrandedRoAS - b.nonBrandedRoAS,
      render: (text) => {
        return <span>{numberFormat(text?.nonBrandedRoAS)}</span>;
      },
    },
    //

    ...(showDSP
      ? [
          {
            title: "DSP SPEND",
            width: "200px",
            align: "center",
            sorter: (a, b) => a.twDspSpend - b.twDspSpend,
            render: (text) => {
              return <span>{numberFormat(text?.twDspSpend)}</span>;
            },
          },
          {
            title: "DSP SPEND CHANGE",
            width: "200px",
            align: "center",
            sorter: (a, b) => a.dspSpendChange - b.dspSpendChange,
            render: (text) => {
              return <span>{numberFormat(text?.dspSpendChange)}</span>;
            },
          },
          {
            title: "DSP SALES",
            width: "200px",
            align: "center",
            sorter: (a, b) => a.twDspRevenue - b.twDspRevenue,
            render: (text) => {
              return <span>{numberFormat(text?.twDspRevenue)}</span>;
            },
          },
          {
            title: "DSP SALES CHANGE",
            width: "200px",
            align: "center",
            sorter: (a, b) => a.dspRevenueChange - b.dspRevenueChange,
            render: (text) => {
              return <span>{numberFormat(text?.dspRevenueChange)}</span>;
            },
          },
        ]
      : []),
    {
      title: "TOTAL SPEND",
      width: "200px",
      align: "center",
      sorter: (a, b) => a.twSpend - b.twSpend,
      render: (text) => {
        return <span>{numberFormat(text?.twSpend)}</span>;
      },
    },
  ];

  useEffect(() => {
    const list = columns.slice(0).map((d) => d.title);

    setColumnsList(list);
    setTableColumnConfig(["TOTAL SALES"]);
    setGraphColumnConfig(["TOTAL SALES"]);

    fetchConfigurations(configurationTableKey)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          res.data?.length > 0 && setTableColumnConfig(res.data);
          setTableColumnConfigLoaded(true);
        }
      })
      .catch((_err) => {
        message.error("Something went wrong");
      });

    fetchConfigurations(configurationGraphKey)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          res.data?.length > 0 && setGraphColumnConfig(res.data);
          setGraphColumnConfigLoaded(true);
        }
      })
      .catch((_err) => {
        message.error("Something went wrong");
      });
  }, []);

  useEffect(() => {
    if (tableColumnConfigLoaded && tableColumnConfig.length > 0) {
      updateConfigurations(configurationTableKey, tableColumnConfig);
    }
  }, [tableColumnConfig]);

  useEffect(() => {
    if (graphColumnConfigLoaded && graphColumnConfig.length > 0) {
      updateConfigurations(configurationGraphKey, graphColumnConfig);
    }
  }, [graphColumnConfig]);

  return (
    <DashboardLayout>
      <div className="content d-flex flex-column flex-column-fluid">
        <div className="container-fluid">
          {TopBarFilter(filter, setFilter, "Week", {
            loading: false,
            data: {},
          })}

          <div className="mt-5 col-lg-12">
            <div className="card mb-7 pt-5">
              <div className="card-body pt-2">
                <div className="mb-5 d-flex flex-row justify-content-end">
                  <button
                    onClick={() => setGraphConfigOpen(true)}
                    className="btn btn-light btn-active-light-dark btn-sm fw-bolder me-3"
                  >
                    Configuration
                  </button>
                </div>
                <Graph
                  loading={loading}
                  chartData={advertisementsData}
                  columnConfig={graphColumnConfig}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 col-lg-12">
            <div className="card mb-7 pt-5">
              <div className="card-body pt-2">
                <div className="mb-5 d-flex flex-row justify-content-end">
                  <button
                    onClick={() => setTableConfigOpen(true)}
                    className="btn btn-light btn-active-light-dark btn-sm fw-bolder me-3"
                  >
                    Configuration
                  </button>
                </div>

                {loading ? (
                  <Loading />
                ) : (
                  <ASINTable
                    columns={columns.filter(
                      (c) =>
                        c.title == "WEEK" || tableColumnConfig.includes(c.title)
                    )}
                    dataSource={advertisementsData}
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
                )}
              </div>
            </div>
          </div>
        </div>
        {tableConfigOpen && (
          <Drawers
            columnsList={columnsList.slice(1)}
            columnConfig={tableColumnConfig}
            setColumnConfig={setTableColumnConfig}
            open={tableConfigOpen}
            onHide={() => setTableConfigOpen(false)}
          />
        )}
        {graphConfigOpen && (
          <Drawers
            columnsList={columnsList.slice(1)}
            columnConfig={graphColumnConfig}
            setColumnConfig={setGraphColumnConfig}
            open={graphConfigOpen}
            onHide={() => setGraphConfigOpen(false)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
