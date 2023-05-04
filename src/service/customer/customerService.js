import request from "../../request";


export const search = (name,page)=>{
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
const customerService = {
    search,
    deleteCustomer
}

export default customerService;