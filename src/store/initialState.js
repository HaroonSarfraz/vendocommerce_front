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
    status: false,
    data: [],
  },
  customerAcquisitionLTV: {
    status: false,
    data: [],
  },
  sales: {
    salesGraphData: {},
    salesByWeekData: {},
    salesReportCallOuts: {},
  },
  salesBySku: {
    salesSkuDetailsList: {
      status: false,
      data: [],
    },
    salesBySkuDetails: {
      status: false,
      data: {},
    },
  },
  salesByProduct: {
    salesByProductList: {
      status: false,
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
      status: false,
      data: [],
    },
  },
  salesByWeek: {
    salesWeekDetailList: {
      status: false,
      data: [],
    },
    salesWeekGraph: {},
    salesWeekData: {
      status: false,
      data: {},
    },
  },
  categoryPerformanceReport: {
    categoryPerformanceList: {
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
    status: false,
  },
  categoryProductList: {
    data: [],
    status: false,
  },
  categoryList: {
    data: [],
    status: false,
  },
  salesByMonth: {
    salesByMonthData: {
      status: false,
      data: {},
    },
    salesByMonthDetail: {
      status: false,
      data: [],
    },
    salesByMonthGraph: {},
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
};

export default initialState;
