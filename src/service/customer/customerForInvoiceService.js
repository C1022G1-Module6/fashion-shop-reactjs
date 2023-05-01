import request from "../../request"

const findCustomer = ({ name, page }) => {
    return request.get(`/api/customer?searchCode=${name ? name : ""}&searchName=${
        name ? name : ""
      }&searchPhoneNumber=${name ? name : ""}&page=${page ? page : "0"}`, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmhxdWFuMTIzIiwiaWF0IjoxNjgyOTQwNzE2LCJleHAiOjE2ODMwMjcxMTZ9.pZC6fftZ3Yi8lcPhP5-2VZsax399DL2Ruwv1204I3arbAgKEmTcdodDCP9Lkgr-Kq4nsDS0zgNBtnMErK7Dsxw'
        }
    })
}

const customerForInvoiceService = {
    findCustomer
}

export default customerForInvoiceService