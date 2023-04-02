import React, { useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setSwitchUser } from "../store/slice/users.slice";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);
  const [hideMenus, setHideMenus] = useState(false);

  const user = typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"));

  const checkWidth = () => {
    setHideMenus(690 > window.innerWidth);
  };

  useEffect(() => {
    setHideMenus(690 > window.innerWidth);

    window.addEventListener("resize", (e) => {
      checkWidth();
    });
  
    return () => {
      window.removeEventListener("resize", () => { });
    };
  }, []);

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth < 992) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const backToAdmin = () => {
    let adminDataLocal = localStorage.getItem("adminData");
    if (adminDataLocal) {
      dispatch(setSwitchUser({}));

      localStorage.setItem("user", adminDataLocal);

      setTimeout(() => {
        localStorage.removeItem("adminData");
        dispatch(setSwitchUser({}));
        router.push("/users");
      }, 1000);
    }
  };

  const GetModules = () => (user?.user_data?.u_type === 1 ? true : false);

  return (
    <div className="d-flex flex-column flex-root" style={{ height: "100vh" }}>
      <div
        className="page d-flex flex-row flex-column-fluid"
        style={{ height: "100vh" }}
      >
        <Sidebar
          user={user || {}}
          hideMenus={hideMenus}
          collapsed={collapsed}
          userType={GetModules()}
          setCollapsed={() => setCollapsed(!collapsed)}
        />
        <div
          style={{ height: "100vh" }}
          className=" d-flex flex-column flex-row-fluid"
        >
          <Header
            collapsed={collapsed}
            hideMenus={hideMenus}
            backToAdmin={backToAdmin}
            setHideMenus={setHideMenus}
            setCollapsed={() => setCollapsed(!collapsed)}
          />
          <div
            style={{
              height: "100vh",
              overflow: "auto",
            }}
            className="d-flex flex-column flex-row-fluid"
            id="kt_wrapper"
          >
            <div className="flex-column flex-column-fluid">
              {children}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
