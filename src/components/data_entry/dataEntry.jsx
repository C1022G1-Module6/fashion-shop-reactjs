import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import dataEntryProductService from "../../service/data_entry/dataEntryProductService";
import dataEntryService from "../../service/data_entry/dataEntryService";
import ModalDeleteInvoice from "../../util/invoice/ModalDeleteInvoice";
import Swal from "sweetalert2";
import styles from "./dataEntry.module.css";
import productSizeService from "../../service/product/productSizeService";
import productService from "../../service/product/productService";
import ReactPaginate from "react-paginate";
import * as Yup from "yup";

function DataEntry() {
  const [dataEntryProducts, setDataEntryProducts] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const [dataEntry, setDataEntry] = useState();
  const [flag, setFlag] = useState(false);
  const [hideModal, setHideModal] = useState(false);
  const [productCode, setProductCode] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [pageProductCount, setProductPageCount] = useState(0);
  const [productSizes, setProductSizes] = useState([]);
  const [products, setProducts] = useState([]);
  const [productFilter, setProductFilter] = useState({
    name: "",
    page: 0,
  });
  const [deletedObject, setDeletedObject] = useState({
    deletedId: "",
    deletedName: "",
  });
  const employeeName = localStorage.getItem("name");

  const cancel = async () => {
    dataEntryService.remove();
    resetValues();
  };
  const setValueOfProductCode = (e) => {
    console.log(e.target.value);
    setProductCode(e.target.value);
  };
  const setValueOfProductQuantity = (e) => {
    setProductQuantity(e.target.value);
  };
  const handleTransferInfo = (deletedObject) => {
    setDeletedObject((prev) => ({ ...prev, ...deletedObject }));
  };

  const handleTransferProductCode = (id, code) => {
    const tr = document.querySelector(`.tr${id}`);
    if (tr.classList.contains(styles.color)) {
      tr.classList.remove(styles.color);
      setProductCode("");
    } else {
      tr.classList.add(styles.color);
      setProductCode(code);
    }
  };

  const handleDelete = async () => {
    try {
      await dataEntryProductService.remove(deletedObject.deletedId);
      const newIsSubmitting = { ...isSubmitting };
      setSubmitting(newIsSubmitting);
    } catch (error) {
      console.warn(error);
    }
  };

  const swalWithBootstrapButtons = Swal.mixin({});

  const resetValues = () => {
    setDataEntry({});
    setDataEntryProducts([]);
    setProductCode("");
    setProductQuantity("");
  };

  const handleChangeFlag = () => {
    setFlag(true);
  };

  const handleSubmitDataEntryProduct = async (values) => {
    let newValues = {
      ...values,
      quantity: +productQuantity,
      productDTO: { code: productCode },
    };
    try {
      await dataEntryProductService.add(newValues);
      if (values.quantity >= 0) {
        setSubmitting(true);
      }
      if (isSubmitting) {
        const newIsSubmitting = { ...isSubmitting };
        setSubmitting(newIsSubmitting);
      }
    } catch (error) {
      console.log(error.response.data);
      const err = error.response.data;
      if (err === "Không có mặt hàng này trong kho") {
        document.getElementById("codeErr").innerHTML = "Không có mã hàng này";
      } else if(err === "Không được để trống"){
        document.getElementById("codeErr").innerHTML = "Không được để trống"
      }else {
        document.getElementById("codeErr").innerHTML = "";
      }
      if (err.message === "Không được bỏ trống") {
        document.getElementById("quantityErr").innerHTML =
          "Không được bỏ trống";
      } else if (err.quantity === "Số lượng là số nguyên dương") {
        document.getElementById("quantityErr").innerHTML =
          "Số lượng là số nguyên dương";
      } else if (err.quantity === "Chỉ được nhập tối đa 1000 sản phẩm") {
        document.getElementById("quantityErr").innerHTML =
          "Chỉ được nhập tối đa 1000 sản phẩm";
      } else {
        document.getElementById("quantityErr").innerHTML = "";
      }
      if (err.size === "Không được để trống") {
        document.getElementById("size-err").innerHTML = "Không được bỏ trống";
      }else{
        document.getElementById("size-err").innerHTML = ""
      }
    }
  };

  const handlePageProductClick = (event) => {
    setProductFilter((prev) => ({ ...prev, page: event.selected }));
  };

  const handleSubmitDataEntry = async (values) => {
    console.log(values);
    const newValues = {
      ...values,
      employeeName: employeeName,
    };
    try {
      if (productCode === "" && productQuantity === "") {
        swalWithBootstrapButtons.fire("Hủy", "Lỗi nhập liệu :)", "error");
        setFlag(false);
      } else {
        await dataEntryService.update(newValues);
        Swal.fire({
          icon: "success",
          title: "Nhập liệu thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        resetValues();
        setFlag(false);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    const getDataEntryProducts = async () => {
      try {
        const dataEntryProductResponse =
          await dataEntryProductService.findAll();
        setDataEntryProducts(dataEntryProductResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDataEntryProducts();
  }, [isSubmitting]);

  useEffect(() => {
    const getDataEntry = async () => {
      try {
        const dataEntryResponse = await dataEntryService.getDetail();
        setDataEntry(dataEntryResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDataEntry();
  }, [isSubmitting]);

  useEffect(() => {
    const getProductSizes = async () => {
      const productSizesResponse = await productSizeService.findAllSize();
      setProductSizes(productSizesResponse.data);
    };
    getProductSizes();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        if (hideModal) {
          setProductFilter({
            name: "",
            page: 0,
          });
        }
        const productsResponse = await productService.findByName(productFilter);
        setProducts(productsResponse.data.content);
        setProductPageCount(productsResponse.data.totalPages);
      } catch (error) {
        console.warn(error);
      }
    };
    getProducts();
  }, [hideModal, productFilter]);

  useEffect(() => {
    document.title = "Nhập liệu";
  }, []);

  return (
    <div className={styles.body}>
      <Formik
        initialValues={{
          dataEntryProduct: {
            quantity: "",
            delete: false,
            productDTO: "",
            size: '',
          },
          dataEntry: {
            employeeName: "",
          },
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          if (!flag) {
            handleSubmitDataEntryProduct(values.dataEntryProduct);
            resetForm();
          } else {
            handleSubmitDataEntry(values.dataEntry);
            resetForm();
          }
        }}
      >
        <Form className="mt-5">
          <div className="row mx-0">
            <div className="col-3"></div>
            <div
              className={`${styles.wrapper} container mt-5 col-9 col-md-10 col-lg-8 col-xxl-6`}
            >
              <div className={`${styles.content} row `}>
                <div className="mb-3 text-center row">
                  <h2 className={styles.heading}>NHẬP LIỆU</h2>
                </div>
                <div className="row mb-3 p-0">
                  <div className="col-5">
                    <label htmlFor="" className="fw-bold">
                      Mã phiếu nhập <span className={styles.colon}>:</span>
                    </label>
                    {isSubmitting ? (
                      <span> {dataEntry?.code}</span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div className="col-2" />
                  <div className="col-5">
                    <label htmlFor="" className="fw-bold">
                      Ngày tháng năm <span className={styles.colon}>:</span>{" "}
                    </label>
                    {isSubmitting ? (
                      <span> {dataEntry?.date}</span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <fieldset className="border border-secondary p-2 mb-3 w-100">
                    <legend className="float-none w-auto p-2 fs-5 fw-bold">
                      Thông tin nhập liệu<span className={styles.colon}>:</span>
                    </legend>
                    <div className={`row ${styles["input-search"]}`}>
                      <label
                        htmlFor="product-code"
                        className="col-4 col-lg-3 fw-bold"
                      >
                        Mã hàng<span className="text-danger">*</span>{" "}
                        <span className={styles.colon}>:</span>{" "}
                      </label>
                      <div className="col-6 col-lg-8 px-0">
                        <div className="d-inline">
                          <Field
                            type="text"
                            className={`${styles["customer-input"]} ${styles["input_field"]} mx-0`}
                            style={{ marginLeft: 8, width: "55%" }}
                            id="product-code"
                            name="productDTO"
                            value={productCode}
                            onChange={(e) => setValueOfProductCode(e)}
                          />
                          
                        </div>

                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal2"
                          style={{
                            width: "40%",
                            marginLeft: "22px",
                            marginBottom: "6px",
                          }}
                        >
                          <i className="bi bi-search" />{" "}
                          <span className="d-none d-xl-inline">
                            Tra cứu hàng hóa
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                    <span id="codeErr" className="text-danger"></span>
                    </div>
                    <div className={`${styles["input-search"]} row mb-3`}>
                      <label
                        htmlFor="product-quantity"
                        className="col-4 col-lg-3 fw-bold"
                      >
                        Số lượng<span className="text-danger">*</span>{" "}
                        <span className="colon">:</span>{" "}
                      </label>
                      <Field
                        type="number"
                        className={`${styles["input_field"]} col-6 col-lg-8 me-3`}
                        placeholder="Số lượng"
                        id="productuantity"
                        name="dataEntryProduct.quantity"
                        value={productQuantity}
                        onChange={(e) => setValueOfProductQuantity(e)}
                      />

                      <div
                        id="quantityErr"
                        className="text-danger text-center"
                      ></div>
                    </div>
                    <div className={`row mt-3 ${styles["input-search"]}`}>
                      <label
                        htmlFor="product-code"
                        className="col-4 col-lg-3 fw-bold"
                      >
                        Size<span className="text-danger">*</span>{" "}
                        <span className={styles.colon}>:</span>{" "}
                      </label>
                      <Field
                        as="select"
                        className={`${styles["input_field"]} col-6 col-lg-8 me-3`}
                        name="dataEntryProduct.size"
                      >
                        <option value={''}>--- Hãy chọn size ---</option>
                        {productSizes.map((productSize, index) => (
                          <option value={productSize.id} key={index}>
                            {productSize.name}
                          </option>
                        ))}
                      </Field>
                      <div className="d-flex justify-content-center">
                        <span  id="size-err" className="text-danger"></span>
                      </div>
                    </div>
                    <div
                      className="row d-flex
                     justify-content-center"
                    >
                      <button
                        type="submit"
                        className="btn btn-outline-primary mt-3"
                        style={{ width: "150px" }}
                      >
                        Ghi thông tin
                      </button>
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
                          <th>Xóa</th>
                        </tr>
                      </thead>
                      {isSubmitting ? (
                        <tbody>
                          {dataEntryProducts.map((dataEntryProduct, index) => (
                            <tr key={dataEntryProduct.id}>
                              <td>{++index}</td>
                              <td>{dataEntryProduct.productDTO.code}</td>
                              <td>{dataEntryProduct.productDTO.name}</td>
                              <td>{dataEntryProduct.quantity}</td>
                              <td>{dataEntryProduct.size}</td>
                              <td>
                                {dataEntryProduct.productDTO.entryPrice.toLocaleString(
                                  "vi-VN",
                                  { style: "currency", currency: "VND" }
                                )}
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-outline-danger"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                  onClick={() =>
                                    handleTransferInfo({
                                      deletedId: dataEntryProduct.id,
                                      deletedName:
                                        dataEntryProduct.productDTO.name,
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
                <div
                  className="d-flex justify-content-center"
                  style={{ width: "96%", gap: "50px" }}
                >
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={cancel}
                  >
                    <i className="bi bi-x-circle"></i>
                    Huỷ
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => handleChangeFlag()}
                  >
                    <i className="bi bi-check2-circle"></i>
                    Nhập
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
      <ModalDeleteInvoice
        deletedName={deletedObject.deletedName}
        onCompletedDelete={handleDelete}
      />

      {/* {modal-product-search} */}
      <div className="modal fade" id="exampleModal2">
        <div className="row">
          <div className="col-3"></div>
          <div
            className="modal-dialog col-9 w-100"
            style={{ marginTop: "100px", maxWidth: "800px" }}
          >
            <div className="modal-content" style={{ position: "relatative" }}>
              <div
                className="modal-header justify-content-center"
                style={{ background: "#183661" }}
              >
                <h2 className="modal-title text-white" id="exampleModalLabel">
                  TRA CỨU HÀNG HÓA
                </h2>
                <button
                  type="button"
                  className="btn-close m-0 p-3"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                  }}
                ></button>
              </div>
              <div className={styles["modal-body"]}>
                <div className="container" style={{ boxShadow: "none" }}>
                  <div className={`${styles.content} row`}>
                    <div className="col-12">
                      <div className="d-flex justify-content-between">
                        <Formik
                          initialValues={{
                            name: "",
                          }}
                          onSubmit={async (values) => {
                            setProductFilter((prev) => {
                              return { ...prev, ...values, page: 0 };
                            });
                          }}
                        >
                          <Form>
                            <div
                              className={`${styles["input-search"]} mb-3 d-flex justify-content-between`}
                            >
                              <Field
                                type="text"
                                className={`${styles["customer-info-input"]} ${styles["input_field"]}`}
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
                          data-bs-dismiss="modal"
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
                                <th>Mã hàng hóa</th>
                                <th>Tên hàng hóa</th>
                              </tr>
                            </thead>
                            <tbody>
                              {products.map((product, index) => (
                                <tr
                                  className={`tr${product.id}`}
                                  key={index}
                                  onClick={() =>
                                    handleTransferProductCode(
                                      product.id,
                                      product.code
                                    )
                                  }
                                >
                                  <td>{++index}</td>
                                  <td>{product.code}</td>
                                  <td>{product.name}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div id="product-list" style={{ display: "none" }}>
                            <span className="text-danger">
                              Không tìm thấy hàng hóa
                            </span>
                          </div>
                        </div>
                      </div>
                      <div />
                      {products.length === 0 ? (
                        <div></div>
                      ) : (
                        <div className="d-grid">
                          <ReactPaginate
                            breakLabel="..."
                            nextLabel="Sau"
                            onPageChange={handlePageProductClick}
                            pageCount={pageProductCount}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={1}
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
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataEntry;
