
import request from "../request";



export const saveCustomer = async (customer) => {
    try{
       return await request.post(`/api/customer/create`,{...customer})
    }
    catch(err){
        console.log(err);
    }
}

export const findCustomerById = async (id) => {
    console.log(id);
    try{
        const res = await request.get(`/api/customer/${id}`)
        console.log(res.data);
        return res.data
       
    }
    catch(err){
        console.log(err);
    }
}

export const editCustomer = async (customer) => {
    console.log(customer);
    try {
        await request.patch(`/api/customer/update/${customer.id}`, { ...customer })
    } catch (err) {
        console.log(err);
    }
}