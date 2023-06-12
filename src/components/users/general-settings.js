import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, message, Select } from "antd";
import { createUserRequest, updateUserRequest } from "@/src/api/users.api";
import _ from "lodash";
import { UserLgSvg } from "@/src/assets";
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

export default function General({ user, userRole }) {
  const router = useRouter();
  const [editForm] = Form.useForm();
  const [submit, setSubmit] = useState(false);

  const onFinish = (values) => {
    setSubmit(true);

    if (user) {
      updateUserRequest(user.id, values)
        .then((res) => {
          setSubmit(false);
          if (res.status === 200) {
            message.success("User Updated Successfully");
            const localUser = JSON.parse(localStorage.getItem("user") || "{}");
            if (res.data.id == localUser.id) {
              localStorage.setItem(
                "user",
                JSON.stringify({
                  ...localUser,
                  u_name: res.data.u_name,
                  u_email: res.data.u_email,
                  role: res.data.role,
                })
              );
            }
          } else {
            message.error("Unable to update user");
          }
        })
        .catch((err) => message.error(err?.response?.message));
    } else {
      const data = {
        user_status: 0,
        u_type: 0,
        ...values,
      };

      createUserRequest(data)
        .then((res) => {
          setSubmit(false);
          if (res.status === 201) {
            message.success("User Created Successfully");
            router.push(`/users/edit?userId=${res.data.id}&activeTab=brands`);
          } else {
            message.error("Unable to create user");
          }
        })
        .catch((err) => message.error(err?.response?.message));
    }
  };

  const roleOptions = [
    { label: "User", value: "User" },
    { label: "Admin", value: "Admin" },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="card mb-7">
            <div className="card-body">
              <Form
                {...formItemLayout}
                layout="vertical"
                form={editForm}
                name="register"
                onFinish={onFinish}
              >
                <div className="row">
                  <div className="col-12 d-flex flex-row mb-5">
                    <UserLgSvg />
                    <h4 className="mx-5 mt-1">General</h4>
                  </div>
                </div>
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
                </div>

                {userRole === "Admin" && (
                  <div className="row">
                    <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                      <Form.Item
                        name="role"
                        label="Role"
                        className="fw-bolder"
                        rules={[
                          {
                            required: true,
                            message: "Role cannot be blank",
                          },
                        ]}

                        initialValue={user?.role ?? ""}
                        hasFeedback
                      >
                        <Select
                          style={{
                            width: "100%",
                          }}
                          size="large"
                          placeholder="Select Role"
                          options={roleOptions}
                          filterOption={selectFilter}
                        />
                      </Form.Item>
                    </div>
                  </div>
                )}

                {!user && (
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
                )}
                <div className="d-flex">
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
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
