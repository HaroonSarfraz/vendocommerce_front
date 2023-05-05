import React from "react";
import { Table } from "antd";
const ASINTable = (props) => {
  const {
    columns,
    fixed,
    dataSource,
    rowKey,
    loading,
    pagination,
    scrollX,
    scrollY,
    isCheckBoxRow,
    rowSelection,
    ellipsis = false,
    ...rest
  } = props;
  return (
    <Table
      columns={columns?.map((d) => {
        return { ...d, ellipsis: d?.ellipsis || ellipsis };
      })}
      fixed={fixed}
      dataSource={dataSource.data?.map((d, i) => {
        return { ...d, key: i };
      })}
      rowKey={rowKey}
      loading={loading}
      pagination={pagination}
      rowSelection={
        isCheckBoxRow
          ? {
              type: "checkbox",
              ...rowSelection,
            }
          : ""
      }
      {...rest}
    />
  );
};

export default ASINTable;
