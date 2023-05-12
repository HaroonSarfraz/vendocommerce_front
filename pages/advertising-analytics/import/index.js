import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, message, Upload } from "antd";
import { createBrandRequest } from "@/src/api/brands.api";
import { UploadOutlined } from "@ant-design/icons";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import Link from "next/link";
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

export default function Import() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [submit, setSubmit] = useState(false);

  const onFinish = (values) => {
    setSubmit(true);

    const data = {
      file: values.file,
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

  return (
    <DashboardLayout>
      <div className="content d-flex flex-column flex-column-fluid">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card mb-7">
                <div className="card-body">
                  <div className="col-12 d-flex flex-row mb-5">
                    <h4 className="mx-5 mt-1">IMPORT FILE</h4>
                  </div>
                  <Form
                    {...formItemLayout}
                    layout="vertical"
                    form={form}
                    name="import"
                    onFinish={onFinish}
                  >
                    <div className="row">
                      <div className="col-12 col-sm-4 col-md-4 col-lg-3">
                        <Form.Item
                          name="file"
                          label="Browse"
                          className="fw-bolder"
                          rules={[
                            {
                              required: true,
                              message: "File is required",
                            },
                          ]}
                          hasFeedback
                        >
                          <Upload
                            name="file"
                            accept=".xlsx"
                            beforeUpload={() => false}
                          >
                            <Button icon={<UploadOutlined />}>
                              Click to upload
                            </Button>
                          </Upload>
                        </Form.Item>
                      </div>
                    </div>
                    <p> Click here to download the sample for Upload</p>
                    <Link href="/files/advertisements.xlsx" download={true}>
                      Download Sample
                    </Link>
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
