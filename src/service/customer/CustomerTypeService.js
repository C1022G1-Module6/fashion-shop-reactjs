
import request from "../../request";
import {search} from "./CustomerService";
 const findAll=()=>{
    try {
        return request.get('/api/customerType')
    } catch (error) {
        console.log(error);
    }
}

const customerTypeService = {
    findAll
}

export default customerTypeService;