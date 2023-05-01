import request from "../../request";
const token  = localStorage.getItem('token')
const findAll = () => {
    return request.get(`/data-entry-product` ,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const add = (dataEntryProduct) => {
    return request.post(`/data-entry-product`, {...dataEntryProduct},{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const remove = (id) => {
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