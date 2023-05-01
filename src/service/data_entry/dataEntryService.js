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

const remove = () => {
    return request.delete(`/data-entry`)
}

const dataEntryService = {
    findAll,
    update,
    getDetail,
    remove
};

export default dataEntryService;