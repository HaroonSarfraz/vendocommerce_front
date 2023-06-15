const initialState = {
  users: {
    userList: {
      items: [],
      count: 0,
      page: 1,
      limit: 10,
    },
    switchUser: {},
  },
  brands: {
    userBrandList: {
      data: [],
      status: false,
    },
    brandList: {
      data: [],
      count: 0,
      page: 1,
      limit: 10,
    },
    amazonSpApiCredentials: {
      status: false,
      data: [],
    },
    amazonAdvertisingCredentials: {
      status: false,
      data: [],
    },
  },
  customerAcquisition: {
    status: null,
    data: [],
  },
  customerAcquisitionLTV: {
    status: null,
    data: [],
  },
  sales: {
    salesGraphData: {},
    salesByWeekData: {},
    salesReportCallOuts: {},
  },
  salesBySku: {
    salesSkuDetailsList: {
      status: null,
      data: [],
    },
    salesBySkuDetails: {
      status: null,
      data: {},
    },
  },
  salesByProduct: {
    salesByProductList: {
      status: null,
      data: {},
    },
    saveColumnConfiguration: {},
    salesByProductColumnList: {},
    saveTableConfiguration: {},
  },
  poTemplate: {
    status: false,
    data: [],
  },
  advertising: {
    lastWeekKPIs: {
      status: false,
      data: {},
    },
    yearToDayKPIs: {
      status: false,
      data: {},
    },
    advertisements: {
      status: false,
      data: [],
    },
  },
  advertisingTotalRevenue: {
    list: {
      status: null,
      data: [],
    },
  },
  salesByWeek: {
    salesWeekDetailList: {
      status: null,
      data: [],
    },
    salesWeekGraph: {
      status: null,
      data: {},
    },
    salesWeekData: {
      status: null,
      data: {},
    },
  },
  categoryPerformanceReport: {
    categoryPerformanceList: {
      status: null,
      categories: [],
      grandTotal: {
        shipped_revenue: 0,
        TACoS: 0,
        ad_sales: 0,
        ad_spend: 0,
      },
      weeklyTotal: [],
    },
  },
  productReportList: {
    data: [],
    status: null,
  },
  categoryProductList: {
    data: [],
    status: null,
  },
  categoryList: {
    data: [],
    status: null,
  },
  salesByMonth: {
    salesByMonthData: {
      status: null,
      data: {},
    },
    salesByMonthDetail: {
      status: null,
      data: [],
    },
    salesByMonthGraph: {
      status: null,
      data: [],
    },
  },
  planning: {
    inventoryPlaning: {},
    inventoryPlaningColumnsList: {},
    inventoryPlaningColumnsSave: {},
  },
  shipping: {
    shippingList: {
      items: [],
    },
  },
  inventoryDashboard: {
    data: [],
    status: false,
  },
  reportLogs: {
    reportLogsData: {
      data: [],
      count: 0,
      page: 1,
      limit: 10,
      status: false,
    },
  },
};

export default initialState;
