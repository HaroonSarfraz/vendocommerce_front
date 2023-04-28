import request from "./request";

export const fetchInventoryPlanningData = (data) => {
  return request.get(`get-inventory-planning-data?search_text=${data?.search_text || ""}&page=${data?.page || 1}&per-page=${data?.perPage || 10}`);
};

export const fetchInventoryPlanningColumnsList = () => {
  return request.get(`get-inventory-column-list`);
};

export const fetchInventoryPlanningColumnsSave = (data) => {
  return request.post(`save-inventory-table-configuration`, data);
};
