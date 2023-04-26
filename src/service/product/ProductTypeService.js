import request from "../../request";

const findAllType = () => {
    return request.get(`/api/user/productType`)
}
const productTypeService = {
    findAllType
}
export default productTypeService