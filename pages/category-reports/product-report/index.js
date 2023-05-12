import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import DashboardLayout from '@/src/layouts/DashboardLayout';
import Loading from '@/src/components/loading';
import { defaultWeek, defaultYear } from '@/src/config';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'rc-image';
import { Tooltip } from 'antd';
import { numberFormat } from '@/src/helpers/formatting.helpers';
import ASINTable from '@/src/components/table';
import NoData from '@/src/components/no-data';
import TopBarFilter from './top-bar-filter-product-report';
import { getProductReportList } from '@/src/services/productReport.services';
import { selectProductReportList } from '@/src/store/slice/productReport.slice';

export default function ProductReportPage() {
  const dispatch = useDispatch();

  const ProductReportListRes = useSelector(selectProductReportList);

  const [tableLoading, setTableLoading] = useState(true);
  const [list, setList] = useState([]);

  const [filter, setFilter] = useState({
    week: [defaultWeek()],
    year: defaultYear(),
  });

  useEffect(() => {
    const { year, week } = filter;
    dispatch(
      getProductReportList({
        search_year: year,
        search_week: week?.join(','),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    if (!_.isEmpty(ProductReportListRes)) {
      setList(Object.values(ProductReportListRes.data || {}));
      setTableLoading(false);
    } else if (ProductReportListRes?.status === false) {
      setList([]);
      setTableLoading(false);
    }
  }, [ProductReportListRes]);

  const columns = [
    {
      title: 'Row Labels',
      width: 500,
      align: 'left',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text) => {
        return (
          <div className='d-flex align-items-center position-relative'>
            <div className='symbol symbol-75px me-5'>
              <Image
                src={text?.image_urls || '/images/no-product-image.png'}
                onError={(ev) => (ev.target.src = '/images/no-product-image.png')}
                loading='lazy'
                style={{ objectFit: 'contain' }}
                alt='product image'
                width={50}
                height={50}
              />
            </div>
            <div className='d-flex justify-content-start flex-column'>
              <span className='text-dark fw-boldest  fs-6 one mb-1'>
                <Tooltip row={2} rule title={text?.title}>
                  {text?.title || ''}
                </Tooltip>
              </span>
              <span className='text-muted font-weight-bold  fs-12 d-flex mt-1'>
                <div className='text-dark'>
                  <b className='text-dark fw-boldest'>Child ASIN:</b>{' '}
                  <a
                    className
                    href={`https://amazon.com/dp/${text?.child_asin}`}
                    title='View on Amazon'
                    target='_blank'
                  >
                    {text?.child_asin}
                  </a>
                </div>
              </span>
              <span className='text-muted font-weight-bold  fs-12 d-flex mt-1'>
                <div className='text-dark'>
                  <b className='text-dark fw-boldest'>Parent ASIN:</b> {text?.parent_asin}
                </div>
              </span>
              <span className='text-muted font-weight-bold  fs-12 d-flex mt-1'>
                <div className='text-dark'>
                  <b className='text-dark fw-boldest'>SKU:</b> {text?.sku}
                </div>
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Product Detail',
      width: 175,
      align: 'left',
      ellipsis: true,
      sorter: (a, b) => a.astr_units_ordered_sum - b.astr_units_ordered_sum,
      render: (text) => {
        return <span>{text?.product_detail}</span>;
      },
    },
    {
      title: 'Active Status',
      width: 225,
      align: 'left',
      ellipsis: true,
      sorter: (a, b) => a.active_status - b.active_status,
      render: (text) => {
        return <span>{text?.active_status}</span>;
      },
    },
    {
      title: 'Total',
      width: 150,
      align: 'left',
      ellipsis: true,
      sorter: (a, b) => a.total - b.total,
      render: (text) => {
        return <span>{numberFormat(text?.total)}</span>;
      },
    },
  ];

  return (
    <DashboardLayout>
      <div className='content d-flex flex-column flex-column-fluid' id='kt_content'>
        <div className='container-fluid' id='kt_content_container'>
          <style
            dangerouslySetInnerHTML={{
              __html:
                '\n                            /* .table th, .table td{\n                                border:1px solid red\n                            } */\n                        ',
            }}
          />
          <div className='row gx-5 gx-xl-5'>
            {TopBarFilter(filter, setFilter, 'Week')}
            <div className='col-lg-12'>
              <div className='card mb-1'>
                <div className='card-header border-bottom border-bottom-dashed'>
                  <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bolder fs-3 mb-0'>Product Report List</span>
                  </h3>
                  <div className='card-toolbar gap-3'>
                    <button className='btn btn-light-danger btn-sm fw-bolder'>Export Data</button>
                  </div>
                </div>
                <div className='card-body pt-0 px-4' style={{}}>
                  {tableLoading ? (
                    <Loading />
                  ) : list?.length != 0 ? (
                    <ASINTable
                      columns={columns}
                      dataSource={list}
                      rowKey='key'
                      loading={tableLoading}
                      pagination={false}
                      scroll={{
                        x: columns?.map((d) => d.width).reduce((a, b) => a + b, 0) + 300,
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
