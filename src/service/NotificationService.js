import request from "../request";

const getAllNotification = ()=>{
    return request.get(`/notifications`)
}

const createNotification = (values) =>{
    return request.post(`/notifications/`, {...values})
}
const findById = (id) =>{
    return request.get(`/notifications/detail/${id}` )
}

const notificationService = {

    getAllNotification,
    createNotification,
    findById
}

export default notificationService