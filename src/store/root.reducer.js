import UsersReducer from './slice/users.slice';
import SalesReducer from './slice/sales.slice';

export const rootReducer = {
  users: UsersReducer,
  sales: SalesReducer,
};
