const initialState = {
  sales: {
    salesGraphData: {},
    salesByWeekData: {},
    salesReportCallOuts: {}
  },
  sku: {
    salesSKUDetailsList: {},
    salesBySKUDetails: {}
  },
  product: {
    salesByProductList: {},
    saveColumnConfiguration: {},
    salesByProductColumnList: {},
    saveTableConfiguration: {}
  },
  week: {
    salesWeekDetailList: {},
    salesWeekGraph: {},
    salesWeekData: {}
  },
  month: {
    salesByMonthData: {},
    salesByMonthDetail: {},
    salesByMonthGraph: {}
  }
};

export default initialState;
