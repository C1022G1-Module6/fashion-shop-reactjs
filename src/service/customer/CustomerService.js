import request from "../../request";
import React from "react";

export const search = (name,page)=>{
    try {
        return request.get(`/api/customer?searchCode=${name}&searchName=${name}&searchPhoneNumber=${name}&page=${page ? page : '0'}`)
    } catch (error) {
        console.log(error);
    }
}


const deleteCustomer = (id) => {
    try {
        return request.delete(`/api/customer?id=${id}`).data
    }catch (e) {
        console.log(e)
    }
}

const customerService = {
    search,
    deleteCustomer
}

export default customerService;
// <div
//     className="d-flex justify-content-center"
//     style={{marginTop: 18}}
// >
//     <nav aria-label="Page navigation example">
//         <ul className="pagination">
//             <li className="page-item">
//                 <a className="page-link" href="#">
//                     Trước
//                 </a>
//             </li>
//             <li className="page-item">
//                 <a className="page-link" href="#">
//                     1
//                 </a>
//             </li>
//             <li className="page-item active">
//                 <a className="page-link" href="#">
//                     2
//                 </a>
//             </li>
//             <li className="page-item">
//                 <a className="page-link" href="#">
//                     3
//                 </a>
//             </li>
//             <li className="page-item">
//                 <a className="page-link" href="#">
//                     Sau
//                 </a>
//             </li>
//         </ul>
//     </nav>
// </div>
// {/*Modal xoá*/}
// <div
//     className="modal fade"
//     id="deleteCustomer"
//     tabIndex="{-1}"
//     aria-labelledby="exampleModalLabel"
//     aria-hidden="true"
// >
//     <div className="modal-dialog">
//         <div className="modal-content">
//             <div className="modal-header">
//                 <h1 className="modal-title fs-5" id="exampleModalLabel">
//                     Xóa Khách Hàng
//                 </h1>
//                 <button
//                     type="button"
//                     className="btn-close"
//                     data-bs-dismiss="modal"
//                     aria-label="Close"
//                 />
//             </div>
//             <div className="modal-body">
//                 Bạn có chắc chắn muốn xóa khách hàng
//                 <span className="text-danger fw-bold">Trần Bá Tài</span> không?
//             </div>
//             <div className="modal-footer">
//                 <button
//                     type="button"
//                     className="btn btn-secondary"
//                     data-bs-dismiss="modal"
//                 >
//                     Hủy
//                 </button>
//                 <button className="btn btn-primary" data-bs-dismiss="modal">
//                     Xóa
//                 </button>
//             </div>
//         </div>
//     </div>
// </div>