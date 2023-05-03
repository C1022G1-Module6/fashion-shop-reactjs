import React from "react";

function ModalDeleteInvoice(props) {
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="row">
          <div className="col-3"></div>
        <div className="modal-dialog col-9">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Xóa sản phẩm
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="bi bi-x-lg text-white" />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-body">
                Bạn có chắc muốn xóa sản phẩm{" "}
                <span className="text-danger">{props.deletedName}</span>?
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Thoát
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                data-bs-dismiss="modal"
                onClick={() => props.onCompletedDelete()}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default ModalDeleteInvoice;
