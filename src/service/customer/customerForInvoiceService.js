import request from "../../request"

const findCustomer = ({name,page}) => {
    return request.get(`/api/customer?searchCode=${name}&searchName=${name}&searchPhoneNumber=${name}&page=${page ? page : '0'}`)
}

const customerForInvoiceService = {
    findCustomer
}

export default customerForInvoiceService