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
  salesByMonth: {
    salesByMonthData: {
      status: true,
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
