import { useState } from "react";
import * as CustomerTypeService from "../../service/CustomerTypeService"
import * as CustomerService from "../../service/CustomerService"
import { useEffect } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Swal from 'sweetalert2';
import './customer.css'



function CreateCustomer() {
    const [customerType, setCustomerType] = useState([]);

    const findAllCustomerType = async () => {
        const res = await CustomerTypeService.findAllCustomerType()
        setCustomerType(res)
    }

    useEffect(() => {
        findAllCustomerType()
    }, [])


    return (
        <>
            <Formik
                initialValues={{ code: "", name: "", gender: true, dateOfBirth: "", address: "", email: "", phoneNumber: ""}}

                validationSchema={Yup.object(
                    {
                        code: Yup.string().required("Không được để trống!").matches(/KH-\d{3}/,"Vui lòng nhập đúng định dạng KH-XXX với X là số nguyên!"),
                        name: Yup.string().required("Không được để trống!"),
                        // gender: Yup.string().required("Không được để trống!"),
                        dateOfBirth: Yup.string().required("Không được để trống!"),
                        address: Yup.string().required("Không được để trống!"),
                        email: Yup.string().required("Không được để trống!").email("Vui lòng nhập email đúng định dạng"),
                        phoneNumber: Yup.string().required("Không được để trống!").matches(/(03[2-9]|05[6-9]|07[0-9]|08[1-9]|09[0-9])+([0-9]{7})/,"Số điện thoại không đúng!"),
                    }
                )}

                onSubmit={(values) => {

                    const CreateCustomer = async () => {
                        await CustomerService.saveCustomer(values)
                        Swal.fire(
                            'Thêm mới thành công',
                            'Khách hàng ' + values.name,
                            'success'
                        )
                        // navaigate("/customer")
                    }
                    CreateCustomer()
                }}
            >
                
                <section>
                    <div className=" py-5" style={{ padding: 0, margin: 0, overflow: "hidden" }}>
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-lg-8 col-xl-6">
                                <div className="card rounded-3">
                                    <div
                                        className="card-body"
                                        style={{ boxShadow: "0 0 20px 0 #253365" }}
                                    >
                                        <h1
                                            className="mb-3 mt-3 text-center"
                                            style={{ backgroundColor: "#183661", color: "white" }}
                                        >
                                            THÊM MỚI KHÁCH HÀNG{" "}
                                        </h1>
                                        <Form className="px-md-4 ">
                                        <div className="form-group">
                                                <label htmlFor="code" className="h6">
                                                    Mã khách hàng: 
                                                    <sup style={{ color: "red", fontSize: 15 }} className="m-1">
                                                        *
                                                    </sup>
                                                    :
                                                </label>
                                                <div className="input-group">
                                                    <Field
                                                        type="text"
                                                        id="code"
                                                        className="form-control"
                                                        placeholder="VD: KH-001"
                                                        name="code"
                                                    />
                                                    <span className="input-group-text">
                                                        <i className="bi bi-person-add" />
                                                    </span>
                                                </div>
                                                <ErrorMessage name="code" component="span" />
                                            </div>

                                            <div className="mt-3 form-group">
                                                <label htmlFor="name" className="h6">
                                                    Họ Tên
                                                    <sup style={{ color: "red", fontSize: 15 }} className="m-1">
                                                        *
                                                    </sup>
                                                    :
                                                </label>
                                                <div className="input-group">
                                                    <Field
                                                        type="text"
                                                        id="name"
                                                        className="form-control"
                                                        placeholder="VD: Nguyễn Văn A"
                                                        name="name"
                                                    />
                                                    <span className="input-group-text">
                                                        <i className="bi bi-person-add" />
                                                    </span>
                                                </div>
                                                <ErrorMessage name="name" component="span"/>
                                            </div>
                                            <div className="mt-3 form-group">
                                                <label htmlFor="dateOfBirth" className="h6">
                                                    Ngày sinh
                                                    <sup style={{ color: "red", fontSize: 15 }} className="m-1">
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
                                                <ErrorMessage name="dateOfBirth" component="span"/>
                                            </div>
                                            <div className="mt-3 form-group">
                                                <label className="h6">
                                                    Giới tính
                                                    <sup style={{ color: "red", fontSize: 15 }} className="m-1">
                                                        *
                                                    </sup>
                                                    :
                                                </label>
                                                <div className="d-flex">
                                                    <label className="d-block me-4">
                                                        <Field
                                                            type="radio"
                                                            value= "false"
                                                            name="gender"
                                                            defaultChecked=""
                                                        />{" "}
                                                        Nam
                                                        <i className="bi bi-gender-male" />
                                                    </label>
                                                    <label className="d-block me-4">
                                                        <Field type="radio" value="true" name="gender" /> Nữ
                                                        <i className="bi bi-gender-female" />
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="mt-3 form-group">
                                                <label htmlFor="phoneNumber" className="h6">
                                                    Số điện thoại
                                                    <sup style={{ color: "red", fontSize: 15 }} className="m-1">
                                                        *
                                                    </sup>
                                                    :
                                                </label>
                                                <div className="input-group">
                                                    <Field
                                                        type="text"
                                                        id="phoneNumber"
                                                        className="form-control"
                                                        placeholder="VD: 0837790795"
                                                        name="phoneNumber"
                                                    />
                                                    <span className="input-group-text">
                                                        <i className="bi bi-telephone-inbound" />
                                                    </span>
                                                </div>
                                                <ErrorMessage name="phoneNumber" component="span"/>
                                            </div>
                                            <div className="mt-3 form-group">
                                                <label htmlFor="email" className="h6">
                                                    Email
                                                    <sup style={{ color: "red", fontSize: 15 }} className="m-1">
                                                        *
                                                    </sup>
                                                    :
                                                </label>
                                                <div className="input-group">
                                                    <Field
                                                        type="text"
                                                        id="email"
                                                        className="form-control"
                                                        placeholder="VD: abc@gmail.com"
                                                        name="email"
                                                    />
                                                    <span className="input-group-text">
                                                        <i className="bi bi-envelope-at" />
                                                    </span>
                                                </div>
                                                <ErrorMessage name="email" component="span"/>
                                            </div>
                                            <div className="mt-3 form-group">
                                                <label htmlFor="address" className="h6">
                                                    Địa chỉ
                                                    <sup style={{ color: "red", fontSize: 15 }} className="m-1">
                                                        *
                                                    </sup>
                                                    :
                                                </label>
                                                <div className="input-group">
                                                    <Field
                                                        type="text"
                                                        id="address"
                                                        className="form-control"
                                                        placeholder="VD: Hà Nội"
                                                        name="address"
                                                    />
                                                    <span className="input-group-text">
                                                        <i className="bi bi-geo-alt-fill" />
                                                    </span>
                                                </div>
                                                <ErrorMessage name="address" component="span"/>
                                            </div>

                                            <div className="d-flex justify-content-center" style={{ marginTop: 10 }}>
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    style={{ marginRight: 5 }}
                                                >
                                                    <i className="bi bi-x-circle" /> Hủy
                                                </button>
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
                </section>
            </Formik>
                
        </>
    )
}
export default CreateCustomer;