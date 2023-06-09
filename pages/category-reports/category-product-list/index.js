import { useEffect, useMemo, useState } from "react";
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
import { useRouter } from "next/router";
import { Modal } from "antd";
import CreateCategoryScreen from "@/src/components/CreateCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import EditCatagoryProductData from "@/src/components/EditCatagoryProductData";
import { getCategoryList } from "@/src/services/categoryList.services";
import { selectCategoryList } from "@/src/store/slice/categoryList.slice";
import CustomModal from "@/src/components/modal";
import UploadCategoryProductData from "@/src/components/Category-Reports/UploadCategoryProductData";

export default function CategoryProductList() {
  const [tableLoading, setTableLoading] = useState(true);
  const CategoryListRes = useSelector(selectCategoryList);

  const dispatch = useDispatch();

  const CategoryProductListRes = useSelector(selectCategoryProductList);

  const { replace, pathname, query } = useRouter();

  const [openEdit, setOpenEdit] = useState(null);

  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 20,
    order: "desc",
    orderBy: undefined,
    "search[category]": [],
    "search[asin]": "",
    "search[sku]": undefined,
    "search[product_title]": undefined,
    "search[product_status]": undefined,
  });

  useEffect(() => {
    setFilter((s) => ({ ...s, ...query }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    dispatch(getCategoryList({ limit: 9999 }));
  }, []);

  useEffect(() => {
    let time = setTimeout(() => {
      dispatch(getCategoryProductList(filter));
    }, 600);
    return () => {
      clearTimeout(time);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    if (CategoryProductListRes?.status === true) {
      setTableLoading(false);
      const isValidData = Array.isArray(CategoryProductListRes.data);
      isValidData && setList(CategoryProductListRes.data);
    } else if (CategoryProductListRes.status === false) {
      setTableLoading(false);
    }
  }, [CategoryProductListRes]);

  const handleChange = (_pagination, _filters, sorter) => {
    const order =
      (sorter.order?.startsWith("asc") && "asc") ||
      (sorter.order?.startsWith("desc") && "desc") ||
      undefined;

    const sortFilter = { order, orderBy: order ? sorter.columnKey : undefined };
    replace({ pathname: pathname, query: { ...filter, ...sortFilter } });
  };

  const columns = [
    {
      title: "Category",
      width: "80px",
      align: "center",
      sorter: true,
      key: "category",
      render: (text) => {
        return <span>{text?.category}</span>;
      },
    },
    {
      title: "Asin",
      width: "120px",
      align: "center",
      sorter: true,
      key: "asin",
      render: (text) => {
        return <span>{text?.asin}</span>;
      },
    },
    {
      title: "Sku",
      width: "130px",
      align: "center",
      sorter: true,
      key: "sku",
      render: (text) => {
        return <span>{text?.sku}</span>;
      },
    },
    {
      title: "Product Title",
      width: "90px",
      align: "center",
      sorter: true,
      key: "product_title",
      render: (text) => {
        return <span>{`${text?.product_title}`}</span>;
      },
    },
    {
      title: "Product Status",
      width: "90px",
      align: "center",
      sorter: true,
      key: "product_status",
      render: (text) => {
        return <span>{`${text?.product_status}`}</span>;
      },
    },
    {
      title: "Action",
      width: "90px",
      align: "center",
      render: (text) => {
        return (
          <span>
            <Modal
              closable
              maskClosable
              onCancel={() => setOpenEdit(null)}
              destroyOnClose
              footer={null}
              title="Edit Category"
              open={openEdit === text.id}
            >
              <EditCatagoryProductData
                id={text.id}
                onSumbit={() => {
                  setOpenEdit(null);
                }}
                initialValues={{
                  category: text.category,
                  product_status: text.product_status,
                  product_title: text.product_title,
                }}
              />
            </Modal>
            <FontAwesomeIcon
              onClick={() => {
                CategoryListRes?.data.length !== 0 && setOpenEdit(text.id);
              }}
              icon={faPenToSquare}
              style={{ marginRight: "10px" }}
              className="text-dark fs-3 cursor-pointer"
            />
          </span>
        );
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
                  <div>
                    <CustomModal
                      title={"Upload Category Product Data"}
                      width={600}
                      opener={
                        <button className="btn btn-light-danger btn-sm mx-3 fw-bolder">
                          Import Data
                        </button>
                      }
                      footer={null}
                    >
                      {({ handleOk }) => (
                        <UploadCategoryProductData handleOk={handleOk} />
                      )}
                    </CustomModal>
                    <Link href="/category-reports/manage-categories/create-category">
                      <button className="btn btn-light btn-active-light-dark btn-sm fw-bolder me-3">
                        + Create New
                      </button>
                    </Link>
                  </div>
                </div>
                {tableLoading ? (
                  <Loading />
                ) : list?.length != 0 ? (
                  <ASINTable
                    columns={columns}
                    dataSource={list}
                    ellipsis
                    rowKey="key"
                    onChange={handleChange}
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
