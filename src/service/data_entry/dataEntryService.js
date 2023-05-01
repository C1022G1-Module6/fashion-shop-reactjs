import request from "../../request";
const token = localStorage.getItem('token')
const findAll = () => {
    return request.get(`/data-entry`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const update = (dataEntry) => {
    return request.put(`/data-entry`, {...dataEntry},{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
};

const getDetail = () => {
    return request.get(`/data-entry/detail`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const remove = () => {
    return request.delete(`/data-entry`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const dataEntryService = {
    findAll,
    update,
    getDetail,
    remove
};

export default dataEntryService;