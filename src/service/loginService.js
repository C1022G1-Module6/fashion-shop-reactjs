import request from '../request'

const login = (value)=>{
    return request.post('/login', { ...value })
}

const changePassword = (value)=>{
    const token = localStorage.getItem('token')
    return request.put('/change-password',{ ...value }, {
        headers : {
            'Authorization': `Bearer ${token}`
        }
    })
}

const loginService = {
    login,
    changePassword
}
export default loginService