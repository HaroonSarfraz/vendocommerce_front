import _ from "lodash";
import request from "./request";

export const fetchProductReportList = (data) => {
  return request.get(`/categories/product-report`, {
    params: _.omitBy(
      {
        year: data.search_year,
        weeks: data?.search_week || "1,2,3",
        asin: data.asin,
        category: data.category,
      },
      (v) => v === null || v === "" || v === undefined
    ),
  });
};
