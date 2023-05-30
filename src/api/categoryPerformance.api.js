import request from "./request";

export const fetchCategoryPerformanceList = (data) => {
  return request.get(`/categories/performance-report`, {
    params: {
      year: data?.search_year,
      weeks: data?.search_week || "1,2,3",
      category: data?.category,
    },
  });
};

export const CategoryPerformanceReportImport = (data) => {
  return request.post(`/category/category-performance-report-import`, data);
};
