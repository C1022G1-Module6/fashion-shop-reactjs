import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ModalDeleteInvoice from "../../util/invoice/ModalDeleteInvoice";
import styles from "./invoice.module.css";
import "./media_query.css";
import { useRef } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import invoiceDetailService from "../../service/invoice/invoiceDetailService";
import invoiceService from "../../service/invoice/invoiceService";
import customerForInvoiceService from "../../service/customer/customerForInvoiceService";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import InvoicePDF from "./InvoicePDF";
import { useReactToPrint } from "react-to-print";
import * as Yup from "yup";

function Invoice() {
  const [showModal, setShowModal] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const [invoice, setInvoice] = useState();
  const [customers, setCustomers] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [customerCode, setCustomerCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [customerFilter, setCustomerFilter] = useState({
    name: "",
    page: 0,
  });
  const [deletedObject, setDeletedObject] = useState({
    deletedId: "",
    deletedName: "",
  });
  const [invoiceFilter, setInvoiceFilter] = useState({
    employeeName: "",
    total: 0,
    payment: 0,
  });
  const [filename, setFileName] = useState("");

  const modalContainer = useRef();
  const componentBRef = useRef(null);
  const swalWithBootstrapButtons = Swal.mixin({});

  const getFileNameWithoutExtension = (file) => {
    const fileNameWithoutExtension = file.substring(0, file.lastIndexOf("."));
    return fileNameWithoutExtension;
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileName = selectedFile.name;
      const file = getFileNameWithoutExtension(fileName);
      if (fileName.endsWith(".png")) {
        setFileName(file);
      } else {
        console.log("Please select a PNG file");
      }
    }
  };

  const setProductValue = (e) => {
    setFileName(e.target.value);
  };

  const resetValue = () => {
    setInvoiceDetails([]);
    setInvoice({});
    setCustomerCode("");
    setDiscount(0);
    setFileName("");
  };

  const handlePrint = useReactToPrint({
    content: () => componentBRef.current,
    pageStyle: "@page { size: A4; margin: 0; }",
  });

  const handleTransferCustomerCode = (id, code) => {
    const tr = document.querySelector(`.tr${id}`);
    if (tr.classList.contains("color")) {
      tr.classList.remove("color");
      setCustomerCode("");
      setDiscount(0);
    } else {
      tr.classList.add("color");
      setCustomerCode(code);
    }
  };

  const resetCustomerValue = (e) => {
    setCustomerCode(e.target.value);
  };

  const handlePageClick = (event) => {
    setCustomerFilter((prev) => ({ ...prev, page: event.selected }));
  };

  const handleTransferInfoToModal = () => {
    let newValues = {
      ...invoice,
      total: invoiceFilter.total,
      discount: discount,
      payment: invoiceFilter.payment,
      customerDTO: { code: customerCode },
    };
    setInvoice(newValues);
  };

  const handleResetInvoice = () => {
    invoiceService.remove();
    resetValue();
  };

  const handleSubmitInvoiceDetail = async (values) => {
    debugger
    let newValues = {
      ...values,
      productDTO: { code: filename },
    };
    try {
      await invoiceDetailService.add(newValues);
      if (values.quantity !== "") {
        setSubmitting(true);
      }
      if (isSubmitting) {
        const newIsSubmitting = { ...isSubmitting };
        setSubmitting(newIsSubmitting);
      }
    } catch (error) {
      const errorQuantity = document.getElementById("error-quantity");
      errorQuantity.style.display = "block";
      console.warn(error);
    }
  };

  const handleSubmitInvoice = async () => {
    try {
      await invoiceService.update(invoice);
      handlePrint();
      Swal.fire({
        icon: "success",
        title: "In thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      resetValue();
    } catch (error) {
      swalWithBootstrapButtons.fire("Hủy", "Lỗi in :)", "error");
      console.warn(error);
    }
  };

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
  }, [isSubmitting, invoiceDetails]);

  // Tính tiền (payment)
  useEffect(() => {
    if (customerCode !== "") {
      setDiscount(customers[0].customerTypeDTO.discount);
    }
    const calculatePayment = () => {
      setInvoiceFilter((prev) => ({
        ...prev,
        payment: invoiceFilter.total - discount,
      }));
    };
    calculatePayment();
  }, [discount, customerCode, invoiceFilter.total]);

  // Lấy mảng hóa đơn chi tiết
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

  // Lấy hóa đơn
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

  // Lấy giá trị của mã KH sau khi chọn
  useEffect(() => {
    setCustomerFilter((prev) => ({
      ...prev,
      name: setCustomerCode(customerCode),
    }));
  }, [customerCode]);

  return (
    <>
      {/* {console.log("abc")} */}
      <Formik
        initialValues={{
          invoiceDetail: {
            quantity: "",
            delete: false,
            productDTO: "",
          },
        }}
        // validationSchema={Yup.object({
        //   customerCode: Yup.string().required("Trường này yêu cầu nhập"),
        //   productDTO: Yup.string().required("Trường này yêu cầu nhập"),
        //   quantity: Yup.string()
        //     .required("Trường này yêu cầu nhập")
        //     .matches("^[1-9][\\d]*$", "Số lượng sách phải là số nguyên dương"),
        // })}
        onSubmit={(values) => {
          handleSubmitInvoiceDetail(values.invoiceDetail);
        }}
      >
        <Form>
          <div className={`${styles.wrapper} container col-12 col-md-10 col-lg-8 col-xxl-6`}>
            <div className={`${styles.content} row`}>
              <div className="mb-3 text-center row">
                <h2 className={styles.heading}>THANH TOÁN</h2>
              </div>
              <div className= {`${styles['input-search']} row mb-3 p-0`}>
                <div className="d-flex justify-content-between">
                  <label htmlFor="" className="fw-bold">
                    Mã hóa đơn<span className={styles.colon}>:</span>
                  </label>
                  {isSubmitting ? <span>{invoice.code}</span> : <span></span>}
                </div>
              </div>
              <div className={`${styles['input-search']}row mb-3 p-0`}>
                <div className="d-flex justify-content-between">
                  <label htmlFor="" className="fw-bold">
                    Ngày tháng năm<span className={styles.colon}>:</span>{" "}
                  </label>
                  {isSubmitting ? <span>{invoice.date}</span> : <span></span>}
                </div>
              </div>
              <div className={`${styles['input-search']} row p-0`}>
                <div className="d-flex justify-content-between">
                  <label htmlFor="customer-code" className="fw-bold">
                    Mã khách hàng<span className="text-danger">*</span>{" "}
                    <span className={styles.colon}>:</span>{" "}
                  </label>
                  <Field
                    type="text"
                    className={`${styles['customer-input']} ${styles['input_field']} me-3`}
                    style={{ marginLeft: 8 }}
                    placeholder="Mã khách hàng"
                    id="customer-code"
                    name="customerCode"
                    value={customerCode}
                    onChange={(e) => resetCustomerValue(e)}
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
              <ErrorMessage
                component="div"
                className="text-danger d-flex justify-content-center"
                name="customerCode"
              />
              <div className="row">
                <fieldset className="border border-secondary p-2 mb-3 w-100">
                  <legend className="float-none w-auto p-2 fs-5 fw-bold">
                    Thông tin hàng hóa<span className={styles.colon}>:</span>
                  </legend>
                  <div className={`row mb-3 ${styles['input-search']}`}>
                    <label
                      htmlFor="product-code"
                      className="col-4 col-lg-3 fw-bold"
                    >
                      Mã hàng<span className="text-danger">*</span>{" "}
                      <span className={styles.colon}>:</span>{" "}
                    </label>
                    <Field
                      type="text"
                      className={`${styles['input_field']} col-6 col-lg-8 me-3`}
                      placeholder="Mã hàng"
                      id="product-code"
                      name="invoiceDetail.productDTO"
                      value={filename}
                      onChange={(e) => setProductValue(e)}
                    />
                    <ErrorMessage
                      component="div"
                      className="text-danger"
                      name="productDTO"
                    />
                  </div>
                  <div className={`row mb-3 ${styles['input-search']}`}>
                    <label
                      htmlFor="product-quantity"
                      className="col-4 col-lg-3 fw-bold"
                    >
                      Số lượng<span className="text-danger">*</span>{" "}
                      <span className={styles.colon}>:</span>{" "}
                      <span
                        id="error-quantity"
                        className="text-danger"
                        style={{ display: "none" }}
                      >
                        Mặt hàng này hiện số lượng không đủ yêu cầu của khách
                        hàng
                      </span>
                    </label>
                    <Field
                      type="number"
                      className={`${styles['input_field']} col-6 col-lg-8 me-3`}
                      placeholder="Số lượng"
                      id="product-quantity"
                      name="invoiceDetail.quantity"
                    />
                    <ErrorMessage
                      component="div"
                      className="text-danger"
                      name="quantity"
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

              <div className={`${styles['payment-info']} mb-3`} style={{ width: "96%" }}>
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
                  <span>
                    {discount?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="fw-bold fs-5">Thành tiền: </span>
                  <span className="fw-bold fs-5">
                    {invoiceFilter.payment.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
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
                  <input
                    type="file"
                    id="qr-file"
                    className="d-none"
                    onChange={handleFileSelect}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-outline-primary button"
                  style={{ backgroundColor: "none" }}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal1"
                  onClick={() => handleTransferInfoToModal()}
                >
                  <i className="bi bi-printer-fill" /> In hóa đơn
                </button>
                <button
                  type="button"
                  onClick={() => handleResetInvoice()}
                  className="btn btn-outline-secondary"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </Form>
      </Formik>

      {/* modal-customer-search */}
      {showModal && (
        <div className={styles['modal-custom']}>
          <div
            className={styles['modal-container']}
            style={{ width: "50%" }}
            ref={modalContainer}
          >
            <div className={styles['modal-close']} onClick={() => setShowModal(false)}>
              <i className="bi bi-x-lg"></i>
            </div>
            <div className="text-center">
              <h2 className={styles.heading} style={{ margin: 0 }}>
                TRA CỨU KHÁCH HÀNG
              </h2>
            </div>
            <div className={styles['modal-body']}>
              <div className="container" style={{ boxShadow: "none" }}>
                <div className={`${styles.content} row`}>
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
                          <div className={`${styles['input-search']} mb-3 d-flex justify-content-between`}>
                            <Field
                              type="text"
                              className={`${styles['customer-info-input']} ${styles['input_field']}`}
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
                        style={{ height: "39px" }}
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
                              <tr
                                className={`tr${customer.id}`}
                                key={index}
                                onClick={() =>
                                  handleTransferCustomerCode(
                                    customer.id,
                                    customer.code
                                  )
                                }
                              >
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
                        containerClassName={styles.pagination}
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

      {/* {modal-print} */}
      <div className="modal fade" id="exampleModal1">
        <div className="modal-dialog" style={{ maxWidth: "800px" }}>
          <div className="modal-content">
            <div className="modal-body p-0">
              <div ref={componentBRef}>
                <InvoicePDF invoice={invoice} invoiceDetails={invoiceDetails} />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <div>
                <button
                  className="btn btn-outline-primary"
                  data-bs-dismiss="modal"
                  onClick={() => handleSubmitInvoice()}
                >
                  Xác nhận in hóa đơn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Invoice;
