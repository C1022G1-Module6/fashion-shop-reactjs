import request from "../../request"

const findAll = () => {
    return request.get(`/invoice`);
};

const update = (invoice) => {
    return request.put(`/invoice`, {...invoice})
};

const getDetail = () => {
    return request.get(`/invoice/detail`)
}

const remove = () => {
    return request.delete(`/invoice`)
}

const invoiceService = {
    findAll,
    update,
    getDetail,
    remove
};

export default invoiceService;