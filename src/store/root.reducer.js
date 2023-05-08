import UsersReducer from "./slice/users.slice";
import BrandsReducer from "./slice/brands.slice"
import SalesReducer from "./slice/sales.slice";
import SalesBySku from "./slice/salesBySku.slice";
import SalesByProduct from "./slice/salesByProduct.slice";
import SalesByWeek from "./slice/salesByWeek.slice";
import SalesByMonth from "./slice/salesByMonth.slice";
import InventoryPlanning from "./slice/planning.slice";
import shipping from "./slice/shipping.slice";
import CategoryPerformanceReport from './slice/categoryPerformanceReport.slice';

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
  categoryPerformanceReport: CategoryPerformanceReport,
};
