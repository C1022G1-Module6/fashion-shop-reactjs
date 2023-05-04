import request from "../request";

const getAllNotification = ()=>{
    const token = localStorage.getItem('token')
    return request.get(`/notifications`)
}

const createNotification = (values) =>{
    const token = localStorage.getItem('token')
    return request.post(`/notifications/`, {...values})
}
const findById = (id) =>{
    const token = localStorage.getItem('token')
    return request.get(`/notifications/detail/${id}` )
}

const notificationService = {

    getAllNotification,
    createNotification,
    findById
}

export default notificationService