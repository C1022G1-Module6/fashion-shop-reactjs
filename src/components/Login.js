

import { ErrorMessage, Field, Form, Formik } from "formik";
import loginService from "../service/loginService";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { useState } from "react";
export default function Login() {
    const [flag, setFlag] = useState(false)
    const navigate = useNavigate()

    function handleInputChange() {
        setFlag(false);
      }
    return (
        <>
            <section className="h-100 gradient-form " style={{ backgroundColor: "#eee" }}>
                <div className="container py-5 h-100 ">
                    <div className="row d-flex justify-content-center align-items-center h-100 shadow">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black shadow">
                                <div className="row g-0">
                                    <div className="col-lg-6 d-flex align-items-center gradient-custom-2"></div>
                                    <div className="col-lg-6">
                                        <div className="card-body p-md-5 mx-md-4">
                                            <div className="text-center">
                                                <img src="/đ.png" style={{ width: 185 }} alt="logo" />
                                            </div>
                                            <Formik
                                                initialValues={{
                                                    username: '',
                                                    password: ''
                                                }}
                                                validationSchema={Yup.object({
                                                    username: Yup.string().required('Không được bỏ trống').min(5, "Tên đăng nhập không dưới 5 ký tự").max(20, "Tên đăng nhập không dài hơn 20 ký tự"),
                                                    password: Yup.string().required('Không được bỏ trống').min(5, "Mật khẩu không dưới 5 ký tự").max(20, "Mật khẩu không dài hơn 20 ký tự")
                                                })}
                                                onSubmit={(value) => {
                                                    const login = async () => {
                                                        try {
                                                            const rs = await loginService.login(value)
                                                            localStorage.setItem('token', rs.data.token)
                                                            navigate('/employee')
                                                        } catch (error) {
                                                            console.log(error);
                                                            if (error.response.data.status === 403) {
                                                                document.getElementById("passwordError").innerText = "Mật khẩu không chính xác"
                                                            } else {
                                                                document.getElementById("passwordError").innerText = ""
                                                            }
                                                            if (error.response.data.message === "Tên người dùng không tồn tại") {
                                                                document.getElementById("usernameError").innerText = "Tên người dùng không tồn tại"
                                                            } else {
                                                               
                                                                document.getElementById("usernameError").innerText = ""
                                                            }
                                                        }

                                                    }
                                                    login()
                                                    setFlag(true)
                                                }}

                                            >
                                                <Form>
                                                    <div className="form-outline pt-2">
                                                        <label
                                                            className="form-label fw-bold"
                                                            htmlFor="form2Example11"
                                                        >
                                                            Tên Đăng Nhập
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            id="form2Example11"
                                                            className="form-control"
                                                            placeholder="Nhập tên đăng nhập"
                                                            name="username"
                                                        />
                                                    </div>
                                                    <div>
                                                        {
                                                            flag ? <span className="text-danger" id="usernameError"></span> : 
                                                            <ErrorMessage component='span' name="username" className="text-danger" />
                                                        }
                                                    </div>
                                                    <div className="form-outline pt-2">
                                                        <label
                                                            className="form-label fw-bold"
                                                            htmlFor="form2Example22"
                                                        >
                                                            Mật Khẩu
                                                        </label>
                                                        <Field
                                                            type="password"
                                                            id="form2Example22"
                                                            className="form-control"
                                                            placeholder="Nhập mật khẩu"
                                                            name="password"
                                                        />
                                                    </div>
                                                    <div>
                                                        <ErrorMessage component='span' name="password" className="text-danger" />
                                                    </div>
                                                    <div className="text-center pt-3  pb-1">
                                                        <button
                                                            className="btn btn-outline-primary shadow btn-block fa-lg mb-3"
                                                            type="submit"
                                                        >
                                                            Đăng nhập
                                                        </button>
                                                    </div>
                                                    <div className="text-center">
                                                        <a className="text-muted bg-forgot-password" href="#!">
                                                            Quên mật khẩu?
                                                        </a>
                                                    </div>

                                                </Form>
                                            </Formik>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}