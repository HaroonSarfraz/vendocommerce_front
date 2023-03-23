import { Button, Form, Input, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Redirect, Link } from "react-router-dom";

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

export default function Signup(props) {
  // const { fakeActionAuth, signUpAction } = props;
  const [form] = Form.useForm();

  const [submit, setSubmit] = useState(false);
  // const [redirect, setRedirect] = useState(false);

  // const SignUpRes = useSelector((state) => state.Auth.SignUpResponse || {});

  const checkWidth = () => {
    // return window.innerWidth;
  };

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      checkWidth();
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  // useEffect(() => {
  //   if (SignUpRes?.status === true) {
  //     message?.destroy();
  //     message.success(SignUpRes?.message || "User Added");
  //     localStorage.setItem("user", JSON.stringify(SignUpRes?.data?.user_data));
  //     localStorage.setItem("token", SignUpRes?.data?.auth_token);
  //     localStorage.setItem("userType", SignUpRes?.data?.user_data?.u_type);
  //     setTimeout(() => {
  //       setRedirect(true);
  //     }, 500);
  //     setSubmit(false);
  //     fakeActionAuth();
  //   } else if (SignUpRes?.status === false) {
  //     message?.destroy();
  //     setSubmit(false);
  //     if (SignUpRes?.error || SignUpRes?.error_data) {
  //       message.warning(
  //         Object.values(SignUpRes?.error || SignUpRes?.error_data)?.[0]?.[0] ||
  //         SignUpRes?.message ||
  //         "Something Went Wrong."
  //       );
  //     } else {
  //       message.warning("Something Went Wrong.");
  //     }
  //     fakeActionAuth();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [SignUpRes]);

  const onFinish = (values) => {
    console.log(values);
    // message.destroy();
    // setSubmit(true);
    // signUpAction(values);
  };

  // if (localStorage.getItem("userType") || redirect) {
  //   return (
  //     <Redirect
  //       to={
  //         localStorage.getItem("userType") == 1
  //           ? `/users`
  //           : `/sales-analytics/sales`
  //       }
  //     />
  //   );
  // }

  return (
    <div style={{ height: "100%" }}>
      <div className="row" style={{ height: "100%" }}>
        <div
          id="div1"
          style={{ background: "#eff3fe", overflow: "auto" }}
          className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6  flex-column d-flex"
        >
          <div className="d-grid justify-items-center align-content-center flex-row-fluid flex-column text-center p-10">
            <span className="cursor-pointer py-9 mb-5 mt-20 d-flex justify-content-center">
              <Image
                alt="Logo"
                src="/images/logo-main.png"
                className="shimmer"
                width={255}
                height={70}
                priority
              />
            </span>
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
        <div
          id="div2"
          style={{ background: "#fff", height: "800px" }}
          className="d-flex flex-column col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6"
        >
          <div className="d-flex flex-column flex-lg-row-fluid py-10">
            <div className="d-flex flex-center flex-column flex-column-fluid">
              <div className="w-lg-500px mx-auto">
                <div
                  className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
                  id="kt_sign_up_form"
                >
                  <div className="mb-10 text-center">
                    <h1
                      className="text-dark fw-bold mb-3"
                      style={{ color: "#494951" }}
                    >
                      Create an <b className="fw-boldest">Account</b>
                    </h1>
                    <div className="text-gray-400 fw-bold fs-4">
                      Already have an account?&nbsp;
                      <Link
                        href="/login"
                        id={Math.random()}
                        className="link-primary fw-bolder"
                      >
                        Sign in here
                      </Link>
                    </div>
                  </div>
                  <Form
                    {...formItemLayout}
                    layout="vertical"
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    style={{ width: checkWidth() <= 576 ? "75%" : "100%" }}
                  >
                    <div className="row">
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        {" "}
                        <Form.Item
                          name="u_name"
                          label="First Name"
                          rules={[
                            {
                              required: true,
                              message: "First Name is required",
                            },
                          ]}
                          hasFeedback
                        >
                          <Input size="large" autoFocus autocomplete="off" />
                        </Form.Item>
                      </div>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        {" "}
                        <Form.Item
                          name="u_email"
                          label="E-mail"
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
                          hasFeedback
                        >
                          <Input size="large" autocomplete="off" />
                        </Form.Item>
                      </div>
                    </div>
                    <Form.Item
                      name="u_amazon_seller_name"
                      label="Amazon Seller Name"
                      rules={[
                        {
                          required: true,
                          message: "Amazon Seller Name is required",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input size="large" autocomplete="off" />
                    </Form.Item>
                    <Form.Item
                      name="u_password"
                      label="Password"
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
                        autocomplete="new-password"
                      />
                    </Form.Item>

                    <Form.Item
                      name="u_confirm_password"
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
                      <Input.Password autocomplete="off" size="large" />
                    </Form.Item>
                    <div className="fv-row mb-10 fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
                      <label className="form-check form-check-custom form-check-solid form-check-inline">
                        <input
                          className="form-check-input mx-4"
                          type="checkbox"
                          name="toc"
                          defaultValue={1}
                        />
                        <span
                          style={{ width: "410px" }}
                          className="form-check-label fw-bold text-gray-700 fs-6"
                        >
                          I Agree to the Asinwiser
                          <span className="ms-1">Terms and conditions</span> to
                          use the services provided by the application.
                        </span>
                      </label>
                      <div className="fv-plugins-message-container invalid-feedback" />
                    </div>
                    <Form.Item className="d-flex justify-content-center">
                      <Button
                        style={{ height: "45px" }}
                        type="primary"
                        htmlType="submit"
                        disabled={submit}
                        className="btn btn-lg btn-primary"
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
                  </Form>
                  <div />
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
  );
}
