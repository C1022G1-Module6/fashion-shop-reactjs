import Swal from "sweetalert2";
import customerService from "../../service/customer/customerService";
import React from "react";

export default function CustomerDelete(props) {
    const handleDelete = async (id) => {
        try {
            await customerService.deleteCustomer(id)
            Swal.fire({
                icon: 'success',
                title: 'Xóa thành công',
                showConfirmButton: false,
                timer: 1500
            })
            props.showList();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Xóa thất bại',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    return (
        <>
            <div
                className="modal"
                id="deleteCustomer"
                tabindex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="row mx-0">
                    <div className="col-3"></div>
                <div className="modal-dialog col-9 w-100 mt-5 pt-5">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Xóa Khách Hàng
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            Bạn có chắc chắn muốn xóa khách hàng <span
                            className="text-danger fw-bold">{props.name}
                        </span> không?
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Hủy
                            </button>
                            <button onClick={() => handleDelete(props.id)} type="button" className="btn btn-danger"
                                    data-bs-dismiss="modal">
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
                </div>
                
            </div>
        </>
    )
}