import request from "../../request";

const search = ({name,page}) => {
    return request.get(`/api/user/product/search?productName=${name ? name : "" }&code=${name? name : "" }&page=${page?page:0}` ,{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmFucXVhbjEyMyIsImlhdCI6MTY4MjkzMDY1MiwiZXhwIjoxNjgzMDE3MDUyfQ.EsOi2vxGbAPup5IAOZfyK-QtKTIwYtLpDGlnIm5FrZjN25RIGGC8uFzKvJVTQXyy5hZ2ag8cvHJ11PFC8ned6A'
        }
    })
}

const saveProduct = (value) => {
    return request.post(`/api/user/product/create-product`, { ...value },{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmFucXVhbjEyMyIsImlhdCI6MTY4MjkzMDY1MiwiZXhwIjoxNjgzMDE3MDUyfQ.EsOi2vxGbAPup5IAOZfyK-QtKTIwYtLpDGlnIm5FrZjN25RIGGC8uFzKvJVTQXyy5hZ2ag8cvHJ11PFC8ned6A'
        }
    })
}

const getAllProductDetail = (id) => {
    return request.get(`/api/user/product/detail?id=${id}`,{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmFucXVhbjEyMyIsImlhdCI6MTY4MjkzMDY1MiwiZXhwIjoxNjgzMDE3MDUyfQ.EsOi2vxGbAPup5IAOZfyK-QtKTIwYtLpDGlnIm5FrZjN25RIGGC8uFzKvJVTQXyy5hZ2ag8cvHJ11PFC8ned6A'
        }
    })
}

const searchWithType = ({name, page}) => {
    if (name === 0) {
        name = ""
    }
    return request.get(`/api/user/product/search-type?productTypeId=${name?name:""}&page=${page? page: 0}`,{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmFucXVhbjEyMyIsImlhdCI6MTY4MjkzMDY1MiwiZXhwIjoxNjgzMDE3MDUyfQ.EsOi2vxGbAPup5IAOZfyK-QtKTIwYtLpDGlnIm5FrZjN25RIGGC8uFzKvJVTQXyy5hZ2ag8cvHJ11PFC8ned6A'
        }
    })
}
const productService = {
    search,
    saveProduct,
    getAllProductDetail,
    searchWithType
}
export default productService