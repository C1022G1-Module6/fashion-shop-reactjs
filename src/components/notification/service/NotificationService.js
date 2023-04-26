import axios from "axios"
export const getAllNotification = async() =>{
    try {
        let res = await axios.get(`http://localhost:8080/notifications`)

        return res.data.content
    } catch (error) {
        
    }
}

export const getAllEmployee = async() =>{
    try {
        let res = await axios.get(`http://localhost:8080/employee`)

        return res.data.content
    } catch (error) {
        
    }
}
export const findById = async(id) =>{
    try {
        return (await axios.get(`http://localhost:8080/notifications/detail/${id}`)).data
    } catch (error) {
        console.log(error)
    }
}

export const save = async(values) =>{

    try {
        await axios.post(`http://localhost:8080/notifications`, {...values})
    } catch (error) {
        
    }
}