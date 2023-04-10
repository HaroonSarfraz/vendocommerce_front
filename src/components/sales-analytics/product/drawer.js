import React, { useState, useEffect } from 'react';
import { Drawer, message, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getSalesByProductList, getSaveTableConfiguration } from '@/src/services/salesByProduct.services';
import _ from 'lodash';

export default function Drawers(props) {
  const dispatch = useDispatch();

  const { open, onHide, data } = props;

  const [selectColumns, setSelectColumns] = useState(
    data?.selectedColumnList || []
  );
  const [submitLoading, setSubmitLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const SaveTableConfigurationRes = useSelector(
    (state) => state.salesByProduct.saveTableConfiguration
  );

  useEffect(() => {
    if (data?.selectedColumnList) {
      setSelectColumns(data?.selectedColumnList);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (SaveTableConfigurationRes?.status === false) {
      setSubmitLoading(false);
      setResetLoading(false);
      message.destroy();
      message.error(SaveTableConfigurationRes?.message);
    }
  }, [SaveTableConfigurationRes]);

  return (
    <Drawer
      title="Configuration"
      width={400}
      placement="right"
      onClose={onHide}
      open={open}
    >
      <div className="card w-100 rounded-0">
        <div className="card-body hover-scroll-overlay-y">
          {Object.entries(data?.records)?.map((d, i) => (
            <div
              onClick={() => {
                const selectColumns_ = _.cloneDeep(selectColumns);
                const index = selectColumns_.findIndex((i) => i === d[0]);
                if (index === -1) {
                  selectColumns_.push(d[0]);
                } else {
                  selectColumns_.splice(index, 1);
                }
                setSelectColumns([...selectColumns_]);
              }}
              className="form-check form-check-custom form-check-solid mb-5"
              key={i}
            >
              <input
                className="form-check-input"
                type="checkbox"
                checked={
                  (selectColumns || data?.selectedColumnList)?.findIndex(
                    (r) => r === d[0]
                  ) === -1
                    ? false
                    : true
                }
                onChange={() => {}}
                id="flexCheckDefault"
              />
              <label
                className="form-check-label fw-bolder"
                htmlFor="flexCheckDefault"
              >
                {d[1]}
              </label>
            </div>
          ))}
        </div>
        <div className="card-footer py-3">
          <button
            onClick={() => {
              let obj = {
                avg_unit_session_percentage: 1,
                avg_mobile_app_session_percentage: 1,
                total_browser_page_views: 1,
                avg_browser_page_views_percentage: 1,
              };
              message.destroy();
              setResetLoading(true);
              message.loading("Loading...", 0);
              dispatch(getSaveTableConfiguration(obj));
            }}
            type="reset"
            className="btn fs-7 btn-light btn-active-light-dark me-2"
            data-kt-drawer-dismiss="true"
          >
            {resetLoading && (
              <Spin
                size="small"
                style={{
                  position: "relative",
                  top: "4px",
                  marginRight: "10px",
                }}
              />
            )}
            <span>Reset</span>
          </button>
          <button
            type="submit"
            disabled={submitLoading}
            onClick={() => {
              let obj = {};
              selectColumns?.forEach((t) => {
                obj = {
                  ...obj,
                  [t]: 1,
                };
              });
              message.destroy();
              setSubmitLoading(true);
              message.loading("Loading...", 0);
              dispatch(getSaveTableConfiguration(obj));
            }}
            className="btn fs-7 btn-dark"
            data-kt-menu-dismiss="true"
          >
            {submitLoading && (
              <Spin
                size="small"
                style={{
                  position: "relative",
                  top: "4px",
                  marginRight: "10px",
                }}
              />
            )}
            <span>Apply</span>
          </button>
        </div>
      </div>
    </Drawer>
  );
}
