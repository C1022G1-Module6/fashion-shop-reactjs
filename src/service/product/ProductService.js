import request from "../../request";

const search = ({name,page}) => {
    return request.get(`/api/user/product/search?productName=${name ? name : "" }&code=${name? name : "" }&page=${page?page:0}` ,{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmFucXVhbjEyMyIsImlhdCI6MTY4MzAxNzM4NSwiZXhwIjoxNjgzMTAzNzg1fQ.RDZ72tRYMff6JIcBvwso43L_kvM1NZAALfEd0CEjvH485jUs3zGGpMlGVMYtT2O2ypygdkDObqfj0z8uSa6lmQ'
        }
    })
}

const saveProduct = (value) => {
    return request.post(`/api/user/product/create-product`, { ...value },{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmFucXVhbjEyMyIsImlhdCI6MTY4MzAxNzM4NSwiZXhwIjoxNjgzMTAzNzg1fQ.RDZ72tRYMff6JIcBvwso43L_kvM1NZAALfEd0CEjvH485jUs3zGGpMlGVMYtT2O2ypygdkDObqfj0z8uSa6lmQ'
        }
    })
}

const getAllProductDetail = (id) => {
    return request.get(`/api/user/product/detail?id=${id}`,{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmFucXVhbjEyMyIsImlhdCI6MTY4MzAxNzM4NSwiZXhwIjoxNjgzMTAzNzg1fQ.RDZ72tRYMff6JIcBvwso43L_kvM1NZAALfEd0CEjvH485jUs3zGGpMlGVMYtT2O2ypygdkDObqfj0z8uSa6lmQ'
        }
    })
}

const searchWithType = ({name, page}) => {
    if (name === 0) {
        name = ""
    }
    return request.get(`/api/user/product/search-type?productTypeId=${name?name:""}&page=${page? page: 0}`,{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmFucXVhbjEyMyIsImlhdCI6MTY4MzAxNzM4NSwiZXhwIjoxNjgzMTAzNzg1fQ.RDZ72tRYMff6JIcBvwso43L_kvM1NZAALfEd0CEjvH485jUs3zGGpMlGVMYtT2O2ypygdkDObqfj0z8uSa6lmQ'
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