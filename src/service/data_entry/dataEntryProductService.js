import request from "../../request";

const findAll = () => {
    return request.get(`/data-entry-product`);
};

const add = (dataEntryProduct) => {
    return request.post(`/data-entry-product`, {...dataEntryProduct})
}

const remove = (id) => {
    return request.delete(`/data-entry-product/${id}`);
};

const dataEntryProductService = {
    findAll,
    add,
    remove
}

export default dataEntryProductService;