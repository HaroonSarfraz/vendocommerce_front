import UsersReducer from "./slice/users.slice";
import BrandsReducer from "./slice/brands.slice";
import SalesReducer from "./slice/sales.slice";
import SalesBySku from "./slice/salesBySku.slice";
import SalesByProduct from "./slice/salesByProduct.slice";
import SalesByWeek from "./slice/salesByWeek.slice";
import SalesByMonth from "./slice/salesByMonth.slice";
import InventoryPlanning from "./slice/planning.slice";
import shipping from "./slice/shipping.slice";
import ProductReportList from "./slice/productReport.slice";
import CategoryList from "./slice/categoryList.slice";
import CategoryProductList from "./slice/categoryProductList.slice";
import CategoryPerformanceReport from "./slice/categoryPerformanceReport.slice";
import Advertising from "./slice/advertising.slice";
import AdvertisingTotalRevenue from "./slice/advertisingTotalRevenue.slice";
import CustomerAcquisition from "./slice/customerAcquisition.slice";
import InventoryDashboard from "./slice/inventoryDashboard.slice";
import PoTemplateSlice from "./slice/poTemplate.slice";

export const rootReducer = {
  users: UsersReducer,
  brands: BrandsReducer,
  sales: SalesReducer,
  salesBySku: SalesBySku,
  salesByProduct: SalesByProduct,
  salesByWeek: SalesByWeek,
  salesByMonth: SalesByMonth,
  planning: InventoryPlanning,
  shipping: shipping,
  categoryList: CategoryList,
  customerAcquisition: CustomerAcquisition,
  productReportList: ProductReportList,
  categoryProductList: CategoryProductList,
  categoryPerformanceReport: CategoryPerformanceReport,
  advertising: Advertising,
  advertisingTotalRevenue: AdvertisingTotalRevenue,
  inventoryDashboard: InventoryDashboard,
  poTemplate: PoTemplateSlice,
};
