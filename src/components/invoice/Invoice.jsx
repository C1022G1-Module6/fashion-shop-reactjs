import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ModalDeleteInvoice from "../../util/invoice/ModalDeleteInvoice";
import "./invoice.css";
import "./media_query.css";

function Invoice() {
  const [modal, setModal] = useState();
  const [modalContainer, setModalContainer] = useState();

  const showCustomerSearch = () => {
    modal.style.display = "flex";
  };

  const hideCustomerSearch = () => {
    debugger;
    modal.style.display = "none";
  };

  if (modal) {
    modal.addEventListener("click", hideCustomerSearch);
    modalContainer.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }

  useEffect(() => {
    setModal(document.querySelector(".modal-custom"));
    setModalContainer(document.querySelector(".modal-container"));
  }, [modal, modalContainer]);

  return (
    <>
      <div className="container col-12 col-md-10 col-lg-8 col-xxl-6">
        <div className="content row">
          <div className="mb-3 text-center row">
            <h2 className="heading">THANH TOÁN</h2>
          </div>
          <div className="row mb-3 input-search p-0">
            <div className="d-flex justify-content-between">
              <label htmlFor="" className="fw-bold">
                Mã hóa đơn<span className="colon">:</span>
              </label>
              <span>HD100001</span>
            </div>
          </div>
          <div className="row mb-3 input-search p-0">
            <div className="d-flex justify-content-between">
              <label htmlFor="" className="fw-bold">
                Ngày tháng năm<span className="colon">:</span>{" "}
              </label>
              <span>26/07/1998</span>
            </div>
          </div>
          <div className="row mb-3 input-search p-0">
            <div className="d-flex justify-content-between">
              <label htmlFor="customer-code" className="fw-bold">
                Mã khách hàng<span className="text-danger">*</span>{" "}
                <span className="colon">:</span>{" "}
              </label>
              <input
                type="text"
                className="customer-input input_field me-3"
                style={{ marginLeft: 8 }}
                placeholder="Mã khách hàng"
                id="customer-code"
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={showCustomerSearch}
              >
                <i className="bi bi-search" />{" "}
                <span className="d-none d-lg-inline">Tra cứu khách hàng</span>
              </button>
            </div>
          </div>
          <div className="row">
            <fieldset className="border border-secondary p-2 mb-3 w-100">
              <legend className="float-none w-auto p-2 fs-5 fw-bold">
                Thông tin hàng hóa<span className="colon">:</span>
              </legend>
              <div className="row mb-3 input-search">
                <label
                  htmlFor="product-code"
                  className="col-4 col-lg-3 fw-bold"
                >
                  Mã hàng<span className="text-danger">*</span>{" "}
                  <span className="colon">:</span>{" "}
                </label>
                <input
                  type="text"
                  className="col-6 col-lg-8 input_field me-3"
                  placeholder="Mã hàng"
                  id="product-code"
                />
              </div>
              <div className="row mb-3 input-search">
                <label
                  htmlFor="product-quantity"
                  className="col-4 col-lg-3 fw-bold"
                >
                  Số lượng<span className="text-danger">*</span>{" "}
                  <span className="colon">:</span>{" "}
                </label>
                <input
                  type="number"
                  className="col-6 col-lg-8 input_field me-3"
                  placeholder="Số lượng"
                  id="product-quantity"
                />
              </div>
              <div className="row">
                <div className="col-6" />
                <div className="col-6">
                  <button className="btn btn-primary" style={{ marginLeft: 3 }}>
                    Nhập
                  </button>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="mb-3 row">
            <div className="table-responsive p-0">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Mã hàng</th>
                    <th>Tên hàng</th>
                    <th>Số lượng</th>
                    <th>Size</th>
                    <th>Đơn giá</th>
                    <th>Tổng</th>
                    <th>Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>01</td>
                    <td>H001</td>
                    <td>Quần bò</td>
                    <td>01</td>
                    <td>32</td>
                    <td>200.000</td>
                    <td>200.000</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <i className="bi bi-trash-fill" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mb-3 payment-info" style={{ width: "96%" }}>
            <div className="d-flex justify-content-between">
              <span className="fw-bold">Tổng: </span>
              <span>200.000đ</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="fw-bold">Giảm giá: </span>
              <span>50.000đ</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="fw-bold fs-5">Thành tiền: </span>
              <span className="fw-bold fs-5">150.000đ</span>
            </div>
          </div>
          <div
            className="d-flex justify-content-between"
            style={{ width: "96%" }}
          >
            <div className="qr-image">
              <label htmlFor="qr-file" style={{ width: 45 }}>
                <img
                  src="./img/tải xuống.png"
                  alt="Avatar"
                  width="100%"
                  style={{ cursor: "pointer" }}
                />
              </label>
              <input type="file" id="qr-file" className="d-none" />
            </div>
            <button className="btn btn-outline-primary">
              <i className="bi bi-printer-fill" /> In hóa đơn
            </button>
            <button className="btn btn-outline-secondary">Hủy</button>
          </div>
        </div>
      </div>
      <div className="modal-custom">
        <div className="modal-container" style={{ width: "50%" }}>
          <div className="modal-close" onClick={hideCustomerSearch}>
            <i className="bi bi-x-lg"></i>
          </div>
          <div className="text-center">
            <h2 className="heading" style={{ margin: 0 }}>
              TRA CỨU KHÁCH HÀNG
            </h2>
          </div>
          <div className="modal-body">
            <div className="container" style={{ boxShadow: "none" }}>
              <div className="content row">
                <div className="col-12">
                  <div className="mb-3 input-search d-flex justify-content-between">
                    <input
                      type="text"
                      className="customer-info-input input_field"
                      placeholder="Nhập mã KH, tên KH hoặc SĐT"
                    />
                    <div>
                      <button className="btn btn-outline-primary me-2">
                        <i className="bi bi-search" />
                      </button>
                      <button className="btn btn-primary">Chọn</button>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="table-responsive p-0">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Mã khách hàng</th>
                            <th>Tên khách hàng</th>
                            <th>Số điện thoại</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="tr1">
                            <td>01</td>
                            <td>231</td>
                            <td>Nguyễn Văn A</td>
                            <td>0905889885</td>
                          </tr>
                          <tr>
                            <td>02</td>
                            <td>232</td>
                            <td>Nguyễn Văn B</td>
                            <td>0905161858</td>
                          </tr>
                          <tr>
                            <td>03</td>
                            <td>233</td>
                            <td>Nguyễn Văn C</td>
                            <td>0932591241</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="text" />
                  <div>
                    <nav
                      aria-label="Page navigation example"
                      className="d-flex justify-content-center"
                    >
                      <ul className="pagination">
                        <li className="page-item">
                          <a className="page-link" href="#">
                            <i className="bi bi-chevron-left" />
                          </a>
                        </li>
                        <li className="page-item active">
                          <a className="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            <i className="bi bi-chevron-right" />
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalDeleteInvoice />
    </>
  );
}

export default Invoice;
