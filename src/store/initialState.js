const initialState = {
  users: {
    userList: {
      items: []
    },
    switchUser: {},
  },
  brands: {
    brandList: {
      data: []
    },
  },
  sales: {
    salesGraphData: {},
    salesByWeekData: {},
    salesReportCallOuts: {},
  },
  salesBySku: {
    salesSkuDetailsList: {},
    salesBySkuDetails: {},
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
    salesWeekDetailList: {},
    salesWeekGraph: {},
    salesWeekData: {},
  },
  salesByMonth: {
    salesByMonthData: {},
    salesByMonthDetail: {},
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
