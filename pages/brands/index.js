import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, message, Modal } from "antd";
import moment from "moment";
import Loading from "@/src/components/loading";
import ASINTable from "@/src/components/table";
import Pagination from "@/src/components/pagination";
import { DefaultPerPage, timeSince } from "@/src/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { getBrandList, getUserBrandList } from "@/src/services/brands.services";
import _ from "lodash";
import { isClient } from "@/src/helpers/isClient";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import {
  selectBrandList,
  selectUserBrandList,
} from "@/src/store/slice/brands.slice";
import { SwitchUserSvg } from "@/src/assets";
import NoData from "@/src/components/no-data";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { deleteBrandRequest } from "@/src/api/brands.api";
import useMount from "@/src/hooks/useMount";

const { confirm } = Modal;

export default function Users(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const isMount = useMount();

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageSize, setPageSize] = useState(DefaultPerPage);
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("desc");

  const [searchText, setSearchText] = useState("");

  const brandList = useSelector(selectBrandList);
  const userBrandList = useSelector(selectUserBrandList);

  const userRole = isMount
    ? JSON.parse(localStorage.getItem("user") || "{}")?.role
    : "User";

  useEffect(() => {
    if (brandList) {
      setList(brandList.data);
      setLoading(false);
      setTotalPage(brandList.count);
    }
  }, [brandList]);

  useEffect(() => {
    if (userBrandList.status) {
      setList(userBrandList.data.map((d) => ({ ...d.brand, role: d.role })));
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [userBrandList]);

  const switchBrand = (brand) => {
    isClient && localStorage.setItem("brand", JSON.stringify({ role: userRole,  ...brand}));
    router.push("/sales-analytics/sales");
  };

  useEffect(() => {
    setLoading(true);

    if (userRole === "Admin") {
      dispatch(
        getBrandList({ page: page, perPage: pageSize, search_term: searchText })
      );
    } else if (userRole === "Manager") {
      dispatch(getUserBrandList());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRole]);

  const onPageNo = (e) => {
    setPage(e);
    dispatch(
      getBrandList({
        page: e,
        perPage: pageSize,
        search_term: searchText,
        orderBy: orderBy,
        order: order,
      })
    );
    setPage(e);
  };

  const onPerPage = (e) => {
    setPage(1);
    setPageSize(e);
    setLoading(true);
    setOrderBy("id");
    setOrder("desc");
    dispatch(
      getBrandList({
        page: 1,
        perPage: e,
        search_term: searchText,
        orderBy: orderBy,
        order: order,
      })
    );
  };

  const search = () => {
    setLoading(true);
    setPage(1);
    setOrderBy("id");
    setOrder("desc");
    dispatch(
      getBrandList({
        page: 1,
        perPage: pageSize,
        search_term: searchText,
        orderBy: orderBy,
        order: order,
      })
    );
  };

  const handleChange = (_pagination, _filters, sorter) => {
    dispatch(
      getBrandList({
        page: page,
        perPage: pageSize,
        search_term: searchText,
        orderBy: sorter?.columnKey,
        order: sorter?.order?.slice(0, -3),
      })
    );
  };

  const deleteBrand = (brandID) => {
    setLoading(true);
    deleteBrandRequest(brandID)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          dispatch(
            getBrandList({
              page: page,
              perPage: pageSize,
              search_term: searchText,
              orderBy: orderBy,
              order: order,
            })
          );
          message.success("Brand has been Deleted Successfully");
        } else {
          setLoading(false);
          message.error("Unable to delete brand");
        }
      })
      .catch((err) => message.error(err?.response?.message));
  };

  const columns = [
    {
      title: "#",
      width: 60,
      align: "left",
      sorter: true,
      key: "id",
      render: (text) => {
        return <span>{text?.id}</span>;
      },
    },
    {
      title: "Brand Name",
      width: 120,
      align: "left",
      render: (text) => {
        return <b>{text?.u_amazon_seller_name || "N/A"}</b>;
      },
    },
    {
      title: "Name",
      width: 120,
      align: "left",
      key: "name",
      sorter: true,
      render: (text) => {
        return <span>{text?.name || "N/A"}</span>;
      },
    },
    {
      title: "Switch Brand",
      width: 100,
      align: "center",
      render: (text) => {
        return (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              message.destroy();
              message.loading("Loading...");
              switchBrand(text);
            }}
          >
            <SwitchUserSvg />
          </span>
        );
      },
    },
    {
      title: "Created At",
      width: 130,
      align: "left",
      render: (text) => {
        return (
          <div>
            <span>
              {moment(new Date(text.created_at * 1000)).format(
                "MM/DD/YYYY hh:mm A"
              )}
            </span>
            <br />
            <span className="timeStampColor">
              ({timeSince(text.created_at)})
            </span>
          </div>
        );
      },
    },
    {
      title: "Updated At",
      width: 130,
      align: "left",
      render: (text) => {
        return (
          <div>
            <span>
              {moment(new Date(text.updated_at * 1000)).format(
                "MM/DD/YYYY hh:mm A"
              )}
            </span>
            <br />
            <span className="timeStampColor">
              ({timeSince(text.updated_at)})
            </span>
          </div>
        );
      },
    },
    {
      title: "Action",
      width: 70,
      align: "left",
      render: (text) => {
        const showDeleteConfirm = () => {
          confirm({
            title: `Are you sure to delete ${text.name} brand?`,
            icon: <ExclamationCircleFilled />,
            content: "",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
              deleteBrand(text.id);
            },
            onCancel() {},
          });
        };

        return (
          <div className="d-flex">
            {text.role !== "User" && (
              <Link href={`/brands/edit?brandId=${text.id}&activeTab=general`}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={{ marginRight: "10px" }}
                  className="text-dark fs-3 cursor-pointer"
                />
              </Link>
            )}

            {userRole === "Admin" && (
              <FontAwesomeIcon
                onClick={showDeleteConfirm}
                icon={faTrashCan}
                className="text-danger fs-3 cursor-pointer"
              />
            )}
          </div>
        );
      },
    },
  ];

  return (
    <DashboardLayout>
      <div
        className="content d-flex flex-column flex-column-fluid"
        id="kt_content"
      >
        <div className="container-fluid" id="kt_content_container">
          {userRole === "Admin" && (
            <div className="row mb-4">
              <div className="col-lg-12">
                <div className="card card-flush h-xl-100">
                  <Input
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyPress={(ev) => {
                      if (ev?.key === "Enter") {
                        ev?.preventDefault();
                        ev?.target?.blur();
                      }
                    }}
                    onBlur={() => {
                      search();
                    }}
                    value={searchText}
                    className="w-200px py-2 my-4 mx-4"
                    placeholder="search..."
                  />
                </div>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-lg-12">
              <div className="card mb-7">
                <div className="h-80px px-10 pt-4 d-flex flex-row justify-content-between align-items-center">
                  <h4 className="fw-bold">MANAGE BRANDS</h4>
                  {userRole === "Admin" && (
                    <p
                      className="btn btn-dark"
                      onClick={() => router.push("/brands/create")}
                    >
                      Add Brand
                    </p>
                  )}
                </div>
                <div className="card-body pt-2">
                  {loading ? (
                    <Loading />
                  ) : list?.length != 0 ? (
                    <ASINTable
                      columns={columns}
                      dataSource={list}
                      onChange={handleChange}
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
                  ) : (
                    <NoData />
                  )}

                  {userRole === "Admin" && (
                    <Pagination
                      loading={loading || list?.length === 0}
                      pageSize={pageSize}
                      page={page}
                      totalPage={totalPage}
                      onPerPage={onPerPage}
                      onPageNo={onPageNo}
                    />
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
