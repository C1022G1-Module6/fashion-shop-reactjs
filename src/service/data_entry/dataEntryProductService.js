import request from "../../request";

const findAll = () => {
    return request.get(`/data-entry-product`);
};

const add = (dataEntryProduct) => {
    return request.post(`/data-entry-product`, {...dataEntryProduct})
}

const dataEntryProductService = {
    findAll,
    add
}

export default dataEntryProductService;