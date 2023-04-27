import request from "../../request";

const findAll = () => {
    return request.get(`/data-entry`);
};

const update = (dataEntry) => {
    return request.put(`/data-entry`, {...dataEntry})
};

const getDetail = () => {
    return request.get(`/data-entry/detail`);
};

const dataEntryService = {
    findAll,
    update,
    getDetail
};

export default dataEntryService;