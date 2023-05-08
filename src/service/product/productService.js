import request from "../../request";

const search = ({name,productTypeId,page}) => {
    const token = localStorage.getItem('token')
    return request.get(`/api/user/product/search?productName=${name ? name : '' }&productTypeId=${productTypeId ? productTypeId : "" }&page=${page?page:0}` ,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const findByName = ({name,page}) => {
    const token = localStorage.getItem('token')
    return request.get(`/api/user/product/?productName=${name ? name : '' }&page=${page?page:0}` ,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const saveProduct = (value) => {
    const token = localStorage.getItem('token')
    return request.post(`/api/user/product/create-product`, { ...value },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const getAllProductDetail = (id) => {
    const token = localStorage.getItem('token')
    return request.get(`/api/user/product/detail?id=${id}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const searchWithType = ({name, page}) => {
    const token = localStorage.getItem('token')
    if (name === 0) {
        name = ""
    }
    return request.get(`/api/user/product/search-type?productTypeId=${name?name:""}&page=${page? page: 0}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
const productService = {
    search,
    saveProduct,
    getAllProductDetail,
    searchWithType,
    findByName
}
export default productService