import request from "../../request";
const findAllSize = () => {
    return request.get(`/api/product-size`,{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmhxdWFuMTIzIiwiaWF0IjoxNjgyOTUyODc2LCJleHAiOjE2ODMwMzkyNzZ9.7HrkInp6UJJoGG567F0DX_5P1dgNHZJxaD55jDKUm08fwgKmi-PHWwe8G36ehhf-jbfDJO1U6Wd4GXeRyFuJDA'
        }
    })
}
const productSizeService = {
    findAllSize
}
export default productSizeService