import React, { useEffect, useState } from 'react';
import { Select, Skeleton } from 'antd';
import Chart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { TopBarFilter } from '../sales';
import { DotChartOutlined } from '@ant-design/icons';
import Loading from '../../loading';
import Details from '../Detail';
import Link from 'next/link';
import {
  getSalesByMonthData,
  getSalesByMonthDetail,
  getSalesByMonthGraph
} from '@/src/services/month.services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function (props) {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    month: [],
    year: 2023
  });

  const [graphFilter, setGraphFilter] = useState('child_asin');
  const [expand, setExpand] = useState(null);

  const [salesByMonthData, setSalesByMonthData] = useState({});
  const [salesByMonthDataLoading, setSalesByMonthDataLoading] = useState(true);

  const [salesByMonthDetail, setSalesByMonthDetail] = useState([]);
  const [salesByMonthDetailLoading, setSalesByMonthDetailLoading] =
    useState(true);

  const [salesByMonthGraph, setSalesByMonthGraph] = useState({
    series: [],
    label: []
  });
  const [salesByMonthGraphLoading, setSalesByMonthGraphLoading] =
    useState(true);

  const SalesByMonthDataRes = useSelector(
    (state) => state.month.salesByMonthData || {}
  );
  const SalesByMonthDetailRes = useSelector(
    (state) => state.month.salesByMonthDetail || {}
  );
  const SalesByMonthGraphRes = useSelector(
    (state) => state.month.salesByMonthGraph || {}
  );

  useEffect(() => {
    const { month, year } = filter;
    setSalesByMonthDataLoading(true);
    dispatch(
      getSalesByMonthData({
        search_year: year,
        search_month: month?.join(',')
      })
    );
    setSalesByMonthDetailLoading(true);
    dispatch(
      getSalesByMonthDetail({
        search_year: year,
        search_month: month?.join(',')
      })
    );
    setSalesByMonthGraphLoading(true);
    dispatch(
      getSalesByMonthGraph({
        search_year: year,
        search_month: month?.join(','),
        graph_filter_type: ''
      })
    );
  }, [filter]);

  useEffect(() => {
    if (SalesByMonthDataRes?.status === true) {
      setSalesByMonthData(SalesByMonthDataRes?.data?.[0] || {});
      setSalesByMonthDataLoading(false);
    } else if (SalesByMonthDataRes?.status === false) {
      setSalesByMonthData({});
      setSalesByMonthDataLoading(false);
    }
  }, [SalesByMonthDataRes]);

  useEffect(() => {
    if (SalesByMonthDetailRes?.status === true) {
      setSalesByMonthDetail(SalesByMonthDetailRes?.data || []);
      setSalesByMonthDetailLoading(false);
    } else if (SalesByMonthDetailRes?.status === false) {
      setSalesByMonthDetailLoading(false);
      setSalesByMonthDetail([]);
    }
  }, [SalesByMonthDetailRes]);

  useEffect(() => {
    if (SalesByMonthGraphRes?.status === true) {
      const series_ = [];
      let labels_ = [];
      if (SalesByMonthGraphRes?.data?.length !== 0) {
        labels_ = SalesByMonthGraphRes?.data?.map((d) => d?.label);
        const name_ = Object.keys(SalesByMonthGraphRes?.data?.[0])?.filter(
          (d) => d?.includes('_label')
        );
        name_?.forEach((name) => {
          const name__ = name;
          series_.push({
            name: SalesByMonthGraphRes?.data?.[0]?.[name],
            data: SalesByMonthGraphRes?.data?.map(
              (d) => d?.[name__?.replace('_label', '')]
            ),
            type: 'area'
          });
        });
      }
      setSalesByMonthGraph({
        series: series_ || [],
        label: labels_ || []
      });
      setSalesByMonthGraphLoading(false);
    } else if (SalesByMonthGraphRes?.status === false) {
      setSalesByMonthGraphLoading(false);
      setSalesByMonthGraph({
        series: [],
        label: []
      });
    }
  }, [SalesByMonthGraphRes]);

  return (
    <div
      className='content d-flex flex-column flex-column-fluid'
      id='kt_content'
    >
      <div className='container-fluid' id='kt_content_container'>
        {TopBarFilter(filter, setFilter, 'Month')}
        <div className='row gx-5 gx-xl-5'>
          <div className='col-xl-12 mb-5 mb-xl-5'>
            <div className='card card-flush h-xl-100'>
              <div className='card-header min-h-55px '>
                <div className='d-flex flex-stack flex-wrap gap-4'>
                  <div className='position-relative '>
                    <Select
                      style={{ width: 200 }}
                      onChange={(e) => setGraphFilter(e)}
                      value={graphFilter || null}
                      options={[
                        {
                          label: 'Parent ASIN',
                          value: 'parent_asin'
                        },
                        {
                          label: 'Child ASIN',
                          value: 'child_asin'
                        },
                        {
                          label: 'Title',
                          value: 'title'
                        },
                        {
                          label: 'Month',
                          value: 'month'
                        }
                      ]}
                    />
                  </div>
                  <div className='position-relative'>
                    <button
                      onClick={() => {
                        setSalesByMonthGraphLoading(true);
                        dispatch(
                          getSalesByMonthGraph({
                            graph_filter_type: graphFilter,
                            search_year: filter?.year,
                            search_month: filter?.month?.join(',')
                          })
                        );
                      }}
                      className='btn btn-danger btn-sm fs-7 ps-5 px-5'
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
              </div>
              <div className='card-body px-4 py-4'>
                {salesByMonthGraphLoading ? (
                  <div className='h-225px'>
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        margin: 'auto',
                        width: 'fit-content',
                        height: 'fit-content'
                      }}
                    >
                      <Skeleton.Node active>
                        <DotChartOutlined
                          style={{
                            fontSize: 40,
                            color: '#bfbfbf'
                          }}
                        />
                      </Skeleton.Node>
                    </div>
                  </div>
                ) : (
                  <Chart
                    options={{
                      dataLabels: {
                        enabled: false
                      },
                      stroke: {
                        curve: 'smooth'
                      },
                      labels: salesByMonthGraph?.label || [],
                      xaxis: {
                        line: {
                          show: false
                        },
                        labels: {
                          trim: true,
                          rotate: -45,
                          rotateAlways: false,
                          hideOverlappingLabels: true
                        }
                      },
                      colors: [
                        '#999',
                        '#29d07b',
                        '#bdc0e7',
                        '#3cbea1',
                        '#FF643C',
                        '#000'
                      ]
                    }}
                    series={salesByMonthGraph?.series}
                    type='area'
                    height={300}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='row gx-5 gx-xl-5'>
          <div className='col-xl-12 mb-5 mb-xl-5'>
            <div className='card card-flush h-xl-100'>
              <div className='card-body py-3 pt-5'>
                <div className='row g-3'>
                  <Details
                    loading={salesByMonthDataLoading}
                    data={[
                      {
                        title: 'Sum of Ordered Product Sales',
                        value: salesByMonthData?.total_ordered_product_sales
                      },
                      {
                        title: 'Sum of Sessions',
                        value: salesByMonthData?.total_session
                      },
                      {
                        title: 'Sum of Session Percentage',
                        value: salesByMonthData?.avg_session_percentage
                      },
                      {
                        title: 'Sum of Page Views',
                        value: salesByMonthData?.total_page_views
                      },
                      {
                        title: 'Sum of Page Views Percentage',
                        value: salesByMonthData?.avg_page_view_percentage
                      },
                      {
                        title: 'Average of Buy Box',
                        value: salesByMonthData?.avg_buy_box_percentage
                      },
                      {
                        title: 'Sum of Units Ordered',
                        value: salesByMonthData?.total_ordered_units
                      },
                      {
                        title: 'Sum of Unit Session',
                        value: salesByMonthData?.avg_unit_session_percentage
                      },
                      {
                        title: 'Sum of Total Order Items',
                        value: salesByMonthData?.total_order_items
                      }
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card mb-5 mb-xl-8'>
              <div className='card-header border-bottom border-bottom-dashed'>
                <h3 className='card-title align-items-start flex-column'>
                  <span className='card-label fw-bolder fs-3 mb-0'>
                    Analytics by Category
                  </span>
                </h3>
                <div className='card-toolbar'>
                  <button className='btn btn-light-danger btn-sm fw-bolder '>
                    Export Data
                  </button>
                </div>
              </div>
              <div className='card-body pt-2'>
                {salesByMonthDetailLoading ? (
                  <Loading />
                ) : (
                  <div className='table-responsive'>
                    <table
                      className='table align-middle table-row-dashed  table-row-gray-300 fs-7 gy-4 gx-5 border-top-d'
                      id
                    >
                      <thead>
                        <tr className='fw-bolder text-gray-800'>
                          <th className='min-w-50px' />
                          <th className='min-w-250px'>Row Labels</th>
                          <th className='min-w-225px'>
                            Sum of Ordered Product Sales{' '}
                          </th>
                          <th className='min-w-150px'>Sum of Sessions</th>
                          <th className='min-w-225px'>
                            Sum of Session Percentage{' '}
                          </th>
                          <th className='min-w-175px'>Sum of Page Views </th>
                          <th className='min-w-250px'>
                            Sum of Page Views Percentage{' '}
                          </th>
                          <th className='min-w-250px'>
                            Average of Buy Box Percentage{' '}
                          </th>
                          <th className='min-w-200px'>Sum of Units Ordered </th>
                          <th className='min-w-250px'>
                            Sum of Unit Session Percentage{' '}
                          </th>
                          <th className='min-w-225px'>
                            Sum of Total Order Items
                          </th>
                        </tr>
                      </thead>
                      <tbody className='text-gray-700 fw-bold'>
                        {salesByMonthDetail?.map((d, i) => {
                          return (
                            <>
                              <tr className>
                                <td className>
                                  <FontAwesomeIcon
                                    className='las la-angle-down text-dark fs-4'
                                    icon={faAngleDown}
                                    onClick={() => {
                                      setExpand((prev) =>
                                        prev === i ? setExpand(null) : i
                                      );
                                    }}
                                  />
                                </td>
                                <td>
                                  <a href className='fw-boldest text-dark'>
                                    {d?.month}
                                  </a>
                                </td>
                                <td>{d?.total_ordered_product_sales}</td>
                                <td>{d?.total_session}</td>
                                <td>{d?.avg_session_percentage}</td>
                                <td>{d?.total_page_views}</td>
                                <td>{d?.avg_page_view_percentage}</td>
                                <td>{d?.avg_buy_box_percentage}</td>
                                <td>{d?.total_ordered_units}</td>
                                <td>{d?.avg_unit_session_percentage}</td>
                                <td>{d?.total_order_items}</td>
                              </tr>
                              <tr>
                                <td
                                  colSpan={11}
                                  className='hiddenRow  bg-light bg-opacity-100'
                                >
                                  {expand === i && (
                                    <div>
                                      <div className='table-responsive m-0'>
                                        <table
                                          className='table align-middle table-row-gray-300 table-row-dashed fs-7 gy-4 gx-5 bg-white mb-0'
                                          id
                                        >
                                          <thead className='border-bottom border-bottom-dashed'>
                                            <tr className='fw-bolder text-gray-800'>
                                              <th className='min-w-50px p-0' />
                                              <th className='min-w-250px p-0' />
                                              <th className='min-w-225px p-0' />
                                              <th className='min-w-150px p-0' />
                                              <th className='min-w-225px p-0' />
                                              <th className='min-w-175px p-0' />
                                              <th className='min-w-250px p-0' />
                                              <th className='min-w-250px p-0' />
                                              <th className='min-w-200px p-0' />
                                              <th className='min-w-250px p-0' />
                                              <th className='min-w-225px p-0' />
                                            </tr>
                                          </thead>
                                          <tbody className='text-gray-700 fw-bold'>
                                            {d?.asin_data?.map((r, t) => {
                                              return (
                                                <tr data-key={0}>
                                                  <td />
                                                  <td>
                                                    <div className='fs-7'>
                                                      <b className='one mb-2 '>
                                                        <Link
                                                          className='text-dark'
                                                          href={`${r?.parent_asin}`}
                                                          title='Click to view on Amazon'
                                                          target='_blank'
                                                        >
                                                          {r?.title}
                                                        </Link>
                                                      </b>
                                                      <span className='d-flex mt-0'>
                                                        <b className='fw-boldest me-2 text-dark'>
                                                          Parent ASIN:{' '}
                                                        </b>{' '}
                                                        {r?.parent_asin}
                                                      </span>
                                                      <span className='d-flex mt-1'>
                                                        <b className='fw-boldest me-2 text-dark'>
                                                          Child ASIN:{' '}
                                                        </b>{' '}
                                                        <Link
                                                          href={`https://amazon.com/dp/${r?.child_asin}`}
                                                        >
                                                          {r?.child_asin}
                                                        </Link>
                                                      </span>
                                                      <span className='d-flex mt-1'>
                                                        <b className='fw-boldest me-2 text-dark'>
                                                          SKU:{' '}
                                                        </b>{' '}
                                                        {r?.sku}
                                                      </span>
                                                    </div>
                                                  </td>
                                                  <td>
                                                    {
                                                      r?.total_ordered_product_sales
                                                    }
                                                  </td>
                                                  <td>{r?.total_session}</td>
                                                  <td>
                                                    {r?.avg_session_percentage}
                                                  </td>
                                                  <td>{r?.total_page_views}</td>
                                                  <td>
                                                    {
                                                      r?.avg_page_view_percentage
                                                    }
                                                  </td>
                                                  <td>
                                                    {r?.avg_buy_box_percentage}
                                                  </td>
                                                  <td>
                                                    {r?.total_ordered_units}
                                                  </td>
                                                  <td>
                                                    {
                                                      r?.avg_unit_session_percentage
                                                    }
                                                  </td>
                                                  <td>
                                                    {r?.total_order_items}
                                                  </td>
                                                </tr>
                                              );
                                            })}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
