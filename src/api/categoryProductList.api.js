import request from "./request";

export const fetchCategoryProductList = (
  params = {
    page: 1,
    limit: 20,
    order: "desc",
    orderBy: undefined,
    "search[category]": [],
    "search[asin]": undefined,
    "search[sku]": undefined,
    "search[product_title]": undefined,
    "search[product_status]": undefined,
  }
) => {
  return request.get(`/categories/product-data`, {
    params: {
      ...params,
      "search[category]": params["search[category]"].join(","),
    },
  });
};
