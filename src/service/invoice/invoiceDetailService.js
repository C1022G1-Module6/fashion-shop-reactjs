import request from "../../request";

const findAll = () => {
    return request.get(`/invoice-detail`);
};

const add = (invoiceDetail) => {
    return request.post(`/invoice-detail`, {...invoiceDetail})
}

const remove = (id) => {
    return request.delete(`/invoice-detail/${id}`)
}

const invoiceDetailService = {
    findAll,
    add,
    remove
}

export default invoiceDetailService;