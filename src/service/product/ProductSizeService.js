import request from "../../request";
const findAllSize = () => {
    return request.get(`/api/product-size`)
}
const productSizeService = {
    findAllSize
}
export default productSizeService