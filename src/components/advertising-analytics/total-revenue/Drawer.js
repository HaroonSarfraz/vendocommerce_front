import React, { useState } from "react";
import { Drawer } from "antd";
import _ from "lodash";

export default function Drawers(props) {
  const { open, onHide, columnsList, columnConfig, setColumnConfig } = props;

  const [selectedColumns, setSelectedColumns] = useState(columnConfig);

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
          {columnsList.map((d, i) => (
            <div
              onClick={() => {
                const selectColumns_ = _.cloneDeep(selectedColumns);
                const index = selectColumns_.findIndex(
                  (i) => JSON.stringify(i) === JSON.stringify(d)
                );
                if (index === -1) {
                  selectColumns_.push(d);
                } else {
                  selectColumns_.splice(index, 1);
                }
                setSelectedColumns([...selectColumns_]);
              }}
              className="form-check form-check-custom form-check-solid mb-5"
              key={i}
            >
              <input
                className="form-check-input"
                type="checkbox"
                checked={
                  selectedColumns?.findIndex(
                    (r) => JSON.stringify(r) === JSON.stringify(d)
                  ) === -1
                    ? false
                    : true
                }
                onChange={() => {}}
                id={`flexCheckDefault_${i}`}
              />
              <label
                className="form-check-label fw-bolder"
                htmlFor={`flexCheckDefault_${i}`}
              >
                {d}
              </label>
            </div>
          ))}
        </div>
        <div className="card-footer py-3">
          <button
            onClick={() => {
              setColumnConfig(columnsList);
              onHide();
            }}
            type="reset"
            className="btn fs-7 btn-light btn-active-light-dark me-2"
            data-kt-drawer-dismiss="true"
          >
            <span>Reset</span>
          </button>
          <button
            type="submit"
            onClick={() => {
              setColumnConfig(selectedColumns);
              onHide();
            }}
            className="btn fs-7 btn-dark"
            data-kt-menu-dismiss="true"
          >
            <span>Apply</span>
          </button>
        </div>
      </div>
    </Drawer>
  );
}
