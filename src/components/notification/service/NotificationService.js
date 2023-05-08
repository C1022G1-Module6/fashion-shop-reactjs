import axios from "axios"
export const getAllNotification = (page) =>{
    const token = localStorage.getItem('token')
    try {
        return  axios.get(`http://localhost:8080/notifications?page=${page ? page : '0'}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        
    }
}

export const getTotalNotification = async() =>{
    const token = localStorage.getItem('token')
    try {
        let res = await axios.get(`http://localhost:8080/notifications`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res.data.content
    } catch (error) {
        
    }
}

export const getAllEmployee = async() =>{
    const token = localStorage.getItem('token')
    try {
        let res = await axios.get(`http://localhost:8080/employee`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res.data.content
    } catch (error) {
        
    }
}
export const findById = async(id) =>{
    const token = localStorage.getItem('token')
    try {
        return (await axios.get(`http://localhost:8080/notifications/detail/${id}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })).data
    } catch (error) {
        console.log(error)
    }
}

export const save = async(values) =>{
    console.log(values);
    const token = localStorage.getItem('token')
    try {
       return await axios.post(`http://localhost:8080/notifications/create`, { ...values },{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type':'application/json'
        }
    })
    } catch (error) {
        console.log(error);
    }
 
}
export const getAllNotificationByWareHouse = (page) =>{
    const token = localStorage.getItem('token')
    try {
        return  axios.get(`http://localhost:8080/notifications/role_warehouse?page=${page ? page : '0'}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAllNotificationBySaler = (page) =>{
    const token = localStorage.getItem('token')
    try {
        return  axios.get(`http://localhost:8080/notifications/role_saler?page=${page ? page : '0'}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error);
    }
}