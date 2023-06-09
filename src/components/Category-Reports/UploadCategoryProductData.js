import { Button, Form, Upload, message } from "antd";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import Link from "next/link";
import { ImportCategoryProductList } from "@/src/api/categoryProductList.api";

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

const UploadCategoryProductData = ({ handleOk }) => {
  const [form] = Form.useForm();
  const [submit, setSubmit] = useState(false);

  const onFinish = (values) => {
    setSubmit(true);
    const formData = new FormData();
    formData.append("file", values.file[0].originFileObj);

    ImportCategoryProductList(formData)
      .then((res) => {
        setSubmit(false);
        if (res.status >= 200 && res.status <= 299) {
          message.success(res.data.message);
        } else {
          message.error("Unable to Import");
        }
      })
      .catch((err) => message.error("holla"))
      .finally(() => handleOk());
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };
  return (
    <>
      {" "}
      <Form
        {...formItemLayout}
        layout="vertical"
        form={form}
        name="import"
        onFinish={onFinish}
      >
        <div className="row">
          <div className="col-12 col-sm-4 col-md-4 col-lg-3 mt-7">
            <Form.Item
              name="file"
              label=""
              className="fw-bolder"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                {
                  required: true,
                  message: "File is required",
                },
              ]}
              hasFeedback
            >
              <Upload name="file" accept=".xlsx" maxCount={1}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </div>
        </div>
        <p>Click here to download the sample for Upload</p>
        <Link href="/files/category_product_data_template.xlsx" download={true}>
          Download Sample
        </Link>
        <div className="mt-3 pt-3 d-flex border-top">
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
    </>
  );
};

export default UploadCategoryProductData;
