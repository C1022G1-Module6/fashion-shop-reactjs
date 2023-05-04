import request from "../../request";

export const findAllCustomer = () => {
    const token = localStorage.getItem('token')
    return request.get(`/api/admins/customer`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })};
export const findNumberOfOrder = () => {
    const token = localStorage.getItem('token')
    return request.get(`/api/admins/order`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })};
export const findTopEmployees = () => {
    const token = localStorage.getItem('token')
    return request.get(`/api/admins/top-selling`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })};
export const findTopProduct = () => {
    const token = localStorage.getItem('token')
    return request.get(`/api/admins/top-order`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })};
export const findRevenueInWeek = () => {
    const token = localStorage.getItem('token')
    return request.get(`/api/admins/total-week`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })};
export const findRevenueInMonth = () => {
    const token = localStorage.getItem('token')
    return request.get(`/api/admins/total-month`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })};