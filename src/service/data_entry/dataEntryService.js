import request from "../../request";

const findAll = () => {
    const token = localStorage.getItem('token')
    return request.get(`/data-entry`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const update = (dataEntry) => {
    const token = localStorage.getItem('token')
    return request.put(`/data-entry`, {...dataEntry},{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
};

const getDetail = () => {
    const token = localStorage.getItem('token')
    return request.get(`/data-entry/detail`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const remove = () => {
    const token = localStorage.getItem('token')
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