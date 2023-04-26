import request from '../request'

const login = (value)=>{
    return request.post('/login', { ...value })
}

const changePassword = ()=>{
    return request.put('/change-password')
}

const loginService = {
    login,
    changePassword
}
export default loginService