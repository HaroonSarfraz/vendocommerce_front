import React, { useState } from 'react';
import { Input, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

export default function TopBarFilterSku({
  setDateFilter,
  setSearchText,
  dateFilter,
  searchText,
  getList,
  setLoading
}) {
  return (
    <>
      <div className='row gx-5 gx-xl-5'>
        <div className='col-xl-12 mb-5 mb-xl-5'>
          <div className='card card-flush h-xl-100'>
            <div className='card-body px-4 py-4'>
              <div className='d-flex flex-wrap gap-4 '>
                <div className='position-relative my-1'>
                  <Input
                    placeholder='Search by Title, ASIN'
                    style={{
                      width: 250
                    }}
                    value={searchText || null}
                    onChange={setSearchText}
                    onPressEnter={() => {
                      setLoading(true);
                      getList();
                    }}
                    size='large'
                  />
                </div>
                <div className='position-relative my-1'>
                  <RangePicker
                    value={dateFilter || []}
                    onChange={setDateFilter}
                    allowClear={false}
                    size='large'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
