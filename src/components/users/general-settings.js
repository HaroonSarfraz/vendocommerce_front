import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, message, Modal, Select, Upload, Progress } from "antd";
import { createUserRequest, updateUserRequest } from "@/src/api/users.api";
import _ from "lodash";
import { UserLgSvg } from "@/src/assets";
import { selectFilter } from "@/src/helpers/selectFilter";
import { PlusOutlined } from "@ant-design/icons";
import { uploadFile } from "@/src/helpers/s3Upload.helpers"

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

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const BASE_IMAGE_URL = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/`

export default function General({ user, userRole }) {
  const router = useRouter();
  const [editForm] = Form.useForm();
  const [submit, setSubmit] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileKey, setFileKey] = useState("");
  const [fileList, setFileList] = useState(
    user?.u_photo ? [
      {
        url: user.u_photo
      }
    ] : []
  );
  const [progress, setProgress] = useState(0);

  const onFinish = (values) => {
    setSubmit(true);

    var u_photo = user?.u_photo;
    if (fileList.length === 0) {
      u_photo = "";
    } else if (progress === 100) {
      u_photo = `${BASE_IMAGE_URL}${fileKey}`
    }

    if (user) {
      updateUserRequest(user.id, { ...values, u_photo: u_photo })
        .then((res) => {
          setSubmit(false);
          if (res.status === 200) {
            message.success("User Updated Successfully");
            const localUser = JSON.parse(localStorage.getItem("user") || "{}");
            if (res.data.id == localUser.id) {
              localStorage.setItem(
                "user",
                JSON.stringify({
                  ...localUser,
                  u_name: res.data.u_name,
                  u_photo: res.data.u_photo,
                  u_email: res.data.u_email,
                  role: res.data.role,
                })
              );
            }
          } else {
            message.error("Unable to update user");
          }
        })
        .catch((err) => message.error(err?.response?.message));
    } else {
      const data = {
        user_status: 0,
        u_type: 0,
        ...values,
      };

      createUserRequest(data)
        .then((res) => {
          setSubmit(false);
          if (res.status === 201) {
            message.success("User Created Successfully");
            router.push(`/users/edit?userId=${res.data.id}&activeTab=brands`);
          } else {
            message.error("Unable to create user");
          }
        })
        .catch((err) => message.error(err?.response?.message));
    }
  };

  const roleOptions = [
    { label: "User", value: "User" },
    { label: "Admin", value: "Admin" },
  ];

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setProgress(0);
    if (newFileList.length > 0 && newFileList[0].status === "done") {
      setProgress(1);
      const key = `${new Date().getTime()}_${newFileList[0].originFileObj.name}`;
      setFileKey(key);
      uploadFile(newFileList[0].originFileObj, key, setProgress);
    }
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
                <div className="d-flex flex-row">
                  <div style={{ marginRight: 32 }}>
                    <Upload
                      listType="picture-circle"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                      maxCount={1}
                    >
                      <div>
                        <PlusOutlined />
                        <div
                          style={{
                            marginTop: 8,
                          }}
                        >
                          Picture
                        </div>
                      </div>

                    </Upload>
                    <Modal
                      open={previewOpen}
                      title={previewTitle}
                      footer={null}
                      onCancel={handleCancel}
                    >
                      <img
                        alt="example"
                        style={{
                          width: "100%",
                        }}
                        src={previewImage}
                      />
                    </Modal>
                    {fileList.length > 0 && progress !== 0 && (
                      <Progress percent={progress} size="small" />
                    )}
                  </div>
                  <div style={{ width: "100%" }}>
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
                    {userRole === "Admin" && (
                      <div className="row">
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
                            initialValue={user?.role ?? ""}
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
                      </div>
                    )}
                    {!user && (
                      <div className="row">
                        <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                          <Form.Item
                            name="u_password"
                            label="Password"
                            className="fw-bolder"
                            rules={[
                              {
                                required: true,
                                message: "Password is required",
                              },
                            ]}
                            hasFeedback
                          >
                            <Input.Password
                              size="large"
                              autoComplete="new-password"
                            />
                          </Form.Item>
                        </div>
                        <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                          <Form.Item
                            name="u_confirm_password"
                            label="Confirm Password"
                            className="fw-bolder"
                            dependencies={["u_password"]}
                            hasFeedback
                            rules={[
                              {
                                required: true,
                                message: "Confirm password is required",
                              },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (
                                    !value ||
                                    getFieldValue("u_password") === value
                                  ) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(
                                    new Error(
                                      "The two passwords that you entered do not match!"
                                    )
                                  );
                                },
                              }),
                            ]}
                          >
                            <Input.Password autoComplete="off" size="large" />
                          </Form.Item>
                        </div>
                      </div>
                    )}
                    <div className="d-flex">
                      <Form.Item className="d-flex">
                        <Button
                          htmlType="submit"
                          disabled={submit || (progress > 0 && progress < 100)}
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
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
