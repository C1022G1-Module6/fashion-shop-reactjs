import request from "../../request";

const findAllType = () => {
    const token  = localStorage.getItem('token')
    return request.get(`/api/user/productType`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
const productTypeService = {
    findAllType
}
export default productTypeService