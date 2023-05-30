import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, message, Select } from "antd";
import { getUserList } from "@/src/services/users.services";
import { addUserToBrandRequest } from "@/src/api/brands.api";
import _ from "lodash";
import { selectFilter } from "@/src/helpers/selectFilter";
import { selectUserList } from "@/src/store/slice/users.slice";
import { UsersGroupAddSvg } from "@/src/assets";
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

export default function UserSettings({ brand }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [addUserForm] = Form.useForm();
  const [addUserSubmit, setAddUserSubmit] = useState(false);
  const [users, setUsers] = useState(brand?.users || []);
  const [loading, setLoading] = useState(true);

  const userList = useSelector(selectUserList);

  useEffect(() => {
    dispatch(getUserList({ perPage: 9999 }));
    setLoading(false);
  }, []);

  const options = userList.items.map((user) => {
    return { label: user.u_name, value: user.id };
  });

  const addUser = (values) => {
    setAddUserSubmit(true);

    addUserToBrandRequest(brand.id, values.user_id, values.role)
      .then((res) => {
        setAddUserSubmit(false);
        if (res.status === 200) {
          addUserForm.resetFields();
          setUsers((users) => [
            ...users,
            {
              id: _.max(users.map((u) => u.id)) + 1 || 1,
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
      width: 30,
      align: "left",
      sorter: (a, b) => a.id - b.id,
      key: "id",
      render: (text) => {
        return <span>{text?.id}</span>;
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="card mb-7">
            <div className="card-body">
              <Form
                {...formItemLayout}
                layout="vertical"
                form={addUserForm}
                name="register"
                onFinish={addUser}
              >
                <div className="row">
                  <div className="col-12 d-flex flex-row mb-5">
                    <UsersGroupAddSvg />
                    <h4 className="mx-5 mt-1">Users</h4>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-sm-4 col-md-4 col-lg-6">
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
                        disabled={loading}
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
                  pagination={false}
                  scroll={{
                    x:
                      columns?.map((d) => d.width).reduce((a, b) => a + b, 0) +
                      300,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
