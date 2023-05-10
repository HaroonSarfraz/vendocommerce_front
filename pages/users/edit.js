/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "@/src/components/loading";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, Form, Input, message, Select } from "antd";
import {
  addBrandsRequest,
  fetchUserBrands,
  updateUserRequest,
} from "@/src/api/users.api";
import { getBrandList } from "@/src/services/brands.services";
import _ from "lodash";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import { selectBrandList } from "@/src/store/slice/brands.slice";
import { LockSvg, UserLgSvg } from "@/src/assets";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 16,
    },
    sm: {
      span: 16,
    },
  },
};

export default function Users() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const [submit, setSubmit] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const brandList = useSelector(selectBrandList);

  const user = router?.query ?? {};

  useEffect(() => {
    dispatch(getBrandList({ perPage: 1000 }));
  }, []);

  useEffect(() => {
    if (!router?.query?.id) {
      router.push("/users");
      return;
    }

    fetchUserBrands(router?.query?.id)
      .then((res) => {
        let brands_ = res?.data?.Brands.map((brand) => {
          return brand.id;
        });
        setBrands(brands_);
        setLoading(false);
      })
      .catch((err) => message.error(err));
  }, []);

  const onFinish = (values) => {
    setSubmit(true);

    const data = {
      u_name: values.u_name,
      u_email: values.u_email,
    };

    updateUserRequest(router?.query?.id, data)
      .then((res) => {
        if (res.status === 200) {
          const brand_ids = _.isEmpty(values.brand_ids)
            ? brands
            : values.brand_ids;
          addBrandsRequest(res.data.id, { brand_ids: brand_ids })
            .then(() => {
              setSubmit(false);
              message.success("user updated successfully");
              router.push("/users");
            })
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  };

  const permissionFields = [
    "Sales Analytics",
    "Inventory Management",
    "Advertising Analytics",
    "Category Reports",
    "Customer Acquisition",
    "Central Log System",
    "Settings",
  ];

  const options = brandList.data.map((user) => {
    return { label: user.u_amazon_seller_name, value: user.id };
  });

  const handleCheck = (item) => {
    const permissions_ = _.cloneDeep(permissions);
    const index = permissions.findIndex((perm) => perm === item);
    permissions_.includes(item)
      ? permissions_.splice(index, 1)
      : permissions_.push(item);
    setPermissions(permissions_);
  };

  const handleCheckAll = () => {
    const save = () => {
      const permissions_ = _.cloneDeep(permissions);
      permissionFields.forEach((field) => {
        !permissions_.includes(field) && permissions_.push(field);
      });
      setPermissions(permissions_);
    };

    _.isEqual(permissions, permissionFields) ? setPermissions([]) : save();
  };

  return (
    <DashboardLayout>
      <div className="content d-flex flex-column flex-column-fluid">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card mb-7">
                <div className="card-body">
                  <div className="col-12 d-flex flex-row mb-5">
                    <UserLgSvg />
                    <h4 className="mx-5 mt-1">Personal Information</h4>
                  </div>
                  {loading || brandList.length < 1 ? (
                    <Loading />
                  ) : (
                    <Form
                      {...formItemLayout}
                      layout="vertical"
                      form={form}
                      name="register"
                      onFinish={onFinish}
                    >
                      <div className="row">
                        <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                          <Form.Item
                            name="u_name"
                            label="Name"
                            className="fw-bolder"
                            rules={[
                              {
                                required: true,
                                message: "Name is required",
                              },
                            ]}
                            initialValue={user?.u_name ?? ""}
                            hasFeedback
                          >
                            <Input size="large" autoFocus autoComplete="off" />
                          </Form.Item>
                        </div>
                        <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                          <Form.Item
                            name="u_email"
                            label="E-mail"
                            className="fw-bolder"
                            rules={[
                              {
                                type: "email",
                                message: "The input is not valid E-mail!",
                              },
                              {
                                required: true,
                                message: "E-mail is required",
                              },
                            ]}
                            initialValue={user?.u_email ?? ""}
                            hasFeedback
                          >
                            <Input size="large" autoComplete="off" />
                          </Form.Item>
                        </div>
                        <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                          <Form.Item
                            name="brand_ids"
                            label="Brand Account(s)"
                            className="fw-bolder"
                            rules={[
                              {
                                required: brands.length > 0 ? false : true,
                                message: "Brand Account(s) cannot be blank",
                              },
                            ]}
                            hasFeedback
                          >
                            <Select
                              mode="multiple"
                              allowClear
                              style={{
                                width: "100%",
                              }}
                              size="large"
                              placeholder="Select Brand Account(s) ..."
                              options={options}
                              defaultValue={brands}
                            />
                          </Form.Item>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-12">
                          <div className="border rounded">
                            <div className="h-50px px-5 d-flex justify-content-between align-items-center">
                              <div>
                                <h6 className="py-1 mx-1 mb-0 font-medium-2">
                                  <LockSvg />
                                  <span className="mx-2 align-middle">
                                    Permission
                                  </span>
                                </h6>
                              </div>
                              <div className="custom-control custom-checkbox mr-2">
                                <Checkbox
                                  id="checkAll"
                                  className="mx-2"
                                  checked={_.isEqual(
                                    permissions.sort(),
                                    permissionFields.sort()
                                  )}
                                  onChange={handleCheckAll}
                                />
                                <label className="fw-bold" htmlFor="checkAll">
                                  Select All
                                </label>
                              </div>
                            </div>

                            <div className="border-top px-2 pt-2">
                              <div className="py-2 row">
                                {permissionFields.map((item, index) => (
                                  <div
                                    key={index}
                                    className="my-2 col-lg-3 col-md-6"
                                  >
                                    <div className="custom-control custom-checkbox mb-2">
                                      <Checkbox
                                        id={item}
                                        className="mx-2"
                                        onChange={() => handleCheck(item)}
                                        checked={permissions.includes(item)}
                                      />
                                      <label className="fw-bold" htmlFor={item}>
                                        {item}
                                      </label>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-8 d-flex border-top">
                        <Form.Item className="d-flex">
                          <Button
                            htmlType="submit"
                            disabled={submit}
                            className="btn btn-sm btn-primary"
                          >
                            {submit ? (
                              <span>
                                Please wait...
                                <span className="spinner-border spinner-border-sm align-middle ms-2" />
                              </span>
                            ) : (
                              <span className="indicator-label">Submit</span>
                            )}
                          </Button>
                        </Form.Item>

                        <Form.Item className="mx-5">
                          <Button className="btn btn-sm btn-secondary">
                            <span className="indicator-label">Reset</span>
                          </Button>
                        </Form.Item>
                      </div>
                    </Form>
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
