import React, { useState, useEffect } from 'react';
import { Drawer, message, Spin } from 'antd';
import _ from 'lodash';

export default function Drawers(props) {
  const { open, onHide, data } = props;

  const [selectColumns, setSelectColumns] = useState(data);
  const [submitLoading, setSubmitLoading] = useState(false);

  // const SaveTableConfigurationRes = useSelector(
  //   (state) => state.salesByProduct.saveTableConfiguration
  // );

  // useEffect(() => {
  //   if (data?.selectedColumnList) {
  //     setSelectColumns(data?.selectedColumnList);
  //   }
  //   return () => {};
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   if (SaveTableConfigurationRes?.status === false) {
  //     setSubmitLoading(false);
  //     setResetLoading(false);
  //     message.destroy();
  //     message.error(SaveTableConfigurationRes?.message);
  //   }
  // }, [SaveTableConfigurationRes]);

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
          {Object.entries(data)?.map((d, i) => (
            <div
              key={i}
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
            >
              <input
                className="form-check-input"
                type="checkbox"
                // checked={}
                onChange={() => {}}
                id="flexCheckDefault"
              />
              <label
                className="form-check-label fw-bolder"
                htmlFor="flexCheckDefault"
              >
                {d[1].title}
              </label>
            </div>
          ))}
        </div>
        <div className="card-footer py-3">
          <button
            type="submit"
            disabled={submitLoading}
            onClick={() => {
              setSubmitLoading(true);
            }}
            className="btn btn-dark mx-5"
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
          <button
            onClick={onHide}
            className="btn fs-7 btn-light btn-active-light-dark me-2"
          >
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </Drawer>
  );
}
