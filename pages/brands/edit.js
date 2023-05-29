import { useRouter } from 'next/router';
import { Tabs } from 'antd';
import _ from 'lodash';
import DashboardLayout from '@/src/layouts/DashboardLayout';
import { AddUserSvg, DetailsSvg, KeySvg, MoneySvg, PaperSvg, TvSvg, UserLgSvg, UsersSvg } from '@/src/assets';
import General from './general-settings';
import UserSettings from './users-settings';

export default function EditBrand() {
  const router = useRouter();
  const { brandId, activeTab } = router?.query ?? {};

  const { TabPane } = Tabs;

  const handleTabChange = (key) => {
    router.push({
      pathname: '/brands/edit',
      query: { brandId, activeTab: key },
    });
  };

  const tabs = [
    {
      tabHeading: 'General',
      key: 'general',
      icon: <UserLgSvg />,
      tabComponent: <General />,
    },
    {
      tabHeading: 'Users',
      key: 'users',
      icon: <AddUserSvg />,
      tabComponent: <UserSettings />,
    },
    {
      tabHeading: 'Amazon SP API Credentials',
      key: 'apiCredentials',
      icon: <KeySvg />,
      tabComponent: null,
    },
    {
      tabHeading: 'Amazon Advertising Credentials',
      key: 'advertisingCredentials',
      icon: <TvSvg />,
      tabComponent: null,
    },
    {
      tabHeading: 'Default Values',
      key: 'defaultValues',
      icon: <PaperSvg />,
      tabComponent: null,
    },
    {
      tabHeading: 'Currency Conversion',
      key: 'currencyConversion',
      icon: <MoneySvg />,
      tabComponent: null,
    },
    {
      tabHeading: 'Billing Details',
      key: 'billingDetails',
      icon: <DetailsSvg />,
      tabComponent: null,
    },
  ];

  return (
    <DashboardLayout>
      <div className='content d-flex flex-column flex-column-fluid'>
        <Tabs tabPosition='left' activeKey={activeTab} onChange={handleTabChange} className='h-100 custom-tabs'>
          {tabs.map((tab, i) => (
            <TabPane
              tab={
                <div
                  className={`${
                    activeTab === tab.key ? 'bg-black text-white' : 'bg-light'
                  } font-weight-bold px-5 py-3 rounded custom-tab-pane`}
                >
                  <div className='col-12 d-flex flex-row align-items-center'>
                    <div className='icon'>{tab.icon}</div>
                    <p className='mx-5 my-auto'>{tab.tabHeading}</p>
                  </div>
                </div>
              }
              key={tab.key}
              className={`${
                activeTab !== tab.key ? 'border border-secondary' : ''
              } rounded-top rounded-bottom-start rounded-bottom-end`}
            >
              {tab.tabComponent}
            </TabPane>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
