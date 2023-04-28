import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, message } from "antd";
import moment from "moment";
import dynamic from "next/dynamic";
import Loading from "@/src/components/loading";
import ASINTable from "@/src/components/table";
import NoData from "@/src/components/no-data";
import Pagination from "@/src/components/pagination";
import { DefaultPerPage, timeSince } from "@/src/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { getBrandList } from "@/src/services/brands.services";
import Icons from "@/src/assets/icons";
import _ from "lodash";

const DashboardLayout = dynamic(() => import("@/src/layouts/DashboardLayout"), {
  ssr: false,
});

export default function Users() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageSize, setPageSize] = useState(DefaultPerPage);

  const [searchText, setSearchText] = useState("");

  const brandList = useSelector((state) => state.brands.brandList);
  // const switchUser = useSelector((state) => state.users.switchUser);

  useEffect(() => {
    if (brandList) {
      setList(brandList);
      setLoading(false);
      setTotalPage(brandList?.data?.pagination?.totalCount);
    } else if (brandList?.status === false) {
      // fakeActionUser()
    }
  }, [brandList]);

  // useEffect(() => {
  //   if (switchUser.role && switchUser.role === 'User') {
  //     let user = localStorage.getItem("user");

  //     const admin = JSON.parse(user).role === 'Admin';

  //     admin && localStorage.setItem("adminData", user);

  //     setTimeout(() => {
  //       localStorage.setItem("user", JSON.stringify(switchUser));
  //       router.push("/dashboard");
  //     }, 1000);
  //   } else if (switchUser.status === false) {
  //     message.error(switchUser.message);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [switchUser]);

  const switchUser = (brand) => {
    localStorage.setItem("brand", brand);
    localStorage.setItem("switchUser", 'true');

    setTimeout(() => {
      router.push("/sales-analytics/sku");
    }, 1000);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(
      getBrandList({ page: page, perPage: pageSize, search_term: searchText })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPageNo = (e) => {
    setLoading(true);
    dispatch(
      getBrandList({
        page: e,
        perPage: pageSize,
      })
    );
    setPage(e);
  };

  const onPerPage = (e) => {
    setPage(1);
    setPageSize(e);
    setLoading(true);
    dispatch(
      getBrandList({
        page: 1,
        perPage: e,
      })
    );
  };

  const search = () => {
    setLoading(true);
    setPage(1);
    setList([]);
    dispatch(
      getBrandList({ page: page, perPage: pageSize, search_term: searchText })
    );
  };

  const columns = [
    {
      title: "#",
      width: 60,
      align: "left",
      render: (_, __, i) => {
        return <span>{(page - 1) * pageSize + 1 + i}</span>;
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
              switchUser(text);
            }}
          >
            <Icons type="switchUser" />
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
        return (
          <div className="d-flex">
            <Link
              href={{ pathname: "/brands/edit", query: text }}
              as={`/brands/edit`}
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{ marginRight: "10px" }}
                className="text-dark fs-3 cursor-pointer"
              />
            </Link>
            <FontAwesomeIcon
              icon={faTrashCan}
              className="text-danger fs-3 cursor-pointer"
            />
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
          <div className="row">
            <div className="col-lg-12">
              <div className="card mb-7">
                <div className="h-80px px-10 pt-4 d-flex flex-row justify-content-between align-items-center">
                  <h4 className="fw-bold">MANAGE BRANDS</h4>
                  <p
                    className="btn btn-dark"
                    onClick={() => router.push("/brands/create")}
                  >
                    Add Brand
                  </p>
                </div>
                <div className="card-body pt-2">
                  {loading ? (
                    <Loading />
                  ) : list?.length != 0 ? (
                    <ASINTable
                      columns={columns}
                      dataSource={list}
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
                  <Pagination
                    loading={loading || list?.length === 0}
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
    </DashboardLayout>
  );
}
