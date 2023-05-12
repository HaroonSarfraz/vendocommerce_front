const initialState = {
  users: {
    userList: {
      items: [],
      count: 0,
      page: 1,
      limit: 10
    },
    switchUser: {},
  },
  brands: {
    brandList: {
      data: [],
      count: 0,
      page: 1,
      limit: 10
    },
  },
  sales: {
    salesGraphData: {},
    salesByWeekData: {},
    salesReportCallOuts: {},
  },
  salesBySku: {
    salesSkuDetailsList: {
      status: false,
      data: []
    },
    salesBySkuDetails: {
      status: false,
      data: {}
    },
  },
  salesByProduct: {
    salesByProductList: {},
    saveColumnConfiguration: {},
    salesByProductColumnList: {},
    saveTableConfiguration: {},
  },
  categoryPerformanceReport: {
    categoryPerformanceList: {},
  },
  salesByWeek: {
    salesWeekDetailList: {
      status: false,
      data: []
    },
    salesWeekGraph: {},
    salesWeekData: {
      status: false,
      data: {}
    },
  },
  productReportList: {
    data: [],
    status: false
  },
  salesByMonth: {
    salesByMonthData: {
      status: false,
      data: {}
    },
    salesByMonthDetail: {
      status: false,
      data: []
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
      items: []
    },
  },
};

export default initialState;
