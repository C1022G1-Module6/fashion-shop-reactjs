import request from "../../request";


 const search = (name,page)=>{
    const token = localStorage.getItem('token')
    try {
        return request.get(`/api/customer?searchCode=${name}&searchName=${name}&searchPhoneNumber=${name}&page=${page ? page : '0'}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error);
    }
}


const deleteCustomer = (id) => {
    const token = localStorage.getItem('token')
    try {
        return request.delete(`/api/customer/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }catch (e) {
        console.log(e)
    }
}

 const saveCustomer = async (customer) => {
    const token = localStorage.getItem('token')
    console.log(customer);
    try{
       return await request.post(`/api/customer/create`,{...customer}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    }
    catch(err){
        console.log(err);
    }
}

 const findCustomerById = async (id) => {
    const token = localStorage.getItem('token')
    console.log(id);
    try{
        const res = await request.get(`/api/customer/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(res.data);
        return res.data
       
    }
    catch(err){
        console.log(err);
    }
}

 const editCustomer = async (customer) => {
    const token = localStorage.getItem('token')
    console.log(customer);
    try {
        await request.patch(`/api/customer/update/${customer.id}`, { ...customer }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (err) {
        console.log(err);
    }

 }
 
const customerService = {
    search,
    deleteCustomer,
    editCustomer,
    findCustomerById,
    saveCustomer
}

export default customerService;