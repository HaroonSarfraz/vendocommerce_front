import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Menu, Tooltip } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { adminMenus, userMenus } from "@/src/helpers/sidebar.helper";
import { setSwitchUser } from "@/src/store/slice/users.slice";
import Wrapper from "./style";
import { deleteCookie } from "cookies-next";
import { cookies } from "@/src/constants/cookies";
import useMount from "@/src/hooks/useMount";

export default function Sidebar(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("dashboard");
  const { user, collapsed, hideMenus, userType } = props;
  const isMount = useMount();

  useEffect(() => {
    const splitLocal = router?.route?.split("/");
    if (splitLocal[1]) {
      if (splitLocal.length > 2) {
        setCurrent(splitLocal[2]);
      } else {
        setCurrent(splitLocal[1]);
      }
    } else {
      setCurrent("dashboard");
    }
  }, [router?.route]);

  const defaultSubMenuSelected = () => {
    let subMenuPath = router?.route.split("/");
    if (subMenuPath.length === 3) {
      return [subMenuPath?.[1]];
    }
    return [];
  };

  const checkMenu = () => {
    const menu = userType ? adminMenus : userMenus;
    if (defaultSubMenuSelected()?.length == 0) {
      return [current];
    }
    if (
      menu.filter((d) => d.key === defaultSubMenuSelected()?.[0]).length == 0
    ) {
      return [""];
    }
    return [current];
  };

  return (
    <Wrapper
      style={{
        height: "100%",
        width: collapsed ? "105px" : "289px",
        minWidth: collapsed ? "105px" : "289px",
        zIndex: isMount && window.innerWidth >= 992 ? "999" : "1000",
        position:
          690 > ((isMount && window.innerWidth) || hideMenus)
            ? "absolute"
            : "relative",
        transition: "width 0.4s, 0.4s",
        background: "#fff",
        overflowY: "auto",
        overflowX: "hidden",
        transform: `translateX(${hideMenus ? "-106" : "0"}px)`,
        boxShadow: "0 0 15px 0 rgb(34 41 47 / 5%)",
      }}
    >
      <div
        style={{
          height: !collapsed ? "350px" : "220px",
          display: "grid",
          justifyItems: "center",
          alignContent: "space-around",
          transition: "width 0.3s, 0.3s",
          animation: ".4s linear",
        }}
      >
        <div>
          <div
            className="aside-logo flex-column-auto px-9  mx-auto"
            id="kt_aside_logo"
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
              top: "3px",
            }}
          >
            <Link href="/">
              <Image
                src={collapsed ? "/favicon.png" : "/images/logo-main.png"}
                width={collapsed ? 45 : 165}
                className="logo shimmer"
                height={45}
                style={{
                  transition: "width 0.4s, 0.4s",
                }}
                alt="Logo"
                priority
              />
            </Link>
          </div>
        </div>
        <div className="aside-user mb-5 mb-lg-10" id="kt_aside_user">
          <div className="d-flex align-items-center flex-column">
            <div
              style={{ display: "grid", justifyItems: "center" }}
              className="mb-4 symbol symbol-75px"
            >
              <Image
                src="/images/150-26.jpg"
                width={collapsed ? 55 : 75}
                height={collapsed ? 55 : 75}
                style={{
                  transition: "width 0.4s, 0.4s",
                }}
                alt="avatar"
                priority
              />
              {collapsed && (
                <Tooltip
                  title={
                    <div
                      className="text-center"
                      style={{ transition: "width 0.4s, 0.4s" }}
                    >
                      <Link
                        href={"/"}
                        className="text-active-light text-hover-primary fs-4 fw-boldest "
                      >
                        {user?.u_name}
                      </Link>
                      <span className="text-gray-600 fw-bold d-block fs-7 mb-1">
                        {user?.u_email}
                      </span>
                    </div>
                  }
                  placement="right"
                >
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    color="#A1A5B7"
                    style={{ marginTop: "20px" }}
                  />
                </Tooltip>
              )}
            </div>

            {!collapsed && (
              <div className="text-center">
                <Link
                  href={"/"}
                  className="text-gray-900 text-hover-primary fs-4 fw-boldest"
                >
                  {isMount ? user?.u_name : "Loading.."}
                </Link>
                <span className="text-gray-600 fw-bold d-block fs-7 mb-1">
                  {isMount ? user?.u_email : "Loading.."}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {isMount && (
        <>
          <div
            style={{
              height: !collapsed ? "calc(100% - 410px)" : "calc(100% - 280px)",
              minHeight: "250px",
              overflow: "auto",
              transition: "width 0.4s, 0.4s",
              animation: ".5s linear",
              minWidth: collapsed ? "105px" : "289px",
              maxWidth: collapsed ? "105px" : "289px",
              display: "flex",
              justifyContent: "center",
              paddingLeft: "10px",
            }}
            id="kt_aside_menu_wrapper"
          >
            <Menu
              selectedKeys={checkMenu()}
              mode="inline"
              onClick={(e) => {
                router.push("/" + e.keyPath.reverse().join("/"));
                setCurrent(e.key);
              }}
              inlineCollapsed={collapsed}
              defaultOpenKeys={defaultSubMenuSelected()}
              items={userType ? adminMenus : userMenus}
            />
          </div>
          <div
            style={{
              height: "60px",
              transition: "width 0.4s, 0.4s",
              animation: ".5s linear",
            }}
            className="d-flex justify-content-center align-items-center"
          >
            <button
              className={`btn btn-light-danger btn-icon-gray-600 btn-text-gray-600 w-200px ${
                collapsed ? "mx-3" : "mx-0"
              }`}
              style={
                {
                  // backgroundImage: "linear-gradient(45deg,#000000,#3e3e3e)",
                  // color: "#FFF",
                }
              }
              id="btnLogout"
              onClick={() => {
                dispatch(setSwitchUser({}));
                isMount && localStorage.clear();
                deleteCookie(cookies["TOKEN"]);
                router.push("/login");
              }}
            >
              <LogoutOutlined
                className={`${
                  isMount && window.innerWidth >= 992 && !collapsed
                    ? "me-2"
                    : ""
                }`}
                style={{ transform: "rotate(-90deg)" }}
              />{" "}
              {!collapsed ? "Logout" : ""}
            </button>
          </div>
        </>
      )}
    </Wrapper>
  );
}
