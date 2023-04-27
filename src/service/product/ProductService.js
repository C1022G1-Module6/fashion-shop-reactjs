import request from "../../request";

const findAll = () => {
    return request.get(`/api/user/product/stock`)
}

const saveProduct = () => {
    return request.post(`/api/user/product/create-product`)
}

const getAllProductDetail = (id) => {
    return request.get(`/api/user/product/detail?id=${id}`)
}
const productService = {
findAll,
    saveProduct,
getAllProductDetail
}
export default productService