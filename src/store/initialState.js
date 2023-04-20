const initialState = {
  users: {
    userList: {},
    switchUser: {},
  },
  brands: {
    brandList: [],
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
};

export default initialState;
