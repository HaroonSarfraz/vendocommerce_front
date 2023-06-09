import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, message } from "antd";
import moment from "moment";
import dynamic from "next/dynamic";
import Loading from "@/src/components/loading";
import ASINTable from "@/src/components/table";
import NoData from "@/src/components/no-data";
import Pagination from "@/src/components/pagination";
import ASINTooltip from "@/src/components/tooltip";
import { DefaultPerPage, timeSince } from "@/src/config";
import Icons from "@/src/assets/icons";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { getSwitchUser, getUserList } from "@/src/services/users.services";

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

  const userList = useSelector((state) => state.users.userList);
  const switchUser = useSelector((state) => state.users.switchUser);

  useEffect(() => {
    if (userList?.status === true) {
      setList(userList?.data?.records);
      setLoading(false);
      setTotalPage(userList?.data?.pagination?.totalCount);
    } else if (userList?.status === false) {
      // fakeActionUser()
    }
  }, [userList]);

  useEffect(() => {
    if (switchUser.status) {
      let user = localStorage.getItem("user");

      const admin = JSON.parse(user).user_data.u_type === 1;

      admin && localStorage.setItem("adminData", user);

      setTimeout(() => {
        localStorage.setItem("user", JSON.stringify(switchUser?.data));
        router.push("/sales-analytics/sales");
      }, 1000);

      message.success(switchUser.message);
    } else if (switchUser.status === false) {
      message.error(switchUser.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchUser]);

  useEffect(() => {
    setLoading(true);
    dispatch(
      getUserList({ page: page, perPage: pageSize, search_term: searchText })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPageNo = (e) => {
    setLoading(true);
    dispatch(
      getUserList({
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
      getUserList({
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
      getUserList({ page: page, perPage: pageSize, search_term: searchText })
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
      title: "Name",
      width: 120,
      align: "left",
      render: (text) => {
        return <span>{text?.u_name || "N/A"}</span>;
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
      title: "Email",
      width: 160,
      align: "left",
      render: (text) => {
        return (
          <ASINTooltip rule title={text?.u_email}>
            {text?.u_email || "N/A"}
          </ASINTooltip>
        );
      },
    },
    {
      title: "Contact No",
      width: 90,
      align: "left",
      render: (text) => {
        return <span>{text?.u_contact_no || "N/A"}</span>;
      },
    },
    {
      title: "Switch User",
      width: 150,
      align: "center",
      render: (text) => {
        return (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              message.destroy();
              message.loading("Loading...");
              dispatch(getSwitchUser(text?.id));
            }}
          >
            <Icons type="switchUser" />
          </span>
        );
      },
    },
    {
      title: "Created At",
      width: 150,
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
      width: 150,
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
          <div className="d-flex flex-row justify-content-center">
            <FontAwesomeIcon icon={faTrashCan} className="text-danger fs-3 cursor-pointer" />
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
