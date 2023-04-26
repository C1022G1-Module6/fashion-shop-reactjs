import request from '../request'
const detail = () => {
    const token = localStorage.getItem('token')
 return request.get('/employee/detail',{
    headers:{
        'Authorization':`Bearer ${token}`
    }
})
}
const employeeService = {
    detail
}
export default employeeService