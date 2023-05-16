import { message } from "antd";
import {
    fetchPoTemplateColumnList,
    fetchPoTemplateList,
    SaveColumnConfiguration,
    SaveTableConfigurationAction,
} from "../api/poTemplate.api";
import {
    setPoTemplateColumnList,
    setPoTemplateList,
    setSaveColumnConfiguration,
    setSaveTableConfiguration,
} from "../store/slice/poTemplate.slice";

export const getPoTemplateList = (data) => {
    return (dispatch) => {
        fetchPoTemplateList(data)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(setPoTemplateList({ status: true, data: res.data }));
                } else {
                    message.error(res.data.message);
                }
            })
            .catch((err) => {
                message.error(err?.response?.message || "Something Went Wrong.");
            });
    };
};

export const getSaveColumnConfiguration = (data) => {
    return (dispatch) => {
        SaveColumnConfiguration(data)
            .then((res) => {
                if (res.data.status) {
                    dispatch(setSaveColumnConfiguration(res.data));
                } else {
                    message.error(res.data.message);
                }
            })
            .catch((err) => {
                message.error(err?.response?.message || "Something Went Wrong.");
            });
    };
};

export const getPoTemplateColumnList = (data) => {
    return (dispatch) => {
        fetchPoTemplateColumnList(data)
            .then((res) => {
                if (res.data.status) {
                    dispatch(setPoTemplateColumnList(res.data));
                } else {
                    message.error(res.data.message);
                }
            })
            .catch((err) => {
                message.error(err?.response?.message || "Something Went Wrong.");
            });
    };
};

export const getSaveTableConfiguration = (data) => {
    return (dispatch) => {
        SaveTableConfigurationAction(data)
            .then((res) => {
                if (res.data.status) {
                    dispatch(setSaveTableConfiguration(res.data));
                } else {
                    message.error(res.data.message);
                }
            })
            .catch((err) => {
                message.error(err?.response?.message || "Something Went Wrong.");
            });
    };
};
