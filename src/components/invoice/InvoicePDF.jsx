import React from "react";
import styles from "./invoice.module.css";

function InvoicePDF(props) {
  if (!props.invoice) {
   return null 
  }
  return (
    <>
      <div className='container col-12 col-md-10 col-lg-8 col-xxl-6'>
      <div className={`${styles.content} row`}>
          <div className="mb-3 text-center row">
            <p className="fw-bold" style={{fontSize: "50px"}}>HÓA ĐƠN THANH TOÁN</p>
          </div>
          <div className={`${styles['input-search']} row mb-3 p-0`}>
            <div className="d-flex justify-content-between">
              <label htmlFor="" className="fw-bold">
                Mã hóa đơn<span className={styles.colon}>:</span>
              </label>
              <span>{props.invoice.code}</span>
            </div>
          </div>
          <div className={`${styles['input-search']} row mb-3 p-0`}>
            <div className="d-flex justify-content-between">
              <label htmlFor="" className="fw-bold">
                Ngày tháng năm<span className={styles.colon}>:</span>{" "}
              </label>
              <span>{props.invoice.date}</span>
            </div>
          </div>
          <div className={`${styles['input-search']} row mb-3 p-0`}>
            <div className="d-flex justify-content-between">
              <label htmlFor="" className="fw-bold">
                Mã khách hàng<span className={styles.colon}>:</span>{" "}
              </label>
              <span>{props.invoice.customerDTO?.code}</span>
            </div>
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
                  </tr>
                </thead>
                <tbody>
                  {props.invoiceDetails.map((invoiceDetail, index) => (
                    <tr key={index}>
                      <td>{++index}</td>
                      <td>{invoiceDetail.productDTO.code}</td>
                      <td>{invoiceDetail.productDTO.name}</td>
                      <td>{invoiceDetail.quantity}</td>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={`${styles['payment-info']} mb-3`} style={{ width: "96%" }}>
            <div className="d-flex justify-content-between">
              <span className="fw-bold">Tổng: </span>
              <span>
                {props.invoice.total?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="fw-bold">Giảm giá: </span>
              <span>
                {props.invoice.discount?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="fw-bold fs-2">Thành tiền: </span>
              <span className="fw-bold fs-2">
                {props.invoice.payment?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
          </div>
          <div>
            <h3 style={{color: "#183661"}}>Fashion Shop</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default InvoicePDF;
