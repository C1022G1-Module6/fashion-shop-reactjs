import request from "../../request"
const token = localStorage.getItem('token')
const findAll = () => {
    return request.get(`/invoice`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const update = (invoice) => {
    return request.put(`/invoice`, { ...invoice },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
};

const getDetail = () => {
    return request.get(`/invoice/detail`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const remove = () => {
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