import request from "../../request";
const token = localStorage.getItem('token')
const findAll = () => {
    return request.get(`/invoice-detail`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const add = (invoiceDetail) => {
    return request.post(`/invoice-detail`, { ...invoiceDetail },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const remove = (id) => {
    return request.delete(`/invoice-detail/${id}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const invoiceDetailService = {
    findAll,
    add,
    remove
}

export default invoiceDetailService;