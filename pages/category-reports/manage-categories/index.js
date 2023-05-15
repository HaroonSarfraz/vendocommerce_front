import DashboardLayout from "@/src/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import Link from "next/link";
import _ from "lodash";
import { getCategoryPerformanceList } from "@/src/services/categoryPerformance.services";
import { useDispatch, useSelector } from "react-redux";
import ASINTable from "@/src/components/table";
import Loading from "@/src/components/loading";
import NoData from "@/src/components/no-data";
import { selectCategoryList } from "@/src/store/slice/categoryList.slice";

export default function ManageCategory() {
  const [tableLoading, setTableLoading] = useState(true);

  const dispatch = useDispatch();

  const CategoryListRes = useSelector(selectCategoryList);

  const [list, setList] = useState([]);

  useEffect(() => {
    dispatch(getCategoryPerformanceList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!_.isEmpty(CategoryListRes)) {
      setList(Object.values(CategoryListRes.data || {}));
      setTableLoading(false);
    } else if (CategoryListRes?.status === false) {
      setList([]);
      setTableLoading(false);
    }
  }, [CategoryListRes]);

  const columns = [
    {
      title: "Name",
      width: "80px",
      align: "center",
      render: (text) => {
        return <span>{text?.name}</span>;
      },
    },
    {
      title: "Created At",
      width: "120px",
      align: "center",
      render: (text) => {
        return <span>{text?.created_at}</span>;
      },
    },
    {
      title: "Updated At",
      width: "130px",
      align: "center",
      render: (text) => {
        return <span>{text?.updated_at}</span>;
      },
    },
    {
      title: "Action",
      width: "90px",
      align: "center",
      render: (text) => {
        return <span>{`${text?.action}`}</span>;
      },
    },
  ];

  return (
    <DashboardLayout>
      <div className="content d-flex flex-column flex-column-fluid">
        <div className="container-fluid">
          <div className="col-lg-12">
            <div className="card mb-7 pt-5">
              <div className="card-body pt-2">
                <div className="mb-5 d-flex flex-row justify-content-between">
                  <h1>Category List</h1>
                  <Link href="/category-reports/manage-categories/create-category">
                    <button className="btn btn-light btn-active-light-dark btn-sm fw-bolder me-3">
                      + Create New
                    </button>
                  </Link>
                </div>
                {tableLoading ? (
                  <Loading />
                ) : list?.length != 0 ? (
                  <ASINTable
                    columns={columns}
                    dataSource={list}
                    ellipsis
                    rowKey="key"
                    loading={tableLoading}
                    pagination={false}
                    scroll={{
                      x:
                        columns
                          ?.map((d) => d.width)
                          .reduce((a, b) => a + b, 0) + 300,
                    }}
                  />
                ) : (
                  <div>
                    <NoData />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}