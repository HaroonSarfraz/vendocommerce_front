import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Input, message } from "antd";
import { useRouter } from "next/router";
import { signInRequest } from "@/src/api/auth.api";
import { fetchUserBrandList } from "@/src/api/brands.api";
import { isClient } from "@/src/helpers/isClient";
import { setCookie } from "cookies-next";
import { cookies } from "@/src/constants/cookies";
import jwt_decode from "jwt-decode";
import { Field, Form, Formik } from "formik";

const MyInput = ({ field, form, ...props }) => {
  return <Input {...field} {...props} />;
};

export default function ForgetPassword() {
  const router = useRouter();
  const [sending, setSending] = useState(false);

  const onForgetPassword = (values) => {
    setSending(true);

    console.log(values);
  };

  return (
    <div style={{ height: "100%" }}>
      <div
        className="d-flex flex-column flex-root h-100vh"
        style={{ height: "100%" }}
      >
        <div className="row" style={{ height: "100%" }}>
          <div
            style={{ background: "#fff", height: "800px" }}
            className="d-flex flex-column col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
          >
            <div className="d-flex flex-center flex-column flex-column-fluid">
              <div
                style={{ maxWidth: 520, width: "100%" }}
                className="p-10 p-lg-15 mx-auto"
              >
                <Formik initialValues={{}} onSubmit={onForgetPassword}>
                  {({ dirty }) => (
                    <Form className="form w-100">
                      <div className="mb-10">
                        <h4 className="text-dark fw-bold mb-3">
                          Enter the email address associated with your account
                          and we'll send you a link to reset your password.
                        </h4>
                      </div>
                      <div className="fv-row mb-10">
                        <label className="form-label fs-6 fw-bolder text-dark">
                          Email
                        </label>
                        <Field
                          name={"email"}
                          placeholder="Enter Email"
                          type="email"
                          size="large"
                          component={MyInput}
                        />
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          disabled={!dirty && sending}
                          className="btn btn-lg btn-primary w-100 mb-5"
                        >
                          {sending ? (
                            <span>
                              Please wait...
                              <span className="spinner-border spinner-border-sm align-middle ms-2" />
                            </span>
                          ) : (
                            <span className="indicator-label">Send Email</span>
                          )}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
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
