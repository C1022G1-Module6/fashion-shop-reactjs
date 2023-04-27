import request from "../../request";

const findAll = () => {
    return request.get(`/invoice-detail`);
};

const add = (invoiceDetail) => {
    return request.post(`/invoice-detail`, {...invoiceDetail})
}

const invoiceDetailService = {
    findAll,
    add
}

export default invoiceDetailService;