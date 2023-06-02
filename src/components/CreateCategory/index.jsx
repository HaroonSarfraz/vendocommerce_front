import { CreateCategory, EditCategory } from "@/src/api/categoryList.api";
import { setUpdateCategory } from "@/src/store/slice/categoryList.slice";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

const CreateCategoryScreen = ({
  type = "create",
  initialValues = { name: "" },
  onSumbit = () => {},
  id = null,
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [submit, setSubmit] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    setSubmit(true);
    messageApi.open({
      type: "loading",
      content: "in progress...",
      duration: 0,
    });
    (type === "create"
      ? CreateCategory(values)
      : EditCategory({ id, ...values })
    )
      .then((res) => {
        const data = res.data;
        message.destroy();
        if (data.statusCode === 400) {
          message.error(data.message);
        } else {
          message.success(
            `Successfully ${type === "create" ? "Created" : "Edited"}`
          );
          type === "create" &&
            router.push("/category-reports/manage-categories");
        }

        if (type === "edit" && id) {
          dispatch(setUpdateCategory(res.data));
        }
        messageApi.destroy();
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
        messageApi.destroy();
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
        layout="inline"
        form={form}
        name="import"
        onFinish={onFinish}
        initialValues={{
          name: "",
          ...initialValues,
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          placeholder="Enter Category"
          rules={[{ required: true, type: "string" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" loading={submit} htmlType="submit">
            {type === "create" ? "Submit" : "Edit"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateCategoryScreen;
