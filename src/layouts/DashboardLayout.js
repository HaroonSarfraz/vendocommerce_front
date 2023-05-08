import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { isClient } from "../helpers/isClient";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [hideMenus, setHideMenus] = useState(false);

  const user = isClient && JSON.parse(localStorage.getItem("user"));

  const checkWidth = () => {
    isClient && setHideMenus(690 > window.innerWidth);
  };

  useEffect(() => {
    if (isClient) {
      setHideMenus(690 > window.innerWidth);

      window.addEventListener("resize", (e) => {
        checkWidth();
      });

      return () => {
        window.removeEventListener("resize", () => {});
      };
    }
  }, []);

  useEffect(() => {
    if (isClient) {
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
    }
  }, []);

  const backToAdmin = () => {
    localStorage.removeItem("brand");
    router.push("/brands");
  };

  const GetModules = () =>
    isClient && localStorage.getItem("brand")
      ? false
      : user?.role === "User"
      ? false
      : true;

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
            <div className="flex-column flex-column-fluid">{children}</div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
