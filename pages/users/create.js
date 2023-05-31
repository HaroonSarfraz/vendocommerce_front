import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, Form, Input, message, Select } from "antd";
import { addBrandsRequest, createUserRequest } from "@/src/api/users.api";
import { getBrandList } from "@/src/services/brands.services";
import _ from "lodash";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import { selectBrandList } from "@/src/store/slice/brands.slice";
import { LockSvg, UserLgSvg } from "@/src/assets";
import { selectFilter } from "@/src/helpers/selectFilter";

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

  const brandList = useSelector(selectBrandList);

  useEffect(() => {
    dispatch(getBrandList({ perPage: 1000 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (values) => {
    setSubmit(true);

    const data = {
      ...values,
      u_role: "User",
      user_status: 0,
      u_type: 0,
    };

    createUserRequest(data)
      .then((res) => {
        setSubmit(false);
        if (res.status >= 200 && res.status <= 299) {
          message.success("User created successfully");
          router.push("/users");
        } else {
          message.error("unable to create user");
        }
      })
      .catch((err) => message.error(err));
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

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

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
                          hasFeedback
                        >
                          <Input size="large" autoComplete="off" />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                        <Form.Item
                          name="u_password"
                          label="Password"
                          className="fw-bolder"
                          rules={[
                            {
                              required: true,
                              message: "Password is required",
                            },
                          ]}
                          hasFeedback
                        >
                          <Input.Password
                            size="large"
                            autoComplete="new-password"
                          />
                        </Form.Item>
                      </div>
                      <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                        <Form.Item
                          name="u_confirm_password"
                          label="Confirm Password"
                          className="fw-bolder"
                          dependencies={["u_password"]}
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: "Confirm password is required",
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (
                                  !value ||
                                  getFieldValue("u_password") === value
                                ) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  new Error(
                                    "The two passwords that you entered do not match!"
                                  )
                                );
                              },
                            }),
                          ]}
                        >
                          <Input.Password autoComplete="off" size="large" />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="mt-8 d-flex">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
