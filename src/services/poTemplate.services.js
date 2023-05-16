import { message } from "antd";
import {
    fetchPoTemplateList, postPotemplateObj,
} from "../api/poTemplate.api";
import {
    setPoTemplateList,
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
export const postPoTemplate = (data) => {
    return () => {
        postPotemplateObj(data)
            .then((res) => {
                if (res.status === 200) {
                    console.log('successfully post data')
                } else {
                    message.error(res.data.message);
                }
            })
            .catch((err) => {
                return message.error(err?.response?.message || "Something Went Wrong.");
            });
    };
};
