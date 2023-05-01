import request from "../../request"

const findAll = () => {
    return request.get(`/invoice`, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmhxdWFuMTIzIiwiaWF0IjoxNjgyOTQwNzE2LCJleHAiOjE2ODMwMjcxMTZ9.pZC6fftZ3Yi8lcPhP5-2VZsax399DL2Ruwv1204I3arbAgKEmTcdodDCP9Lkgr-Kq4nsDS0zgNBtnMErK7Dsxw'
        }
    });
};

const update = (invoice) => {
    return request.put(`/invoice`, { ...invoice }, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmhxdWFuMTIzIiwiaWF0IjoxNjgyOTQwNzE2LCJleHAiOjE2ODMwMjcxMTZ9.pZC6fftZ3Yi8lcPhP5-2VZsax399DL2Ruwv1204I3arbAgKEmTcdodDCP9Lkgr-Kq4nsDS0zgNBtnMErK7Dsxw'
        }
    })
};

const getDetail = () => {
    return request.get(`/invoice/detail`, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmhxdWFuMTIzIiwiaWF0IjoxNjgyOTQwNzE2LCJleHAiOjE2ODMwMjcxMTZ9.pZC6fftZ3Yi8lcPhP5-2VZsax399DL2Ruwv1204I3arbAgKEmTcdodDCP9Lkgr-Kq4nsDS0zgNBtnMErK7Dsxw'
        }
    })
}

const remove = () => {
    return request.delete(`/invoice`, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmhxdWFuMTIzIiwiaWF0IjoxNjgyOTQwNzE2LCJleHAiOjE2ODMwMjcxMTZ9.pZC6fftZ3Yi8lcPhP5-2VZsax399DL2Ruwv1204I3arbAgKEmTcdodDCP9Lkgr-Kq4nsDS0zgNBtnMErK7Dsxw'
        }
    })
}

const invoiceService = {
    findAll,
    update,
    getDetail,
    remove
};

export default invoiceService;