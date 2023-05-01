import request from "../../request"
const token = localStorage.getItem('token')
const findCustomer = ({ name, page }) => {
    return request.get(`/api/customer?searchCode=${name ? name : ""}&searchName=${
        name ? name : ""
      }&searchPhoneNumber=${name ? name : ""}&page=${page ? page : "0"}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const customerForInvoiceService = {
    findCustomer
}

export default customerForInvoiceService