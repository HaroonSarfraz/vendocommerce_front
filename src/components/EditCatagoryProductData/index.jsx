import { EditCategoryProductData } from "@/src/api/categoryList.api";
import { selectCategoryList } from "@/src/store/slice/categoryList.slice";
import { setUpdateCategoryProduct } from "@/src/store/slice/categoryProductList.slice";
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Select,
  Space,
  Switch,
  message,
} from "antd";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

const EditCatagoryProductData = ({
  initialValues = {
    category: "",
    product_title: "",
    product_status: "",
  },
  onSumbit = () => {},
  id = null,
}) => {
  const CategoryListRes = useSelector(selectCategoryList);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    if (name) {
      e.preventDefault();
      form.setFieldValue("category", name);
      setName("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

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
          <Select
            placeholder="Edit Category"
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="Add New Category"
                    ref={inputRef}
                    value={name}
                    onChange={onNameChange}
                  />
                  <Button
                    disabled={name === ""}
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={addItem}
                  >
                    Add Category
                  </Button>
                </Space>
              </>
            )}
            options={CategoryListRes.data?.map((item) => ({
              label: item.name,
              value: item.name,
            }))}
          />
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
