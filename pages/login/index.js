import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Input, message } from "antd";
import { useRouter } from "next/router";
import { signInRequest } from "@/src/api/auth.api";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sending, setSending] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();
    setSending(true);
    let body = {
      email,
      password,
    };

    signInRequest(body)
      .then((res) => {
        setSending(false);
        if(res.status >= 200 && res.status <= 299) {
          res.data.role === "User" && router.push("/dashboard");
          localStorage.setItem("user", JSON.stringify(res.data));
        } else {
          message.error(res.data.message)
        }
      })
      .catch((err) => message.error(err));
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
            <div className="d-flex flex-center flex-column flex-column-fluid">
              <div className="w-lg-500px p-10 p-lg-15 mx-auto">
                <form className="form w-100" noValidate="novalidate">
                  <div className="text-center mb-10">
                    <h1 className="text-dark fw-bold mb-3">
                      Sign In to <b className="fw-boldest">Vendo</b>
                    </h1>
                    <div className="text-gray-400 fw-bold fs-4">
                      New Here?{" "}
                      <Link
                        href="/signup"
                        style={{ color: "black" }}
                        className="link-primary fw-bolder"
                      >
                        Create an Account
                      </Link>
                    </div>
                  </div>
                  <div className="fv-row mb-10">
                    <label className="form-label fs-6 fw-bolder text-dark">
                      Email
                    </label>
                    <Input
                      placeholder="Enter Email"
                      type="email"
                      size="large"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="fv-row mb-10">
                    <div className="d-flex flex-stack mb-2">
                      <label className="form-label fw-bolder text-dark fs-6 mb-0">
                        Password
                      </label>
                      <p className="link-primary fs-6 fw-bolder">
                        Forgot Password ?
                      </p>
                    </div>
                    <Input
                      placeholder="Enter Password"
                      type="password"
                      size="large"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={email && password && !sending ? false : true}
                      className="btn btn-lg btn-primary w-100 mb-5"
                      onClick={onLogin}
                    >
                      {sending ? (
                        <span>
                          Please wait...
                          <span className="spinner-border spinner-border-sm align-middle ms-2" />
                        </span>
                      ) : (
                        <span className="indicator-label">Login</span>
                      )}
                    </button>
                  </div>
                </form>
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
