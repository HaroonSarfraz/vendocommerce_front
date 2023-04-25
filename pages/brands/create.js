import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, message, Select } from "antd";
import { getUserList } from "@/src/services/users.services";
import { createBrandRequest } from "@/src/api/brands.api";
import Icons from "@/src/assets/icons";
import _ from "lodash";

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
  const router = useRouter();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [submit, setSubmit] = useState(false);

  const userList = useSelector((state) => state.users.userList);

  useEffect(() => {
    dispatch(getUserList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (values) => {
    setSubmit(true);

    const data = {
      name: values.name,
      u_amazon_seller_name: values.brand_name,
      users: {
        connect: values.user_accounts.map((id) => ({ id: id })),
      },
    };

    createBrandRequest(data)
      .then((res) => {
        setSubmit(false);
        if (res.status >= 200 && res.status <= 299) {
          message.success("Brand Created Successfully");
          router.push("/brands");
        } else {
          message.error("unable to create user");
        }
      })
      .catch((err) => message.error(err));
  };

  const options = userList.map((user) => {
    return { label: user.u_name, value: user.id };
  });

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
                    <h4 className="mx-5 mt-1">Brand Information</h4>
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
                          name="brand_name"
                          label="Brand Name"
                          className="fw-bolder"
                          rules={[
                            {
                              required: true,
                              message: "Brand Name is required",
                            },
                          ]}
                          hasFeedback
                        >
                          <Input size="large" autoFocus autoComplete="off" />
                        </Form.Item>
                      </div>
                      <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                        <Form.Item
                          name="name"
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
                          name="user_accounts"
                          label="User(s)"
                          className="fw-bolder"
                          rules={[
                            {
                              required: true,
                              message: "User(s) cannot be blank",
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
                          />
                        </Form.Item>
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