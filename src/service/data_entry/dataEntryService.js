import request from "../../request";

const findAll = () => {
    return request.get(`/data-entry`);
};

const update = (dataEntry) => {
    return request.put(`/data-entry`, {...dataEntry})
};


const dataEntry = {
    findAll,
    update,
};

export default dataEntry;