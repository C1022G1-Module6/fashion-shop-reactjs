import request from "../../request";

const findAllType = () => {
    return request.get(`/api/user/productType`,{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmFucXVhbjEyMyIsImlhdCI6MTY4MzAxNzM4NSwiZXhwIjoxNjgzMTAzNzg1fQ.RDZ72tRYMff6JIcBvwso43L_kvM1NZAALfEd0CEjvH485jUs3zGGpMlGVMYtT2O2ypygdkDObqfj0z8uSa6lmQ'
        }
    })
}
const productTypeService = {
    findAllType
}
export default productTypeService