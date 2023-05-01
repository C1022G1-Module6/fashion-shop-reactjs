import request from "../../request";

const findAll = () => {
    return request.get(`/invoice-detail`, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmhxdWFuMTIzIiwiaWF0IjoxNjgyOTQwNzE2LCJleHAiOjE2ODMwMjcxMTZ9.pZC6fftZ3Yi8lcPhP5-2VZsax399DL2Ruwv1204I3arbAgKEmTcdodDCP9Lkgr-Kq4nsDS0zgNBtnMErK7Dsxw'
        }
    });
};

const add = (invoiceDetail) => {
    return request.post(`/invoice-detail`, { ...invoiceDetail }, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmhxdWFuMTIzIiwiaWF0IjoxNjgyOTQwNzE2LCJleHAiOjE2ODMwMjcxMTZ9.pZC6fftZ3Yi8lcPhP5-2VZsax399DL2Ruwv1204I3arbAgKEmTcdodDCP9Lkgr-Kq4nsDS0zgNBtnMErK7Dsxw'
        }
    })
}

const remove = (id) => {
    return request.delete(`/invoice-detail/${id}`, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmhxdWFuMTIzIiwiaWF0IjoxNjgyOTQwNzE2LCJleHAiOjE2ODMwMjcxMTZ9.pZC6fftZ3Yi8lcPhP5-2VZsax399DL2Ruwv1204I3arbAgKEmTcdodDCP9Lkgr-Kq4nsDS0zgNBtnMErK7Dsxw'
        }
    })
}

const invoiceDetailService = {
    findAll,
    add,
    remove
}

export default invoiceDetailService;