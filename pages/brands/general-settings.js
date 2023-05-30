import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, message, Select } from "antd";
import { updateBrandRequest, fetchBrand } from "@/src/api/brands.api";
import _ from "lodash";
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

export default function General({ brand }) {
  const router = useRouter();
  const [editForm] = Form.useForm();
  const [submit, setSubmit] = useState(false);

  const onFinish = (values) => {
    setSubmit(true);

    const data = {
      name: values.name,
      u_amazon_seller_name: values.u_amazon_seller_name,
      u_amazon_marketplace_name: values.u_amazon_marketplace_name,
    };

    updateBrandRequest(brand.id, data)
      .then((res) => {
        setSubmit(false);
        if (res.status === 200) {
          message.success("Brand Updated Successfully");
        } else {
          message.error("unable to create user");
        }
      })
      .catch((err) => message.error(err?.response?.message));
  };

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
                  <div className="col-12 col-sm-4 col-md-4 col-lg-6">
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
                      initialValue={brand?.name ?? ""}
                    >
                      <Input size="large" autoFocus autoComplete="off" />
                    </Form.Item>
                  </div>
                  <div className="col-12 col-sm-4 col-md-4 col-lg-6">
                    <Form.Item
                      name="u_amazon_seller_name"
                      label="Amazon Seller Name"
                      className="fw-bolder"
                      rules={[
                        {
                          required: true,
                          message: "Amazon Seller Name is required",
                        },
                      ]}
                      hasFeedback
                      initialValue={brand?.u_amazon_seller_name ?? ""}
                    >
                      <Input size="large" autoFocus autoComplete="off" />
                    </Form.Item>
                  </div>
                  <div className="col-12 col-sm-4 col-md-4 col-lg-6">
                    <Form.Item
                      name="u_amazon_marketplace_name"
                      label="Amazon Marketplace Name"
                      className="fw-bolder"
                      rules={[
                        {
                          required: true,
                          message: "Amazon Marketplace Name is required",
                        },
                      ]}
                      hasFeedback
                      initialValue={brand?.u_amazon_marketplace_name ?? ""}
                    >
                      <Select size="large" autoFocus autoComplete="off">
                        <Select.Option value="">
                          --- Select Marketplace Name
                        </Select.Option>
                        <Select.Option value="United States">
                          United States
                        </Select.Option>
                        <Select.Option value="Canada">Canada</Select.Option>
                        <Select.Option value="Mexico">Mexico</Select.Option>
                        <Select.Option value="Italy">Italy</Select.Option>
                        <Select.Option value="France">France</Select.Option>
                        <Select.Option value="Spain">Spain</Select.Option>
                        <Select.Option value="Australia">
                          Australia
                        </Select.Option>
                        <Select.Option value="Poland">Poland</Select.Option>
                        <Select.Option value="Netherlands">
                          Netherlands
                        </Select.Option>
                        <Select.Option value="Germany">Germany</Select.Option>
                        <Select.Option value="Sweden">Sweden</Select.Option>
                        <Select.Option value="United Kingdom">
                          United Kingdom
                        </Select.Option>
                        <Select.Option value="Japan">Japan</Select.Option>
                        <Select.Option value="India">India</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>
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
