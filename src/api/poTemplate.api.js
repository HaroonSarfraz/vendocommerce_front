import request from './request';

export const fetchPoTemplateList = (data) => {
    return request.get(`/sales/sales-by-product?year=${data?.search_year || ''}&weeks=${data?.search_week || '1,2,3'}`);
};

export const postPotemplateObj = (data) => {
    return request.post(`/save-column-configuration`, data);
};
