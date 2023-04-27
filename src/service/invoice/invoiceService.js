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

const invoiceService = {
    findAll,
    update,
    getDetail
};

export default invoiceService;