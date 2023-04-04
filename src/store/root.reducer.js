import productSlice from './slice/product.slice';
import SalesReducer from './slice/sales.slice';
import skuReducer from './slice/sku.slice';

export const rootReducer = {
  sales: SalesReducer,
  sku: skuReducer,
  product: productSlice
};
