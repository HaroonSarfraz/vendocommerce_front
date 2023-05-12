import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '@/src/components/loading';
import TopBarFilter from './top-bar-filter-Category';
import _ from 'lodash';
import { defaultWeek, defaultYear } from '@/src/config';
import { getCategoryPerformanceList } from '@/src/services/categoryPerformance.services';
import ImportFileModal from '@/src/modals/importFile.modal';
import { selectCategoryPerformanceList } from '@/src/store/slice/categoryPerformanceReport.slice';
import NoData from '@/src/components/no-data';
import ASINTable from '../table';
import { numberFormat } from '@/src/helpers/formatting.helpers';

export default function CategoryPerformanceReport() {
  const dispatch = useDispatch();

  const CategoryPerformanceListRes = useSelector(selectCategoryPerformanceList);

  const [modalOpen, setModalOpen] = useState(false);

  const [tableLoading, setTableLoading] = useState(true);
  const [list, setList] = useState([]);

  const [filter, setFilter] = useState({
    week: [defaultWeek()],
    year: defaultYear(),
  });

  const columns = [
    {
      title: 'Row Labels',
      width: '80px',
      align: 'center',
      render: (text) => {
        return <span>{text?.row_label}</span>;
      },
    },
    {
      title: 'Total',
      width: '120px',
      align: 'center',
      render: (text) => {
        return <span>{numberFormat(text?.total)}</span>;
      },
    },
    {
      title: '% CHANGE WEEK OVER WEEK',
      width: '240px',
      align: 'center',
      render: (text) => {
        return <span>{text?.week}</span>;
      },
    },
  ];

  useEffect(() => {
    const { year, week } = filter;
    dispatch(
      getCategoryPerformanceList({
        search_year: year,
        search_week: week?.join(','),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    if (!_.isEmpty(CategoryPerformanceListRes)) {
      setList(Object.values(CategoryPerformanceListRes || {}));
      setTableLoading(false);
    } else if (CategoryPerformanceListRes?.status === false) {
      setList([]);
      setTableLoading(false);
    }
  }, [CategoryPerformanceListRes]);

  return (
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
                  <span className='card-label fw-bolder fs-3 mb-0'>Category Performance Report</span>
                </h3>
                <div className='card-toolbar gap-3'>
                  <button className='btn btn-light-danger btn-sm fw-bolder' onClick={() => setModalOpen(true)}>
                    Import Data
                  </button>
                  <button className='btn btn-light-danger btn-sm fw-bolder'>Export Data</button>
                </div>
              </div>
              <div className='card-body pt-2 table-responsive'>
                <div className='table-responsive'>
                  {tableLoading ? (
                    <Loading />
                  ) : list?.length != 0 ? (
                    <ASINTable
                      columns={columns}
                      dataSource={list}
                      ellipsis
                      rowKey='key'
                      loading={!tableLoading}
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
      <ImportFileModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
    </div>
  );
}
