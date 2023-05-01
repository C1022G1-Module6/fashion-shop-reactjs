import request from "../../request";

const search = ({name,page}) => {
    const token = localStorage.getItem('token')
    return request.get(`/api/user/product/search?productName=${name ? name : "" }&code=${name? name : "" }&page=${page?page:0}` ,{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmhxdWFuMTIzIiwiaWF0IjoxNjgyOTUyODc2LCJleHAiOjE2ODMwMzkyNzZ9.7HrkInp6UJJoGG567F0DX_5P1dgNHZJxaD55jDKUm08fwgKmi-PHWwe8G36ehhf-jbfDJO1U6Wd4GXeRyFuJDA'
        }
    })
}

const saveProduct = (value) => {
    return request.post(`/api/user/product/create-product`, { ...value },{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmhxdWFuMTIzIiwiaWF0IjoxNjgyOTUyODc2LCJleHAiOjE2ODMwMzkyNzZ9.7HrkInp6UJJoGG567F0DX_5P1dgNHZJxaD55jDKUm08fwgKmi-PHWwe8G36ehhf-jbfDJO1U6Wd4GXeRyFuJDA'
        }
    })
}

const getAllProductDetail = (id) => {
    return request.get(`/api/user/product/detail?id=${id}`,{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmhxdWFuMTIzIiwiaWF0IjoxNjgyOTUyODc2LCJleHAiOjE2ODMwMzkyNzZ9.7HrkInp6UJJoGG567F0DX_5P1dgNHZJxaD55jDKUm08fwgKmi-PHWwe8G36ehhf-jbfDJO1U6Wd4GXeRyFuJDA'
        }
    })
}

const searchWithType = ({name, page}) => {
    if (name === 0) {
        name = ""
    }
    return request.get(`/api/user/product/search-type?productTypeId=${name?name:""}&page=${page? page: 0}`,{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmhxdWFuMTIzIiwiaWF0IjoxNjgyOTUyODc2LCJleHAiOjE2ODMwMzkyNzZ9.7HrkInp6UJJoGG567F0DX_5P1dgNHZJxaD55jDKUm08fwgKmi-PHWwe8G36ehhf-jbfDJO1U6Wd4GXeRyFuJDA'
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