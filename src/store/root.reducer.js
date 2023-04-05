import UsersReducer from "./slice/users.slice";
import SalesReducer from "./slice/sales.slice";
import SalesBySku from "./slice/salesBySku.slice";
import SalesByProduct from "./slice/salesByProduct.slice";

export const rootReducer = {
  users: UsersReducer,
  sales: SalesReducer,
  salesBySku: SalesBySku,
  salesByProduct: SalesByProduct,
};
