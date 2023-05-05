import request from "../../request";
import React from "react";

export const search = (name,page)=>{
    try {
        return request.get(`/api/customer?searchCode=${name}&searchName=${name}&searchPhoneNumber=${name}&page=${page ? page : '0'}`)
    } catch (error) {
       console.log(error);
    }
}


const deleteCustomer = (id) => {
    try {
        return request.delete(`/api/customer/${id}`)
    }catch (e) {
        console.log(e)
    }
}
const customerService = {
    search,
    deleteCustomer
}

export default customerService;
