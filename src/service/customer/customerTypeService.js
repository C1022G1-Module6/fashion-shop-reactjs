
import request from "../../request";

 const findAll=()=>{
    const token = localStorage.getItem('token')
    try {
        return request.get('/api/customerType', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const customerTypeService = {
    findAll
}

export default customerTypeService;