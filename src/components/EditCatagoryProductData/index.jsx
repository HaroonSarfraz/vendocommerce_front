import { EditCategoryProductData } from "@/src/api/categoryList.api";
import { setUpdateCategoryProduct } from "@/src/store/slice/categoryProductList.slice";
import { Button, Checkbox, Form, Input, Switch, message } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

const EditCatagoryProductData = ({
  initialValues = {
    category: "",
    product_title: "",
    product_status: "",
  },
  onSumbit = () => {},
  id = null,
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    setSubmit(true);
    messageApi.open({
      type: "loading",
      content: "in progress...",
      duration: 0,
    });
    EditCategoryProductData(id, {
      ...values,
      product_status: values.product_status ? "Active" : "inactive",
    })
      .then((res) => {
        dispatch(setUpdateCategoryProduct(res.data));
        message.destroy();
        message.success(`Successfully Edited`);
      })
      .catch((err) => {
        console.log(err);
        message.error(err?.response?.message || "Something Went Wrong.");
      })
      .finally(() => {
        setSubmit(false);
        onSumbit();
      });
  };

  return (
    <>
      {contextHolder}
      <Form
        layout="vertical"
        form={form}
        name="import"
        onFinish={onFinish}
        initialValues={{
          name: "",
          ...initialValues,
          product_status: initialValues.product_status === "Active",
        }}
      >
        <Form.Item
          name="category"
          label="Category"
          placeholder="Edit Category"
          rules={[{ required: true, type: "string" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="product_title"
          label="Product Title"
          placeholder="Edit product title"
          rules={[{ required: true, type: "string" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="product_status" valuePropName="checked">
          <Checkbox>{"Active"}</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" loading={submit} htmlType="submit">
            Edit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditCatagoryProductData;
