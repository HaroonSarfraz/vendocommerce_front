/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, message } from "antd";
import { updateUserRequest } from "@/src/api/users.api";
import _ from "lodash";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import { UserLgSvg } from "@/src/assets";

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
  const router = useRouter();
  const [form] = Form.useForm();
  const [submit, setSubmit] = useState(false);

  const user = router?.query ?? {};

  useEffect(() => {
    if (!router?.query?.id) {
      router.push("/users");
      return;
    }
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
          setSubmit(false);
          message.success("User updated successfully");
          const localUser = JSON.parse(localStorage.getItem("user") || "{}");
          if (res.data.id == localUser.id) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                ...localUser,
                u_name: res.data.u_name,
                u_email: res.data.u_email,
              })
            );
          }
        }
      })
      .catch((err) => console.error(err));
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
