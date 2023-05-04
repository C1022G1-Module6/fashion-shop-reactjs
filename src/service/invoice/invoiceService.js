import request from "../../request"

const findAll = () => {
    const token = localStorage.getItem('token')
    return request.get(`/invoice`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const update = (invoice) => {
    const token = localStorage.getItem('token')
    return request.put(`/invoice`, { ...invoice },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
};

const getDetail = () => {
    const token = localStorage.getItem('token')
    return request.get(`/invoice/detail`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const remove = () => {
    const token = localStorage.getItem('token')
    return request.delete(`/invoice`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const invoiceService = {
    findAll,
    update,
    getDetail,
    remove
};

export default invoiceService;