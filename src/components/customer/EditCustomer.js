import { useState } from "react";
import CustomerTypeService from "../../service/customer/customerTypeService";
import CustomerService from "../../service/customer/customerService";
import { useEffect } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
// import './customer.css'

function EditCustomer() {
  const [customerType1, setCustomerType] = useState([]);
  const [customer, setCustomer] = useState();
  const param = useParams();
  const navigate = useNavigate();
  const findAllCustomerType = async () => {
    const res = await CustomerTypeService.findAll();
    setCustomerType(res.data);
  };
  useEffect(() => {
    findAllCustomerType();
  }, []);

  useEffect(() => {
    const fecthCustomer = async () => {
      const res = await CustomerService.findCustomerById(param.id);
      setCustomer(res);
      console.log(res);
    };
    fecthCustomer();
  }, [param.id]);

  useEffect(() => {
    document.title = "Chỉnh sửa khách hàng";
  }, []);

  if (!customer) {
    return null;
  }

  return (
    <Formik
      initialValues={{
        id: customer?.id,
        code: customer?.code,
        name: customer?.name,
        gender: customer?.gender,
        dateOfBirth: customer?.dateOfBirth,
        phoneNumber: customer?.phoneNumber,
        address: customer?.address,
        email: customer?.email,
        point: customer?.point,
        customerTypeDTO: customer?.customerType?.id,
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Không được để trống"),
        // gender: Yup.string().required("Không được để trống"),
        dateOfBirth: Yup.string().required("Không được để trống"),
        address: Yup.string().required("Không được để trống"),
        email: Yup.string()
          .required("Không được để trống")
          .email("Vui lòng nhập email đúng định dạng"),
        phoneNumber: Yup.string()
          .required("Không được để trống")
          .matches(
            /(03[2-9]|05[6-9]|07[0-9]|08[1-9]|09[0-9])+([0-9]{7})/,
            "Số điện thoại không đúng"
          ),
      })}
      onSubmit={(values) => {
        const updateCustomer = async () => {
          console.log(values);
          await CustomerService.editCustomer({
            ...values,
            customerTypeDTO: {
              id: +values.customerTypeDTO,
            },
          });
          setCustomer(values);
          Swal.fire(
            "Chỉnh sửa thành công",
            "Khách hàng " + values.name,
            "success"
          );
          navigate("/customer");
        };
        updateCustomer();
      }}
    >
      {({ values }) => (
        <div className="row mx-0">
          <div className="col-3"></div>
          <div className="col-9 pt-3">
            <div className=" d-flex justify-content-center align-items-center">
              <div className="col-lg-8 col-xl-9">
                <div className="card rounded-3">
                  <div
                    className="card-body"
                    style={{ boxShadow: "0 0 20px 0 #253365" }}
                  >
                    <h1
                      className="mb-3 mt-3 text-center"
                      style={{ backgroundColor: "#183661", color: "white" }}
                    >
                      CHỈNH SỬA KHÁCH HÀNG{" "}
                    </h1>

                    <Form className="px-md-4 ">
                      <div className="form-group">
                        <label htmlFor="code" className="h6">
                          Mã khách hàng:
                        </label>
                        <div className="input-group">
                          <span className="form-control">{customer?.code}</span>
                          <></>
                          <span className="input-group-text">
                            <i className="bi bi-gear-wide-connected" />
                          </span>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="name" className="h6">
                          Họ Tên
                          <sup
                            style={{ color: "red", fontSize: 15 }}
                            className="m-1"
                          >
                            *
                          </sup>
                          :
                        </label>
                        <div className="input-group">
                          <Field
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Nhập tên khách hàng..."
                            name="name"
                          />
                          <span className="input-group-text">
                            <i className="bi bi-person-add" />
                          </span>
                        </div>
                        <ErrorMessage
                          name="name"
                          className="text-danger"
                          component="span"
                        />
                      </div>
                      <div className="mt-3 form-group">
                        <label htmlFor="dateOfBirth" className="h6">
                          Ngày sinh
                          <sup
                            style={{ color: "red", fontSize: 15 }}
                            className="m-1"
                          >
                            *
                          </sup>
                          :
                        </label>
                        <Field
                          type="date"
                          id="dateOfBirth"
                          className="form-control"
                          name="dateOfBirth"
                        />
                        <ErrorMessage
                          name="dateOfBirth"
                          className="text-danger"
                          component="span"
                        />
                      </div>
                      <div className="mt-3 form-group">
                        <label className="h6">
                          Giới tính
                          <sup
                            style={{ color: "red", fontSize: 15 }}
                            className="m-1"
                          >
                            *
                          </sup>
                          :
                        </label>
                        <div className="d-flex">
                          <label className="d-block me-4">
                            <Field
                              type="radio"
                              value="false"
                              name="gender"
                              checked={values.gender === false ? true : null}
                            />
                            Nam
                            <i className="bi bi-gender-male " />
                          </label>
                          <label className="d-block me-4">
                            <Field
                              type="radio"
                              value="true"
                              name="gender"
                              checked={values.gender === true ? true : null}
                            />{" "}
                            Nữ
                            <i className="bi bi-gender-female " />
                          </label>
                        </div>
                      </div>
                      <div className="mt-3 form-group">
                        <label htmlFor="point" className="h6">
                          Điểm
                          <sup
                            style={{ color: "red", fontSize: 15 }}
                            className="m-1"
                          >
                            *
                          </sup>
                          :
                        </label>
                        <div className="input-group">
                          <Field
                            type="text"
                            id="point"
                            className="form-control"
                            placeholder="Nhập điểm... "
                            name="point"
                          />
                          <span className="input-group-text">
                            <i className="bi bi-list-ol" />
                          </span>
                        </div>
                        <ErrorMessage
                          name="point"
                          className="text-danger"
                          component="span"
                        />
                      </div>
                      <div className="mt-3 form-group">
                        <label htmlFor="phoneNumber" className="h6">
                          Số điện thoại
                          <sup
                            style={{ color: "red", fontSize: 15 }}
                            className="m-1"
                          >
                            *
                          </sup>
                          :
                        </label>
                        <div className="input-group">
                          <Field
                            type="text"
                            id="phoneNumber"
                            className="form-control"
                            placeholder="Nhập số điện thoại khách hàng..."
                            name="phoneNumber"
                            // defaultValue={0837790795}
                          />
                          <span className="input-group-text">
                            <i className="bi bi-telephone-inbound" />
                          </span>
                        </div>
                        <ErrorMessage
                          name="phoneNumber"
                          className="text-danger"
                          component="span"
                        />
                      </div>
                      <div className="mt-3 form-group">
                        <label htmlFor="email" className="h6">
                          Email
                          <sup
                            style={{ color: "red", fontSize: 15 }}
                            className="m-1"
                          >
                            *
                          </sup>
                          :
                        </label>
                        <div className="input-group">
                          <Field
                            type="text"
                            id="email"
                            className="form-control"
                            placeholder="Nhập email khách hàng..."
                            name="email"
                          />
                          <span className="input-group-text">
                            <i className="bi bi-envelope-at" />
                          </span>
                        </div>
                        <ErrorMessage
                          name="email"
                          className="text-danger"
                          component="span"
                        />
                      </div>
                      <div className="mt-3 form-group">
                        <label htmlFor="address" className="h6">
                          Địa chỉ
                          <sup
                            style={{ color: "red", fontSize: 15 }}
                            className="m-1"
                          >
                            *
                          </sup>
                          :
                        </label>
                        <div className="input-group">
                          <Field
                            type="text"
                            id="address"
                            className="form-control"
                            placeholder="Nhập địa chỉ khách hàng..."
                            name="address"
                          />
                          <span className="input-group-text">
                            <i className="bi bi-geo-alt-fill" />
                          </span>
                        </div>
                        <ErrorMessage
                          name="address"
                          className="text-danger"
                          component="span"
                        />
                      </div>
                      <div className="mt-3 form-group">
                        <label className="h6" htmlFor="rank">
                          Cấp bậc
                          <sup
                            style={{ color: "red", fontSize: 15 }}
                            className="m-1"
                          >
                            *
                          </sup>
                          :
                        </label>
                        <div className="input-group">
                          <Field
                            as="select"
                            name="customerTypeDTO"
                            id="customerTypeDTO"
                            className="form-control"
                          >
                            {customerType1.map((customerTypeList, index) => (
                              <option key={index} value={customerTypeList.id}>
                                {customerTypeList.name}
                              </option>
                            ))}
                          </Field>
                          <span className="input-group-text">
                            <i className="bi bi-reception-4" />
                          </span>
                        </div>
                      </div>

                      <div
                        className="d-flex justify-content-center"
                        style={{ marginTop: 10 }}
                      >
                        <NavLink
                          to={"/customer"}
                          type="button"
                          className="btn btn-secondary"
                          style={{ marginRight: 5 }}
                        >
                          <i className="bi bi-x-circle" /> Hủy
                        </NavLink>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ marginLeft: 5 }}
                        >
                          <i className="bi bi-check2-circle" /> Lưu
                        </button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}
export default EditCustomer;
