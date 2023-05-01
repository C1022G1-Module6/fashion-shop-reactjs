import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Field, Form, Formik } from "formik";
import dataEntryProductService from "../../service/data_entry/dataEntryProductService";
import dataEntryService from "../../service/data_entry/dataEntryService";
import "./dataEntry.css";
import ModalDeleteInvoice from "../../util/invoice/ModalDeleteInvoice";
import Swal from "sweetalert2";
import * as Yup from "yup";

function DataEntry() {
  const [dataEntryProducts, setDataEntryProducts] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const [dataEntry, setDataEntry] = useState();
  const [flag, setFlag] = useState(false);
  const [productCode, setProductCode] = useState("")
  const [productQuantity, setProductQuantity] = useState("")
  const [deletedObject, setDeletedObject] = useState({
    deletedId: "",
    deletedName: "",
  });

  const cancel = async () => {
    dataEntryService.remove()
    resetValues()
  }
  const setValueOfProductCode = (e) => {
    
    console.log(e.target.value);
    setProductCode(e.target.value)
  }
  const setValueOfProductQuantity = (e) => {
    setProductQuantity(e.target.value)
  }
  const handleTransferInfo = (deletedObject) => {
    setDeletedObject((prev) => ({ ...prev, ...deletedObject }));
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
    setProductCode("")
    setProductQuantity("")
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
    console.log(newValues);
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
      console.log(error);
    }
  };

  const handleSubmitDataEntry = async (values) => {
    const newValues = {
      ...values,
    };
    try {
      await dataEntryService.update(newValues);
      Swal.fire({
        icon: "success",
        title: "Nhập liệu thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      resetValues();
      setFlag(false);
    } catch (error) {
      swalWithBootstrapButtons.fire("Hủy", "Lỗi nhập liệu :)", "error");
      console.warn(error);
    }
  };

  useEffect(() => {
    const getDataEntryProducts = async () => {
      const dataEntryProductResponse = await dataEntryProductService.findAll();
      setDataEntryProducts(dataEntryProductResponse.data);
    };
    getDataEntryProducts();
  }, [isSubmitting]);

  useEffect(() => {
    const getDataEntry = async () => {
      const dataEntryResponse = await dataEntryService.getDetail();
      setDataEntry(dataEntryResponse.data);
    };
    getDataEntry();
  }, [isSubmitting]);

  return (
    <>
      <Formik
        initialValues={{
          dataEntryProduct: {
            quantity: "",
            delete: false,
            productDTO: "",
          },
          dataEntry: {
            employeeName: "",
          },
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required."),
          email: Yup.string().required("Required.").email("abc@gmail.com"),
          phone: Yup.string()
            .required("Required."),
          message: Yup.string().required("Required."),
        })}
        onSubmit={(values) => {
          if (!flag) {
            handleSubmitDataEntryProduct(values.dataEntryProduct);
          } else {
            handleSubmitDataEntry(values.dataEntry);
          }
        }}
      >
        <Form name="dataEntry" className="mt-5">
          <div className="container col-12 col-md-10 col-lg-8 col-xxl-6">
            <div className="content row">
              <div className="mb-3 text-center row">
                <h2 className="heading">NHẬP LIỆU</h2>
              </div>
              <div className="row mb-3 input-search p-0">
                <div className="col-5 d-flex justify-content-between">
                  <label htmlFor="" className="fw-bold">
                    Mã phiếu nhập<span className="colon">:</span>
                  </label>
                  {isSubmitting ? <span>{dataEntry.code}</span> : <span></span>}
                </div>
                <div className="col-2" />
                <div className="col-5 d-flex justify-content-between">
                  <label htmlFor="" className="fw-bold">
                    Ngày tháng năm<span className="colon">:</span>{" "}
                  </label>
                  {isSubmitting ? <span>{dataEntry.date}</span> : <span></span>}
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
                      name="dataEntryProduct.productDTO"
                      value={productCode}
                      onChange={(e)=>setValueOfProductCode(e)}
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
                      id="productuantity"
                      name="dataEntryProduct.quantity"
                      value={productQuantity}
                      onChange={(e)=>setValueOfProductQuantity(e)}
                    />
                  </div>
                  <div className="row d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary"
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
                        {/* <th>Size</th> */}
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
                            {/* <td>
                                    {invoiceDetail.productDTO.productSizes.map(
                                      (productSize) => productSize.name
                                    )}
                                  </td> */}
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
                style={{ width: "96%", gap: "100px" }}
              >
                <button type="button" className="btn btn-secondary" onClick={cancel}>
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
        </Form>
      </Formik>
      <ModalDeleteInvoice
        deletedName={deletedObject.deletedName}
        onCompletedDelete={handleDelete}
      />
    </>
  );
}

export default DataEntry;
