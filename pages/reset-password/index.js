import Image from "next/image";
import { useState } from "react";
import { Input, message, Form } from "antd";
import { useRouter } from "next/router";
import { resetPasswordRequest } from "@/src/api/auth.api";

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

export default function ResetPassword() {
  const router = useRouter();
  const [editForm] = Form.useForm();
  const [sending, setSending] = useState(false);

  const { token } = router?.query ?? {};

  const onResetPassword = (values) => {
    setSending(true);

    resetPasswordRequest({ ...values, token: token })
      .then((res) => {
        setSending(false);
        if (res.status == 200 && res.data.success) {
          router.push("/login");
          message.success("Password has been changed successfully", 4);
        } else {
          message.error("Token not valid. Please generate a new token", 5);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div style={{ height: "100%" }}>
      <div
        className="d-flex flex-column flex-root h-100vh"
        style={{ height: "100%" }}
      >
        <div className="row" style={{ height: "100%" }}>
          <div
            className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6  flex-column d-flex"
            style={{ backgroundColor: "#eff3fe" }}
          >
            <div
              className="d-flex flex-column position-xl-fixed top-0 bottom-0 w-xl-700px scroll-y hideScroll"
              style={{ margin: "auto" }}
            >
              <div className="d-flex flex-row-fluid flex-column text-center p-10 pt-lg-20 justify-content-center">
                <div className="py-9 mb-5">
                  <Image
                    alt="Logo"
                    src="/images/logo-main.png"
                    width={255}
                    height={70}
                    className="shimmer"
                    priority
                  />
                </div>
                <h1
                  className="fs-2qx pb-5 pb-md-4 fw-normal"
                  style={{ color: "#494951" }}
                >
                  Welcome to <b className="fw-boldest">Vendo!!</b>
                </h1>
                <p className="fw-normal fs-3" style={{ color: "#494951" }}>
                  An Intelligent tool for .....
                </p>
              </div>
            </div>
          </div>
          <div
            style={{ background: "#fff", height: "800px" }}
            className="d-flex flex-column col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6"
          >
            <div className="d-flex flex-column flex-lg-row-fluid py-10">
              <div className="d-flex flex-center flex-column flex-column-fluid">
                <div className="w-lg-500px p-10 p-lg-15 mx-auto">
                  <div className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework">
                    <div className="mb-10 text-center">
                      <Form
                        className="form w-100"
                        {...formItemLayout}
                        layout="vertical"
                        form={editForm}
                        name="register"
                        onFinish={onResetPassword}
                      >
                        <div className="mb-10">
                          <h1 className="text-dark fw-bold mb-3">
                            Reset Password
                          </h1>

                          <h4 className="text-gray-400 fw-bold fs-4">
                            Choose your new password.
                          </h4>
                        </div>
                        <div className="fv-row mb-10 text-start">
                          <Form.Item
                            name="u_password"
                            label="Password"
                            rules={[
                              {
                                required: true,
                                message: "Password is required",
                              },
                              {
                                min: 8,
                                message: "Password must be 8 characters long",
                              },
                            ]}
                            hasFeedback
                          >
                            <Input.Password size="large" autoComplete="off" />
                          </Form.Item>

                          <Form.Item
                            name="confirm_password"
                            label="Confirm Password"
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
                        <div className="text-center">
                          <button
                            type="submit"
                            disabled={sending}
                            className="btn btn-lg btn-primary w-100 mb-5"
                          >
                            {sending ? (
                              <span>
                                Please wait...
                                <span className="spinner-border spinner-border-sm align-middle ms-2" />
                              </span>
                            ) : (
                              <span className="indicator-label">Submit</span>
                            )}
                          </button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-center flex-wrap fs-6 p-5 pb-0">
                <div className="d-flex flex-center fw-bold fs-6">
                  <p className="text-muted text-hover-primary px-2">About</p>
                  <p className="text-muted text-hover-primary px-2">Support</p>
                  <p className="text-muted text-hover-primary px-2">Purchase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
