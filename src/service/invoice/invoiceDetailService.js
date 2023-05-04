import request from "../../request";

const findAll = () => {
    const token = localStorage.getItem('token')
    return request.get(`/invoice-detail`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const add = (invoiceDetail) => {
    const token = localStorage.getItem('token')
    return request.post(`/invoice-detail`, { ...invoiceDetail },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const remove = (id) => {
    const token = localStorage.getItem('token')
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