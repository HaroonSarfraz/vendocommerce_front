/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, message } from "antd";
import { updateUserRequest } from "@/src/api/users.api";
import _ from "lodash";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import { UserLgSvg, KeySvg } from "@/src/assets";
import { General, BrandSettings } from "@/src/components/users";
import { Tabs } from "antd";
import Loading from "@/src/components/loading";

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

export default function Users() {
  const router = useRouter();
  const { TabPane } = Tabs;
  const [form] = Form.useForm();
  const [submit, setSubmit] = useState(false);
  const [userRole, setUserRole] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const { userId, activeTab } = router?.query ?? {};

  useEffect(() => {
    setUserRole(JSON.parse(localStorage.getItem("user"))?.role);
  }, []);

  useEffect(() => {
    if (router.isReady) {
      if (userId) {
        updateUserRequest(userId || localUserId, {})
          .then((res) => {
            if (res.status == 200 && res.data) {
              setUser(res.data);
              setLoading(false);
            } else {
              if (JSON.parse(localStorage.getItem("brand"))) {
                router.push("/sales-analytics/sales");
              } else {
                router.push("/users");
              }
            }
          })
          .catch((error) => console.log(error));
      } else {
        const localUser = JSON.parse(localStorage.getItem("user"));
        setUser(localUser);
        setLoading(false);
      }
    }
  }, [userId]);

  const onFinish = (values) => {
    setSubmit(true);

    const data = {
      u_name: values.u_name,
      u_email: values.u_email,
    };

    updateUserRequest(router?.query?.id, data)
      .then((res) => {
        if (res.status === 200) {
          setSubmit(false);
          message.success("User updated successfully");
          const localUser = JSON.parse(localStorage.getItem("user") || "{}");
          if (res.data.id == localUser.id) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                ...localUser,
                u_name: res.data.u_name,
                u_email: res.data.u_email,
              })
            );
          }
        }
      })
      .catch((err) => console.error(err));
  };

  const handleTabChange = (key) => {
    router.push({
      pathname: "/users/edit",
      query: { userId, activeTab: key },
    });
  };

  const tabs = [
    {
      tabHeading: "General",
      key: "general",
      icon: <UserLgSvg />,
      tabComponent: General,
    },
    {
      tabHeading: "Brands Access",
      key: "brands",
      icon: <KeySvg />,
      tabComponent: BrandSettings,
    },
  ];

  return (
    <DashboardLayout>
      <div className="content d-flex flex-column flex-column-fluid">
        <Tabs
          tabPosition="left"
          activeKey={activeTab}
          onChange={handleTabChange}
          className="h-100 custom-tabs"
          items={tabs.map((tab, i) => {
            return {
              label: (
                <div
                  className={`${
                    activeTab === tab.key ? "bg-black text-white" : "bg-light"
                  } font-weight-bold px-5 py-3 rounded custom-tab-pane`}
                >
                  <div className="col-12 d-flex flex-row align-items-center">
                    <div className="icon">{tab.icon}</div>
                    <p className="mx-3 my-auto">{tab.tabHeading}</p>
                  </div>
                </div>
              ),
              key: tab.key,
              className: `${
                activeTab !== tab.key ? "border border-secondary" : ""
              } rounded-top rounded-bottom-start rounded-bottom-end`,
              children: (
                <div>
                  {loading ? (
                    <div className="container-fluid">
                      <div className="col-lg-12">
                        <div className="card mb-7">
                          <div className="card-body">
                            <Loading />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <tab.tabComponent user={user} userRole={userRole} />
                  )}
                </div>
              ),
            };
          })}
        />
      </div>
    </DashboardLayout>
  );
}
