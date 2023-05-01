import request from "../../request";

const findAllType = () => {
    return request.get(`/api/user/productType`,{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmFucXVhbjEyMyIsImlhdCI6MTY4MjkzMDY1MiwiZXhwIjoxNjgzMDE3MDUyfQ.EsOi2vxGbAPup5IAOZfyK-QtKTIwYtLpDGlnIm5FrZjN25RIGGC8uFzKvJVTQXyy5hZ2ag8cvHJ11PFC8ned6A'
        }
    })
}
const productTypeService = {
    findAllType
}
export default productTypeService