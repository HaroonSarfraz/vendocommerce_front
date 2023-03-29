import React, { useState, useEffect, useLayoutEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  // const [hide, setHide] = useState(false);
  // const [moveToLogin, setMoveToLogin] = useState(false);

  const [collapsed, setCollapsed] = useState(false);
  const [hideMenus, setHideMenus] = useState(false);

  const user = typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"));

  // const [userData, setUserData] = useState(
  //   JSON.parse(localStorage.getItem("user"))
  // );
  // window.updateProfile = (e) => {
  //   setUserData(e);
  // };

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
        // setHide(true);
      } else {
        setCollapsed(false);
        // setHide(false);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // const backToAdmin = () => {
  //   let adminDataLocal = localStorage.getItem("adminData");
  //   if (adminDataLocal) {
  //     adminDataLocal = JSON.parse(adminDataLocal);
  //     localStorage.setItem("user", adminDataLocal.data);
  //     localStorage.setItem("token", adminDataLocal.token);
  //     localStorage.setItem("userType", 1);
  //     setUserData(JSON.parse(adminDataLocal.data));
  //     localStorage.removeItem("adminData");
  //   }
  // };

  // if (!localStorage.getItem("user") || moveToLogin === true) {
  //   localStorage.clear();
  //   return <Redirect to={"/login"} />;
  // }

  const GetModules = () => (user?.user_data?.u_type === 1 ? true : false);

  return (
    <div className="d-flex flex-column flex-root" style={{ height: "100vh" }}>
      <div
        className="page d-flex flex-row flex-column-fluid"
        style={{ height: "100vh" }}
      >
        <Sidebar
          // logout={() => setMoveToLogin(true)}
          user={user?.user_data || {}}
          hideMenus={hideMenus}
          collapsed={collapsed}
          userType={GetModules()}
          setCollapsed={() => setCollapsed(!collapsed)}
          // {...props}
        />
        <div
          style={{ height: "100vh" }}
          className=" d-flex flex-column flex-row-fluid"
        >
          <Header
            // backToAdmin={() => backToAdmin()}
            // backToUser={setUserData}
            hideMenus={hideMenus}
            setHideMenus={setHideMenus}
            setCollapsed={() => setCollapsed(!collapsed)}
            collapsed={collapsed}
            // {...props}
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
