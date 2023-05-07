import { message } from 'antd';
import { setCategoryPerformanceList } from '../store/slice/categoryPerformanceReport.slice';
import { CreateCategoryPerformanceList, fetchCategoryPerformanceList } from '../api/categoryPerformance.api';

export const getCategoryPerformanceList = (data) => {
  return (dispatch) => {
    fetchCategoryPerformanceList(data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setCategoryPerformanceList(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || 'Something Went Wrong.');
      });
  };
};

export const createCategoryPerformanceList = (data) => {
  return (dispatch) => {
    CreateCategoryPerformanceList(data)
      .then((res) => {
        if (res.data.status) {
          dispatch(setCategoryPerformanceList(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || 'Something Went Wrong.');
      });
  };
};
