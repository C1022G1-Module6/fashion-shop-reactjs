import request from "../../request";

const findAll = () => {
    const token  = localStorage.getItem('token')
    return request.get(`/data-entry-product` ,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const add = (dataEntryProduct) => {
    const token  = localStorage.getItem('token')
    return request.post(`/data-entry-product`, {...dataEntryProduct},{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const remove = (id) => {
    const token  = localStorage.getItem('token')
    return request.delete(`/data-entry-product/${id}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const dataEntryProductService = {
    findAll,
    add,
    remove
}

export default dataEntryProductService;