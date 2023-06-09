import UsersReducer from "./slice/users.slice";
import SalesReducer from "./slice/sales.slice";
import SalesBySku from "./slice/salesBySku.slice";
import SalesByProduct from "./slice/salesByProduct.slice";
import SalesByWeek from "./slice/salesByWeek.slice";
import SalesByMonth from "./slice/salesByMonth.slice";

export const rootReducer = {
  users: UsersReducer,
  sales: SalesReducer,
  salesBySku: SalesBySku,
  salesByProduct: SalesByProduct,
  salesByWeek: SalesByWeek,
  salesByMonth: SalesByMonth,
};
