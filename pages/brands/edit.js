import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Tabs } from "antd";
import _ from "lodash";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import {
  AddUserSvg,
  DetailsSvg,
  KeySvg,
  MoneySvg,
  PaperSvg,
  TvSvg,
  UserLgSvg,
} from "@/src/assets";
import { General, UserSettings, SPCredentials } from "@/src/components/brands";
import { fetchBrand } from "@/src/api/brands.api";
import Loading from "@/src/components/loading";

export default function EditBrand() {
  const router = useRouter();
  const { brandId, activeTab } = router?.query ?? {};
  const { TabPane } = Tabs;
  const [brand, setBrand] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localBrand = JSON.parse(localStorage.getItem("brand"))?.id;

    if (brandId || localBrand) {
      fetchBrand(brandId || localBrand)
        .then((res) => {
          if (res.status == 200 && res.data) {
            setBrand(res.data);
            setLoading(false);
          } else {
            if (JSON.parse(localStorage.getItem("brand"))) {
              router.push("/sales-analytics/sales");
            } else {
              router.push("/brands");
            }
          }
        })
        .catch((error) => console.log(error));
    }
  }, [brandId]);

  const handleTabChange = (key) => {
    router.push({
      pathname: "/brands/edit",
      query: { brandId, activeTab: key },
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
      tabHeading: "Users",
      key: "users",
      icon: <AddUserSvg />,
      tabComponent: UserSettings,
    },
    {
      tabHeading: "Amazon SP API Credentials",
      key: "apiCredentials",
      icon: <KeySvg />,
      tabComponent: SPCredentials,
    },
    // {
    //   tabHeading: "Amazon Advertising Credentials",
    //   key: "advertisingCredentials",
    //   icon: <TvSvg />,
    //   tabComponent: null,
    // },
    // {
    //   tabHeading: "Default Values",
    //   key: "defaultValues",
    //   icon: <PaperSvg />,
    //   tabComponent: null,
    // },
    // {
    //   tabHeading: "Currency Conversion",
    //   key: "currencyConversion",
    //   icon: <MoneySvg />,
    //   tabComponent: null,
    // },
    // {
    //   tabHeading: "Billing Details",
    //   key: "billingDetails",
    //   icon: <DetailsSvg />,
    //   tabComponent: null,
    // },
  ];

  return (
    <DashboardLayout>
      <div className="content d-flex flex-column flex-column-fluid">
        <Tabs
          tabPosition="left"
          activeKey={activeTab}
          onChange={handleTabChange}
          className="h-100 custom-tabs"
        >
          {tabs.map((tab, i) => (
            <TabPane
              tab={
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
              }
              key={tab.key}
              className={`${
                activeTab !== tab.key ? "border border-secondary" : ""
              } rounded-top rounded-bottom-start rounded-bottom-end`}
            >
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
                <tab.tabComponent brand={brand} />
              )}
            </TabPane>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
