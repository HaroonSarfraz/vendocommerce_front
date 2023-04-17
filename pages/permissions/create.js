import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Button, Checkbox, Form, Input, message, Select } from "antd";
import { createUserRequest } from "@/src/api/users.api";
import Icons from "@/src/assets/icons";

const DashboardLayout = dynamic(() => import("@/src/layouts/DashboardLayout"), {
  ssr: false,
});

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
  const [form] = Form.useForm();
  const [submit, setSubmit] = useState(false);
  const router = useRouter();

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
          message.success("user created successfully");
          router.push("/permissions");
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

  const options = [];

  for (let i = 1; i < 10; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`);
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
                    <Icons type="user-lg" />
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
                      <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                        <Form.Item
                          name="brand_accounts"
                          label="Brand Account(s)"
                          className="fw-bolder"
                          rules={[
                            {
                              // required: true,
                              required: false,
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
                            defaultValue={[]}
                            onChange={handleChange}
                            options={options}
                          />
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

                    <div className="row mb-3">
                      <div className="col-12">
                        <div className="border rounded">
                          <div className="h-50px px-5 d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="py-1 mx-1 mb-0 font-medium-2">
                                <Icons type="lock" />
                                <span className="mx-2 align-middle">
                                  Permission
                                </span>
                              </h6>
                            </div>
                            <div className="custom-control custom-checkbox mr-2">
                              <Checkbox id="checkAll" className="mx-2" />
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
                                    <Checkbox id={item} className="mx-2" />
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
