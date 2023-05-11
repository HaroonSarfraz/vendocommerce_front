import dynamic from "next/dynamic";
import { Checkbox, Dropdown, Input, message, Select, theme } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {
  getInventoryPlanningColumnsList,
  getInventoryPlanningData,
} from "@/src/services/InventoryPlanning.services";
import Drawer from "@/src/components/inventory-management/drawer";
import Pagination from "@/src/components/pagination";
import ASINTable from "@/src/components/table";
import Loading from "@/src/components/loading";
import VendoTooltip from "@/src/components/tooltip";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import {
  selectInventoryPlanningColumnList,
  selectInventoryPlanningColumnSave,
  selectInventoryPlanningList,
} from "@/src/store/slice/planning.slice";
import NoData from "@/src/components/no-data";

const { useToken } = theme;
const DefaultPerPage = 10;

export default function InventoryManagement() {
  const dispatch = useDispatch();
  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const router = useRouter();
  const [select, setSelect] = useState(true);

  const InventoryPlaningColumnsListRes = useSelector(
    selectInventoryPlanningColumnList
  );
  const InventoryPlaningColumnsSaveRes = useSelector(
    selectInventoryPlanningColumnSave
  );
  const InventoryPlaningRes = useSelector(selectInventoryPlanningList);

  const [selectedColumnsList, setSelectedColumnsList] = useState([]);
  const [columnsList, setColumnsList] = useState([]);
  const [columnsLoading, setColumnsLoading] = useState(true);

  const [columnsUpdateModal, setColumnsUpdateModal] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageSize, setPageSize] = useState(DefaultPerPage);

  const [dataList, setDataList] = useState([]);
  const [dataListLoading, setDataListLoading] = useState(true);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setColumnsLoading(true);
    dispatch(getInventoryPlanningColumnsList());
    setDataListLoading(true);
    dispatch(
      getInventoryPlanningData({
        search_text: searchText,
        page: page,
        perPage: pageSize,
      })
    );
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (InventoryPlaningColumnsSaveRes?.status === true) {
      setSelectedColumnsList(
        InventoryPlaningColumnsSaveRes?.data?.selectedColumnList || []
      );
      setColumnsList(InventoryPlaningColumnsSaveRes?.data?.columnList || []);
      setColumnsLoading(false);
      setColumnsUpdateModal(false);
      message.destroy();
      message.success(InventoryPlaningColumnsSaveRes?.message);
    } else if (InventoryPlaningColumnsSaveRes?.status === false) {
      setSelectedColumnsList([]);
      setColumnsList([]);
      setColumnsLoading(false);
      message.destroy();
      message.error(InventoryPlaningColumnsSaveRes?.message);
    }
  }, [InventoryPlaningColumnsSaveRes]);

  useEffect(() => {
    if (InventoryPlaningColumnsListRes?.status === true) {
      setSelectedColumnsList(
        InventoryPlaningColumnsListRes?.data?.selectedColumnList || []
      );
      setColumnsList(InventoryPlaningColumnsListRes?.data?.columnList || []);
      setColumnsLoading(false);
    } else if (InventoryPlaningColumnsListRes?.status === false) {
      setSelectedColumnsList([]);
      setColumnsList([]);
      setColumnsLoading(false);
    }
  }, [InventoryPlaningColumnsListRes]);

  useEffect(() => {
    if (InventoryPlaningRes?.status === true) {
      setTotalPage(InventoryPlaningRes?.data?.pagination?.totalCount);
      setDataList(InventoryPlaningRes?.data?.records);
      setDataListLoading(false);
    } else if (InventoryPlaningRes?.status === false) {
      setDataListLoading(false);
      setDataList([]);
    }
  }, [InventoryPlaningRes]);

  const onPageNo = (e) => {
    setDataListLoading(true);
    dispatch(
      getInventoryPlanningData({
        search_text: searchText,
        page: e,
        perPage: pageSize,
      })
    );
    setPage(e);
  };

  const onPerPage = (e) => {
    setPage(1);
    setPageSize(e);
    setDataListLoading(true);
    dispatch(
      getInventoryPlanningData({
        search_text: searchText,
        page: 1,
        perPage: e,
      })
    );
  };

  const columns = [
    {
      title: "#",
      width: 50,
      align: "left",
      dataTest: "",
      ellipsis: true,
      render: (_, __, i) => {
        return <span>{(page - 1) * pageSize + 1 + i}</span>;
      },
    },
    {
      title: "Date (for Testing)",
      width: 150,
      align: "left",
      dataTest: "",
      ellipsis: true,
      render: (row) => {
        return (
          <span>
            <b>{row?.log_date || "-"}</b>
          </span>
        );
      },
    },
    {
      title: "Asin",
      width: 150,
      align: "left",
      dataTest: "asin",
      ellipsis: true,
      render: (row) => {
        return (
          <span>
            <b>{row?.asin || "-"}</b>
          </span>
        );
      },
    },
    {
      title: "Product Name",
      width: 250,
      align: "left",
      dataTest: "product_name",
      render: (row) => {
        return (
          <span>
            <b>
              <VendoTooltip rule row={2}>
                {row?.product_name || "-"}
              </VendoTooltip>
            </b>
          </span>
        );
      },
    },
    {
      title: "Merchant SKU",
      width: 180,
      align: "left",
      ellipsis: true,
      dataTest: "sku",
      render: (row) => {
        return (
          <span>
            <b>{row?.sku || "-"}</b>
          </span>
        );
      },
    },
    {
      title: "Brand",
      width: 150,
      align: "left",
      ellipsis: true,
      dataTest: "brand",
      render: (row) => {
        return (
          <span>
            <b>{row?.brand || "-"}</b>
          </span>
        );
      },
    },
    {
      title: "Vendor",
      width: 150,
      align: "left",
      dataTest: "vendor",
      ellipsis: true,
      render: (row) => {
        return (
          <Dropdown
            trigger={["click"]}
            dropdownRender={() => (
              <div style={contentStyle}>
                <div>
                  <div className="px-7 py-5">
                    <div className="fs-5 text-dark fw-bold">Edit Vendor</div>
                  </div>
                  <div className="separator border-gray-200" />
                  <div className="px-7 py-5 min-w-300px">
                    <Select
                      className="min-w-250px"
                      placeholder="Select Vendor"
                      size="large"
                    />
                    <div className="d-flex justify-content-end mt-7">
                      <button
                        type="reset"
                        className="btn btn-sm btn-light btn-active-light-primary me-2"
                      >
                        <CloseOutlined />
                      </button>
                      <button
                        type="submit"
                        className="btn btn-sm btn-dark"
                        data-kt-menu-dismiss="true"
                      >
                        <CheckOutlined />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          >
            <span onClick={(e) => e.preventDefault()}>
              <b
                style={{
                  borderBottom: "1px dashed #ff643c",
                  color: "#ff643c",
                  cursor: "pointer",
                }}
              >
                {row?.vendor || "Not Set"}
              </b>
            </span>
          </Dropdown>
        );
      },
    },
    {
      title: "MOQ",
      width: 150,
      align: "left",
      dataTest: "moq",
      ellipsis: true,
      render: (row) => {
        return (
          <Dropdown
            trigger={["click"]}
            dropdownRender={() => (
              <div style={contentStyle}>
                <div>
                  <div className="px-7 py-5">
                    <div className="fs-5 text-dark fw-bold">Edit MOQ</div>
                  </div>
                  <div className="separator border-gray-200" />
                  <div className="px-7 py-5 min-w-300px">
                    <Select
                      className="min-w-250px"
                      placeholder="Select MOQ"
                      size="large"
                    />
                    <div className="d-flex justify-content-end mt-7">
                      <button
                        type="reset"
                        className="btn btn-sm btn-light btn-active-light-primary me-2"
                      >
                        <CloseOutlined />
                      </button>
                      <button
                        type="submit"
                        className="btn btn-sm btn-dark"
                        data-kt-menu-dismiss="true"
                      >
                        <CheckOutlined />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          >
            <span onClick={(e) => e.preventDefault()}>
              <b
                style={{
                  borderBottom: "1px dashed #ff643c",
                  color: "#ff643c",
                  cursor: "pointer",
                }}
              >
                {row?.moq || "Not Set"}
              </b>
            </span>
          </Dropdown>
        );
      },
    },
    {
      title: "Price",
      width: 150,
      align: "left",
      dataTest: "item_price",
      ellipsis: true,
      render: (row) => {
        return (
          <span>
            <b>${row?.item_price || "0"}</b>
          </span>
        );
      },
    },
    {
      title: "Sales Last 30 Days",
      width: 150,
      align: "left",
      dataTest: "total_sales",
      ellipsis: true,
      render: (row) => {
        return (
          <span>
            <b>${row?.total_sales || "0"}</b>
          </span>
        );
      },
    },
    {
      title: "7 Days Units Sold",
      width: 150,
      align: "left",
      dataTest: "day_7_units_sold",
      ellipsis: true,
      render: (row) => {
        return (
          <span>
            <b>{row?.day_7_units_sold || "0"}</b>
          </span>
        );
      },
    },
    {
      title: "30 Days Units Sold",
      width: 150,
      align: "left",
      dataTest: "day_30_units_sold",
      ellipsis: true,
      render: (row) => {
        return (
          <span>
            <b>{row?.day_30_units_sold || "0"}</b>
          </span>
        );
      },
    },
    {
      title: "60 Days Units Sold",
      width: 150,
      align: "left",
      dataTest: "day_60_units_sold",
      ellipsis: true,
      render: (row) => {
        return (
          <span>
            <b>{row?.day_60_units_sold || "0"}</b>
          </span>
        );
      },
    },
    {
      title: "90 Days Units Sold",
      width: 150,
      align: "left",
      dataTest: "day_90_units_sold",
      ellipsis: true,
      render: (row) => {
        return (
          <span>
            <b>{row?.day_90_units_sold || "0"}</b>
          </span>
        );
      },
    },
    {
      title: "YTD Units Sold",
      width: 150,
      align: "left",
      dataTest: "ytd_units_sold",
      ellipsis: true,
      render: (row) => {
        return (
          <span>
            <b>{row?.ytd_units_sold || "0"}</b>
          </span>
        );
      },
    },
    {
      title: "YTD Sales",
      width: 150,
      align: "left",
      dataTest: "ytd_sales",
      ellipsis: true,
      render: (row) => {
        return (
          <span>
            <b>${row?.ytd_sales || "0"}</b>
          </span>
        );
      },
    },
    {
      title: "1 Month Supply",
      width: 150,
      align: "left",
      dataTest: "month_1_supply",
      ellipsis: true,
      render: (row) => {
        return (
          <span>
            <b>{row?.month_1_supply || "0"}</b>
          </span>
        );
      },
    },
    {
      title: "Available",
      width: 150,
      align: "left",
      dataTest: "afn_fulfillable_quantity",
      ellipsis: true,
      render: (row) => {
        return (
          <span>
            <b>{row?.afn_fulfillable_quantity || "0"}</b>
          </span>
        );
      },
    },
    {
      title: "Inbound",
      width: 150,
      align: "left",
      dataTest: "inbound",
      ellipsis: true,
      render: (row) => {
        return (
          <span>
            <b>{row?.inbound || "0"}</b>
          </span>
        );
      },
    },
    {
      title: "FC transfer",
      width: 150,
      align: "left",
      dataTest: "reserved_fc_transfers",
      ellipsis: true,
      render: (row) => {
        return (
          <span>
            <b>{row?.reserved_fc_transfers || "0"}</b>
          </span>
        );
      },
    },
    {
      title: "Total Units",
      width: 150,
      align: "left",
      dataTest: "total_units",
      ellipsis: true,
      render: (row) => {
        return (
          <span>
            <b>{row?.total_units || "0"}</b>
          </span>
        );
      },
    },
    {
      title: "Inventory Multiplier",
      width: 150,
      align: "left",
      dataTest: "inventory_multiplier",
      ellipsis: true,
      render: (row) => {
        return (
          <Dropdown
            trigger={["click"]}
            dropdownRender={() => (
              <div style={contentStyle}>
                <div>
                  <div className="px-7 py-5">
                    <div className="fs-5 text-dark fw-bold">
                      Edit Inventory Multiplier
                    </div>
                  </div>
                  <div className="separator border-gray-200" />
                  <div className="px-7 py-5 min-w-300px">
                    <Input
                      className="min-w-250px"
                      placeholder="Inventory Multiplier"
                      value={row?.inventory_multiplier || 0}
                      size="large"
                    />
                    <div className="d-flex justify-content-end mt-7">
                      <button
                        type="reset"
                        className="btn btn-sm btn-light btn-active-light-primary me-2"
                      >
                        <CloseOutlined />
                      </button>
                      <button
                        type="submit"
                        className="btn btn-sm btn-dark"
                        data-kt-menu-dismiss="true"
                      >
                        <CheckOutlined />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          >
            <span onClick={(e) => e.preventDefault()}>
              <b
                style={{
                  borderBottom: "1px dashed #ff643c",
                  color: "#ff643c",
                  cursor: "pointer",
                }}
              >
                {row?.inventory_multiplier || "0"}
              </b>
            </span>
          </Dropdown>
        );
      },
    },
    {
      title: "Inventory Recommendations",
      width: 150,
      align: "left",
      dataTest: "replenishment_quantity",
      ellipsis: true,
      render: (row) => {
        return (
          <span>
            <b>{row?.replenishment_quantity || "0"}</b>
          </span>
        );
      },
    },
    {
      title: "Total days of supply (including units from open shipments)",
      width: 150,
      align: "left",
      dataTest: "days_of_stock",
      ellipsis: true,
      render: (row) => {
        return (
          <span>
            <b>{row?.days_of_stock || "0"}</b>
          </span>
        );
      },
    },
    {
      title: "Days of supply at Amazon fulfillment centers",
      width: 150,
      align: "left",
      dataTest: "days_of_supply_at_amz_fulfil_ctr",
      ellipsis: true,
      render: (row) => {
        return (
          <span>
            <b>{row?.days_of_supply_at_amz_fulfil_ctr || "0"}</b>
          </span>
        );
      },
    },
    {
      title: "Unit/Case",
      width: 150,
      align: "left",
      dataTest: "unit_per_case",
      ellipsis: true,
      render: (row) => {
        return (
          <Dropdown
            trigger={["click"]}
            dropdownRender={() => (
              <div style={contentStyle}>
                <div>
                  <div className="px-7 py-5">
                    <div className="fs-5 text-dark fw-bold">Edit Unit/Case</div>
                  </div>
                  <div className="separator border-gray-200" />
                  <div className="px-7 py-5 min-w-300px">
                    <Input
                      className="min-w-250px"
                      placeholder="Select Unit/Case"
                      size="large"
                      value={row?.unit_per_case || 0}
                    />
                    <div className="d-flex justify-content-end mt-7">
                      <button
                        type="reset"
                        className="btn btn-sm btn-light btn-active-light-primary me-2"
                      >
                        <CloseOutlined />
                      </button>
                      <button
                        type="submit"
                        className="btn btn-sm btn-dark"
                        data-kt-menu-dismiss="true"
                      >
                        <CheckOutlined />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          >
            <span onClick={(e) => e.preventDefault()}>
              <b
                style={{
                  borderBottom: "1px dashed #ff643c",
                  color: "#ff643c",
                  cursor: "pointer",
                }}
              >
                {row?.unit_per_case || "0"}
              </b>
            </span>
          </Dropdown>
        );
      },
    },
    {
      title: "Case Recommended",
      width: 150,
      align: "left",
      dataTest: "case_recommended",
      ellipsis: true,
      render: (row) => {
        return (
          <span>
            <b>{row?.case_recommended || "0"}</b>
          </span>
        );
      },
    },
    {
      title: "Units to Order",
      width: 150,
      align: "left",
      dataTest: "units_to_order",
      ellipsis: true,
      render: (row) => {
        return (
          <span>
            <b>{row?.units_to_order || "0"}</b>
          </span>
        );
      },
    },
  ];

  const updateCols = columns.filter((d) => {
    const index = selectedColumnsList.findIndex((f) => f === d?.dataTest);
    return index !== -1 || d?.dataTest === "";
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys, _, __) => {
    setSelectedRowKeys(_);
  };

  const rowSelection = {
    selectedRowKeys: selectedRowKeys?.map((d) => d.id),
    onChange: onSelectChange,
  };

  return (
    <DashboardLayout>
      <div
        className="content d-flex flex-column flex-column-fluid"
        id="kt_content"
      >
        <div className="container-fluid" id="kt_content_container">
          <div className="row gx-5 gx-xl-5">
            <div className="col-xl-12 mb-5 mb-xl-5">
              <div className="card card-flush h-xl-100">
                <div className="card-body px-4 py-4">
                  <div className="d-flex flex-wrap gap-4 ">
                    <div className="position-relative my-1">
                      <Input
                        placeholder="Search by Title, ASIN, SKU"
                        style={{
                          width: 250,
                        }}
                        onPressEnter={() => {
                          setDataListLoading(true);
                          setPage(1);
                          setPageSize(DefaultPerPage);
                          setDataListLoading(true);
                          dispatch(
                            getInventoryPlanningData({
                              search_text: searchText,
                              page: 1,
                              perPage: DefaultPerPage,
                            })
                          );
                        }}
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText || ""}
                      />
                    </div>
                    {select && (
                      <div className="position-relative my-1">
                        <Select
                          style={{ width: 200 }}
                          placeholder="Select action"
                          options={[
                            {
                              value: "create",
                              label: "Create Inbound Shipment",
                            },
                            {
                              value: "Create_PO",
                              label: "Create PO",
                            },
                            {
                              value: "Set_Inventory_Multiplier",
                              label: "Set Inventory Multiplier",
                            },
                            {
                              value: "Set_Unit/Case",
                              label: "Set Unit/Case",
                            },
                          ]}
                          onChange={(value) => {
                            // if (value === 'create') {
                            //   router.push('/inbound-shipment');
                            // }
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {/*begin::Filters*/}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card" style={{}}>
                <div className="card-header">
                  <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bolder fs-3 mb-1">
                      Inventory Planning Data
                    </span>
                  </h3>
                  <div className="card-toolbar">
                    <button
                      disabled={columnsLoading}
                      onClick={() => {
                        if (!columnsLoading) {
                          setColumnsUpdateModal(true);
                        }
                      }}
                      className="btn btn-light btn-active-light-dark btn-sm fw-bolder me-3"
                      id="kt_drawer_example_basic_button"
                    >
                      {" "}
                      Configuration{" "}
                    </button>
                    <div className="dropdown">
                      <button
                        className="btn btn-dark fs-7 px-10 dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Export
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <a className="dropdown-item" href="#">
                            Export to csv
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Export to xlsx
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body pt-0 px-4" style={{}}>
                  {dataListLoading ? (
                    <Loading />
                  ) : dataList?.length != 0 ? (
                    <ASINTable
                      columns={updateCols}
                      dataSource={dataList}
                      rowKey="id"
                      loading={dataListLoading}
                      pagination={false}
                      rowSelection={rowSelection}
                      isCheckBoxRow
                      scroll={{
                        x:
                          updateCols
                            ?.map((d) => d.width)
                            .reduce((a, b) => a + b, 0) + 300,
                      }}
                    />
                  ) : (
                    <NoData />
                  )}
                  <Pagination
                    loading={dataListLoading || dataList?.length === 0}
                    pageSize={pageSize}
                    page={page}
                    totalPage={totalPage}
                    onPerPage={onPerPage}
                    onPageNo={onPageNo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {columnsUpdateModal && (
        <Drawer
          data={columnsList}
          selected={selectedColumnsList}
          open={columnsUpdateModal}
          onHide={() => {
            setColumnsUpdateModal(false);
          }}
          {...props}
        />
      )}
    </DashboardLayout>
  );
}
