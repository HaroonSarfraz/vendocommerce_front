import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import ASINTable from "@/src/components/table";
import Loading from "@/src/components/loading";
import NoData from "@/src/components/no-data";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import TopBarFilter from "./top-bar-filter-category-product";
import _ from "lodash";
import { getCategoryProductList } from "@/src/services/categoryProductList.services";
import { selectCategoryProductList } from "@/src/store/slice/categoryProductList.slice";

export default function CategoryProductList() {
  const [tableLoading, setTableLoading] = useState(true);

  const dispatch = useDispatch();

  const CategoryProductListRes = useSelector(selectCategoryProductList);

  const [list, setList] = useState([]);

  const [filter, setFilter] = useState({
    asin: "",
    sku: "",
    title: "",
    status: "",
  });

  useEffect(() => {
    dispatch(getCategoryProductList(filter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!_.isEmpty(CategoryProductListRes)) {
      setList(Object.values(CategoryProductListRes.data || {}));
      setTableLoading(false);
    } else if (CategoryProductListRes?.status === false) {
      setList([]);
      setTableLoading(false);
    }
  }, [CategoryProductListRes]);

  const columns = [
    {
      title: "Category",
      width: "80px",
      align: "center",
      render: (text) => {
        return <span>{text?.category}</span>;
      },
    },
    {
      title: "Asin",
      width: "120px",
      align: "center",
      render: (text) => {
        return <span>{text?.asin}</span>;
      },
    },
    {
      title: "Sku",
      width: "130px",
      align: "center",
      render: (text) => {
        return <span>{text?.sku}</span>;
      },
    },
    {
      title: "Product Title",
      width: "90px",
      align: "center",
      render: (text) => {
        return <span>{`${text?.product_title}`}</span>;
      },
    },
    {
      title: "Product Status",
      width: "90px",
      align: "center",
      render: (text) => {
        return <span>{`${text?.product_status}`}</span>;
      },
    },
  ];

  return (
    <DashboardLayout>
      <div className="content d-flex flex-column flex-column-fluid">
        <div className="container-fluid">
          {TopBarFilter(filter, setFilter)}
          <div className="col-lg-12">
            <div className="card mb-7 pt-5">
              <div className="card-body pt-2">
                <div className="mb-5 d-flex flex-row justify-content-between">
                  <h1>Category Product List</h1>
                  <Link href="/category-reports/manage-categories/create-category">
                    <button className="btn btn-light btn-active-light-dark btn-sm fw-bolder me-3">
                      + Create New
                    </button>
                  </Link>
                </div>
                {!tableLoading ? (
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
                  <NoData />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
