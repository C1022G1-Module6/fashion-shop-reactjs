import request from "../../request";

export const findAllCustomer = () => {
    return request.get(`/api/admins/customer`)};
export const findNumberOfOrder = () => {
    return request.get(`/api/admins/order`)};
export const findTopEmployees = () => {
    return request.get(`/api/admins/top-selling`)};
export const findTopProduct = () => {
    return request.get(`/api/admins/top-order`)};
export const findRevenueInWeek = () => {
    return request.get(`/api/admins/total-week`)};
export const findRevenueInMonth = () => {
    return request.get(`/api/admins/total-month`)};