import axios from "axios";
import request from "../request";



export const saveCustomer = async (customer) => {
    try{
        await axios.post(`/api/customer/create`,{...customer})
    }
    catch(err){
        console.log(err);
    }
}

export const findCustomerById = async (id) => {
    try{
        const res = await axios.get(`/api/customer/${id}`)
        return res.data
    }
    catch(err){
        console.log(err);
    }
}

export const editCustomer = async (customer) => {
    try {
        await axios.put(`/api/customer/update/${customer.id}`, { ...customer })
    } catch (err) {
        console.log(err);
    }
}