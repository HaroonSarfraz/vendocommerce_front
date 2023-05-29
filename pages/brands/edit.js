import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, message, Select } from "antd";
import { getUserList } from "@/src/services/users.services";
import {
  updateBrandRequest,
  addUserToBrandRequest,
} from "@/src/api/brands.api";
import Icons from "@/src/assets/icons";
import _ from "lodash";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import { selectFilter } from "@/src/helpers/selectFilter";
import { selectUserList } from "@/src/store/slice/users.slice";
import { UserLgSvg, UsersGroupAddSvg } from "@/src/assets";
import ASINTable from "@/src/components/table";

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

export default function EditBrand() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [editForm] = Form.useForm();
  const [addUserForm] = Form.useForm();
  const [submit, setSubmit] = useState(false);
  const [addUserSubmit, setAddUserSubmit] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const brand = router?.query ?? {};

  const userList = useSelector(selectUserList);

  useEffect(() => {
    dispatch(getUserList({ perPage: 1000 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!router?.query?.id) {
      router.push("/brands");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (values) => {
    setSubmit(true);

    const data = {
      name: values.name,
      u_amazon_seller_name: values.u_amazon_seller_name,
      u_amazon_marketplace_name: values.u_amazon_marketplace_name,
      users: {
        connect: values.user_accounts.map((id) => ({ id: id })),
      },
    };

    updateBrandRequest(router?.query?.id, data)
      .then((res) => {
        setSubmit(false);
        if (res.status === 200) {
          message.success("Brand Updated Successfully");
          router.push("/brands");
        } else {
          message.error("unable to create user");
        }
      })
      .catch((err) => message.error(err?.response?.message));
  };

  const options = userList.items.map((user) => {
    return { label: user.u_name, value: user.id };
  });

  const addUser = (values) => {
    setAddUserSubmit(true);

    addUserToBrandRequest(router?.query?.id, values.user_id, values.role)
      .then((res) => {
        setAddUserSubmit(false);
        if (res.status === 200) {
          addUserForm.resetFields();
          setUsers((users) => [
            ...users,
            {
              role: values.role,
              name: options.find((u) => u.value === values.user_id).label,
            },
          ]);
          message.success("User Added to the Brand Successfully");
        } else {
          message.error("unable to create user");
        }
      })
      .catch((err) => message.error(err?.response?.message));
  };

  const roleOptions = [
    { label: "User", value: "User" },
    { label: "Manager", value: "Manager" },
  ];

  const columns = [
    {
      title: "#",
      width: 60,
      align: "left",
      sorter: true,
      key: "id",
      render: (_, __, i) => {
        return <span>{i + 1}</span>;
      },
    },
    {
      title: "User Name",
      width: 120,
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      align: "left",
      render: (text) => {
        return <b>{text?.name || "N/A"}</b>;
      },
    },
    {
      title: "Role",
      width: 120,
      align: "left",
      key: "role",
      sorter: (a, b) => a.role.localeCompare(b.role),
      render: (text) => {
        return <span>{text?.role || "N/A"}</span>;
      },
    },
  ];

  return (
    <DashboardLayout>
      <div className="content d-flex flex-column flex-column-fluid">
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
                      <div className="col-12 col-sm-4 col-md-4 col-lg-4">
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
                      <div className="col-12 col-sm-4 col-md-4 col-lg-4">
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
                          <Input size="large" autoFocus autoComplete="off" />
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

                  {/* Manage Users */}
                  <div className="row border-top">
                    <div className="col-12 d-flex flex-row mb-5 mt-4">
                      <UsersGroupAddSvg />
                      <h4 className="mx-5 mt-1">Users</h4>
                    </div>
                  </div>
                  <Form
                    {...formItemLayout}
                    layout="vertical"
                    form={addUserForm}
                    name="register"
                    onFinish={addUser}
                  >
                    <div className="row mt-8">
                      <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                        <Form.Item
                          name="user_id"
                          label="Add New User"
                          className="fw-bolder"
                          rules={[
                            {
                              required: true,
                              message: "User cannot be blank",
                            },
                          ]}
                          hasFeedback
                        >
                          <Select
                            style={{
                              width: "100%",
                            }}
                            size="large"
                            placeholder="Select User"
                            options={options}
                            filterOption={selectFilter}
                          />
                        </Form.Item>
                      </div>
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
                      <div className="col-12 col-sm-4 col-md-4 col-lg-4 mt-6 pt-4">
                        <Form.Item className="d-flex">
                          <Button
                            htmlType="submit"
                            disabled={addUserSubmit}
                            className="btn btn-sm btn-primary"
                          >
                            {addUserSubmit ? (
                              <span>
                                Please wait...
                                <span className="spinner-border spinner-border-sm align-middle ms-2" />
                              </span>
                            ) : (
                              <span className="indicator-label">Add User</span>
                            )}
                          </Button>
                        </Form.Item>
                      </div>
                    </div>
                  </Form>
                  <div>
                    <ASINTable
                      columns={columns}
                      dataSource={users}
                      ellipsis
                      rowKey="key"
                      loading={loading}
                      pagination={false}
                      scroll={{
                        x:
                          columns
                            ?.map((d) => d.width)
                            .reduce((a, b) => a + b, 0) + 300,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
