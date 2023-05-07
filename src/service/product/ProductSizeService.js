import request from "../../request";
const findAllSize = () => {
    const token = localStorage.getItem('token')
    return request.get(`/api/product-size`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
const productSizeService = {
    findAllSize
}
export default productSizeService