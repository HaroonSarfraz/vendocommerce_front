import request from "./request";

export const fetchRestockLimitInInventoryDashBoard = () => {
    return request.get(`get-inventory-DashBoard-Restock-Limit`);
  };