import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ModalDeleteInvoice from "../../util/invoice/ModalDeleteInvoice";
import "./invoice.css";
import "./media_query.css";
import { useRef } from "react";
import { Field, Form, Formik } from "formik";
import invoiceDetailService from "../../service/invoice/invoiceDetailService";
import invoiceService from "../../service/invoice/invoiceService";
import customerForInvoiceService from "../../service/customer/customerForInvoiceService";
import ReactPaginate from "react-paginate";

function Invoice() {
  const [showModal, setShowModal] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const [invoice, setInvoice] = useState();
  const [customers, setCustomers] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [customerFilter, setCustomerFilter] = useState({
    name: "",
    page: 0,
  });
  const modalContainer = useRef();
  const [deletedObject, setDeletedObject] = useState({
    deletedId: "",
    deletedName: "",
  });
  const [invoiceFilter, setInvoiceFilter] = useState({
    employeeName: "",
    total: 0,
    payment: "",
    bonusPoint: "",
  });
  const [customerCode, setCustomerCode] = useState("");

  const handleTransferCustomerCode = (id,code) => {
    const tr = document.querySelector(`.tr${id}`)
    if (tr.classList.contains("color")) {
      tr.classList.remove("color")
    } else {
      tr.classList.add("color")
    }
    setCustomerCode(code)
  }

  const resetCustomerValue = () => {
    setCustomerCode("")
  }

  const handlePageClick = (event) => {
    setCustomerFilter((prev) => ({ ...prev, page: event.selected }));
  };

  const handleSubmitInvoiceDetail = async (values) => {
    let newValues = {
      ...values,
      productDTO: { code: +values.productDTO },
    };
    try {
      await invoiceDetailService.add(newValues);
      if (values.quantity !== "" && values.productDTO !== "") {
        setSubmitting(true);
      }
      if (isSubmitting) {
        const newIsSubmitting = { ...isSubmitting };
        setSubmitting(newIsSubmitting);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const handleSubmitInvoice = () => {};

  const handleTransferInfo = (deletedObject) => {
    setDeletedObject((prev) => ({ ...prev, ...deletedObject }));
  };

  const handleDelete = async () => {
    try {
      await invoiceDetailService.remove(deletedObject.deletedId);
      const newIsSubmitting = { ...isSubmitting };
      setSubmitting(newIsSubmitting);
    } catch (error) {
      console.warn(error);
    }
  };

  // Tính tổng (total)
  useEffect(() => {
    const calculateTotal = () => {
      let sum = invoiceDetails.reduce((acc, invoiceDetail) => {
        return (
          acc + invoiceDetail.quantity * invoiceDetail.productDTO.sellingPrice
        );
      }, 0);
      if (!isSubmitting) {
        sum = 0;
      }
      setInvoiceFilter((prev) => ({ ...prev, total: sum }));
    };
    calculateTotal();
  }, [isSubmitting, invoiceDetails, invoiceFilter.total]);

  // Lấy mảng
  useEffect(() => {
    const getInvoiceDetails = async () => {
      const invoiceDetailResponse = await invoiceDetailService.findAll();
      setInvoiceDetails(invoiceDetailResponse.data);
    };
    getInvoiceDetails();
  }, [isSubmitting]);

  // Điều chỉnh modal
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        showModal &&
        modalContainer &&
        modalContainer.current &&
        !modalContainer.current.contains(e.target)
      ) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showModal]);

  // Lấy hóa đơn chi tiết
  useEffect(() => {
    const getInvoice = async () => {
      const invoiceResponse = await invoiceService.getDetail();
      setInvoice(invoiceResponse.data);
    };
    getInvoice();
  }, [isSubmitting]);

  // Lấy mảng khách hàng
  useEffect(() => {
    const getCustomers = async () => {
      const customersResponse = await customerForInvoiceService.findCustomer(
        customerFilter
      );
      setCustomers(customersResponse.data.content);
      setPageCount(customersResponse.data.totalPages);
    };
    getCustomers();
  }, [customerFilter]);

  return (
    <>
      <Formik
        initialValues={{
          invoice: {
            employeeName: invoiceFilter.employeeName,
            total: invoiceFilter.total,
            payment: invoiceFilter.payment,
            bonusPoint: invoiceFilter.bonusPoint,
            customerDTO: "",
          },

          invoiceDetail: {
            quantity: "",
            delete: false,
            productDTO: "",
          },
        }}
        onSubmit={(values) => {
          if (values.invoice.payment === "") {
            handleSubmitInvoiceDetail(values.invoiceDetail);
          } else {
            handleSubmitInvoice(values.invoice);
          }
        }}
      >
        <Form name="invoice">
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
                  {isSubmitting ? <span>{invoice.code}</span> : <span></span>}
                </div>
              </div>
              <div className="row mb-3 input-search p-0">
                <div className="d-flex justify-content-between">
                  <label htmlFor="" className="fw-bold">
                    Ngày tháng năm<span className="colon">:</span>{" "}
                  </label>
                  {isSubmitting ? <span>{invoice.date}</span> : <span></span>}
                </div>
              </div>
              <div className="row mb-3 input-search p-0">
                <div className="d-flex justify-content-between">
                  <label htmlFor="customer-code" className="fw-bold">
                    Mã khách hàng<span className="text-danger">*</span>{" "}
                    <span className="colon">:</span>{" "}
                  </label>
                  <Field
                    type="text"
                    className="customer-input input_field me-3"
                    style={{ marginLeft: 8 }}
                    placeholder="Mã khách hàng"
                    id="customer-code"
                    name="invoice.customerDTO"
                    value={customerCode}
                    onChange={() => resetCustomerValue()}
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setShowModal(true)}
                  >
                    <i className="bi bi-search" />{" "}
                    <span className="d-none d-lg-inline">
                      Tra cứu khách hàng
                    </span>
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
                    <Field
                      type="text"
                      className="col-6 col-lg-8 input_field me-3"
                      placeholder="Mã hàng"
                      id="product-code"
                      name="invoiceDetail.productDTO"
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
                    <Field
                      type="number"
                      className="col-6 col-lg-8 input_field me-3"
                      placeholder="Số lượng"
                      id="product-quantity"
                      name="invoiceDetail.quantity"
                    />
                  </div>
                  <div className="row">
                    <div className="col-6" />
                    <div className="col-6">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ marginLeft: 3 }}
                      >
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
                        {/* <th>Size</th> */}
                        <th>Đơn giá</th>
                        <th>Tổng</th>
                        <th>Xóa</th>
                      </tr>
                    </thead>
                    {isSubmitting ? (
                      <tbody>
                        {invoiceDetails.map((invoiceDetail, index) => (
                          <tr key={invoiceDetail.id}>
                            <td>{++index}</td>
                            <td>{invoiceDetail.productDTO.code}</td>
                            <td>{invoiceDetail.productDTO.name}</td>
                            <td>{invoiceDetail.quantity}</td>
                            {/* <td>
                                      {invoiceDetail.productDTO.productSizes.map(
                                        (productSize) => productSize.name
                                      )}
                                    </td> */}
                            <td>
                              {invoiceDetail.productDTO.sellingPrice.toLocaleString(
                                "vi-VN",
                                { style: "currency", currency: "VND" }
                              )}
                            </td>
                            <td>
                              {invoiceDetail.total.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-outline-danger"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() =>
                                  handleTransferInfo({
                                    deletedId: invoiceDetail.id,
                                    deletedName: invoiceDetail.productDTO.name,
                                  })
                                }
                              >
                                <i className="bi bi-trash-fill" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <tbody></tbody>
                    )}
                  </table>
                </div>
              </div>
              {/* </Form>
              </Formik> */}

              <div className="mb-3 payment-info" style={{ width: "96%" }}>
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">Tổng: </span>
                  <span>
                    {invoiceFilter.total.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
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
                <button type="submit" className="btn btn-outline-primary">
                  <i className="bi bi-printer-fill" /> In hóa đơn
                </button>
                <button className="btn btn-outline-secondary">Hủy</button>
              </div>
            </div>
          </div>
        </Form>
      </Formik>

      {/* modal-customer-search */}
      {showModal && (
        <div className="modal-custom">
          <div
            className="modal-container"
            style={{ width: "50%" }}
            ref={modalContainer}
          >
            <div className="modal-close" onClick={() => setShowModal(false)}>
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
                    <div className="d-flex justify-content-between">
                      <Formik
                        initialValues={{
                          name: customerFilter.name,
                        }}
                        onSubmit={(values) => {
                          setCustomerFilter((prev) => {
                            return { ...prev, ...values, page: 0 };
                          });
                        }}
                      >
                        <Form>
                          <div className="mb-3 input-search d-flex justify-content-between">
                            <Field
                              type="text"
                              className="customer-info-input input_field"
                              placeholder="Nhập mã KH, tên KH hoặc SĐT"
                              name="name"
                            />
                            <div>
                              <button
                                type="submit"
                                className="btn btn-outline-primary me-2"
                              >
                                <i className="bi bi-search" />
                              </button>
                            </div>
                          </div>
                        </Form>
                      </Formik>

                      <button
                        className="btn btn-primary"
                        style={{ height: "39px"}}
                        onClick={() => setShowModal(false)}
                      >
                        Chọn
                      </button>
                    </div>

                    <div className="mb-3">
                      <div className="table-responsive p-0">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>STT</th>
                              <th>Mã khách hàng</th>
                              <th>Tên khách hàng</th>
                              <th>Số điện thoại</th>
                            </tr>
                          </thead>
                          <tbody>
                            {customers.map((customer, index) => (
                              <tr className={`tr${customer.id}`} key={index} onClick={() => handleTransferCustomerCode(customer.id,customer.code)}>
                                <td>{++index}</td>
                                <td>{customer.code}</td>
                                <td>{customer.name}</td>
                                <td>{customer.phoneNumber}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div />
                    <div className="d-grid">
                      <ReactPaginate
                        breakLabel="..."
                        nextLabel="Sau"
                        onPageChange={handlePageClick}
                        pageCount={pageCount}
                        previousLabel="Trước"
                        containerClassName="pagination"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        activeClassName="active"
                        disabledClassName="d-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ModalDeleteInvoice
        deletedName={deletedObject.deletedName}
        onCompletedDelete={handleDelete}
      />
    </>
  );
}

export default Invoice;
