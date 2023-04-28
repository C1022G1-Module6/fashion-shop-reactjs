

import { ErrorMessage, Field, Form, Formik } from "formik";
import loginService from "../../service/loginService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './loginStyle.css'
import * as Yup from 'yup';
import employeeService from "../../service/employeeService";
import { RotatingLines } from "react-loader-spinner";
import Swal from "sweetalert2";
export default function Login() {
    const [showOtpModal, setShowOtpModal] = useState(false)
    const [showFormResetPass, setShowFormResetPass] = useState(false)
    const [showFormEmail, setShowFormEmail] = useState(false)
    const [mail, setMail] = useState('')
    const [submit, setSubmit] = useState(false)
    const [countdown, setCountdown] = useState(0);
    const navigate = useNavigate()
    const handleShowFromEmail = () => {
        setShowFormEmail(true)
    }
    const handleHideEmail = () => {
        setShowFormEmail(false)
    }
    const handleHideOtp = () => {
        setShowOtpModal(false)
    }
    const handleHideResetPass = () => {
        setShowFormResetPass(false)
    }

    const handleAgainSendCode = async () => {
        setSubmit(true)
        try {
            await loginService.forgotPassword({ email: mail })
            setSubmit(false)
            setCountdown(60)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCountdown(countdown => countdown - 1);
        }, 1000);
        if (countdown === 0) {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [countdown]);
    console.log(countdown);


    return (
        <>
            <section className="h-100 gradient-form" 
                         style={
                                    showFormEmail || showOtpModal || showFormResetPass ? 
                                     {opacity: '70%'} : {}
                            }
            >
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100 shadow" style={{ backgroundColor: "#183661" }}>
                        <div className="col-xl-10" >
                            <div className="card rounded-3 text-black shadow" >
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
                                                // validationSchema={Yup.object({
                                                //     username: Yup.string().required('Không được bỏ trống').min(5, "Tên đăng nhập không dưới 5 ký tự").max(20, "Tên đăng nhập không dài hơn 20 ký tự"),
                                                //     password: Yup.string().required('Không được bỏ trống').min(5, "Mật khẩu không dưới 5 ký tự").max(20, "Mật khẩu không dài hơn 20 ký tự")
                                                // })}
                                                onSubmit={(value) => {
                                                    const login = async () => {
                                                        try {
                                                            const rs = await loginService.login(value)
                                                            localStorage.setItem('token', rs.data.token)
                                                            Swal.fire({
                                                                width: '25%',
                                                                icon: 'success',
                                                                title: 'Đăng nhập thành công',
                                                                showConfirmButton: false,
                                                                timer: 1500
                                                              })
                                                            navigate('/employee')
                                                        } catch (error) {
                                                            console.log(error);
                                                            const err = error.response.data;

                                                            if (err.username === "Không được bỏ trống") {
                                                                document.getElementById("usernameError").innerText = "Không được bỏ trống"
                                                            } else if (err.message === "Tên người dùng không tồn tại") {
                                                                document.getElementById("usernameError").innerText = "Tên người dùng không tồn tại"
                                                            } else if (err.username === "Tên đăng nhập ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                                                document.getElementById("usernameError").innerText = "Tên đăng nhập ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                                            } else {
                                                                document.getElementById("usernameError").innerText = ""
                                                            }

                                                            if (err.password === "Không được bỏ trống") {
                                                                document.getElementById("passwordError").innerText = "Không được bỏ trống"
                                                            } else if (err.password === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                                                document.getElementById("passwordError").innerText = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                                            } else if (err.status === 403) {
                                                                document.getElementById("passwordError").innerText = "Mật khẩu không chính xác"
                                                            } else if (err.password === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                                                document.getElementById("passwordError").innerText = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                                            } else {
                                                                document.getElementById("passwordError").innerText = ""
                                                            }
                                                        }

                                                    }
                                                    login()
                                                }}

                                            >
                                                <Form>
                                                    <div className="form-outline pt-2">
                                                        <label
                                                            className="form-label fw-bold"
                                                            htmlFor="form2Example11"
                                                        >
                                                            Tên Đăng Nhập:
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            id="form2Example11"
                                                            className="form-control"
                                                            placeholder="Nhập tên đăng nhập..."
                                                            name="username"
                                                        />
                                                    </div>
                                                    <div>
                                                        <span className="text-danger" id="usernameError"></span>
                                                        {/* <ErrorMessage component='span' name="username" className="text-danger" /> */}

                                                    </div>
                                                    <div className="form-outline pt-2">
                                                        <label
                                                            className="form-label fw-bold"
                                                            htmlFor="form2Example22"
                                                        >
                                                            Mật Khẩu:
                                                        </label>
                                                        <Field
                                                            type="password"
                                                            id="form2Example22"
                                                            className="form-control"
                                                            placeholder="Nhập mật khẩu..."
                                                            name="password"
                                                        />
                                                    </div>
                                                    <div>
                                                        <span className="text-danger" id="passwordError"></span>
                                                        {/* <ErrorMessage component='span' name="password" className="text-danger" /> */}
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
                                                        <a type="button"
                                                            // data-bs-toggle="modal"
                                                            className="text-muted bg-forgot-password"
                                                            // href="#exampleModal"
                                                            onClick={handleShowFromEmail}
                                                        >
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
            {
                showFormEmail &&
                <Formik
                    initialValues={{
                        email: ''
                    }}
                    onSubmit={(value, { setSubmitting }) => {
                        const sendEmail = async () => {
                            try {
                                const res = await loginService.forgotPassword(value)
                                setMail(res.data)
                                setShowFormEmail(false)
                                setShowOtpModal(true)
                                setSubmitting(false)
                                setCountdown(60)

                            } catch (error) {
                                setSubmitting(false)
                                console.log(error.response.data);
                                if (error.response.data.email === "Không được để trống") {
                                    document.getElementById("emailErr").innerHTML = "Không được để trống"
                                } else if (error.response.data.email === "Vui lòng nhập đúng định dạng Email VD: abc123@codegym.com") {
                                    document.getElementById("emailErr").innerHTML = "Vui lòng nhập đúng định dạng Email VD: abc123@codegym.com"
                                } else if (error.response.data.message === "Không tìm thấy email") {
                                    document.getElementById("emailErr").innerHTML = "Email xác nhận không chính xác"
                                } else {
                                    document.getElementById("emailErr").innerHTML = ""
                                }
                            }
                        }
                        sendEmail()
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div
                                className="modal d-block"
                                id="exampleModal"
                                tabIndex={-1}>
                                <div className="modal-dialog" >
                                    <div className="modal-content" style={{ marginTop: 270}}>
                                        <div className="modal-header">
                                            <div className="text-center">
                                                <img src="/đ.png" style={{ width: 185 }} alt="logo" />
                                            </div>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                onClick={handleHideEmail}
                                                // data-bs-dismiss="modal"
                                                aria-label="Close"
                                            />
                                        </div>
                                        <div className="modal-body">

                                            <div>
                                                <label htmlFor="email" className="form-label fw-bold">Xác Nhận Email:</label>
                                            </div>
                                            <div>
                                                <Field className="form-control" name="email" id="email" placeholder="Nhập Email xác nhận..." />
                                            </div>
                                            <div><span className="text-danger" id="emailErr"></span></div>
                                        </div>
                                        {
                                            isSubmitting ?
                                                <div className="d-flex justify-content-end me-3">
                                                    <RotatingLines
                                                        strokeColor="grey"
                                                        strokeWidth="5"
                                                        animationDuration="0.75"
                                                        width="30"
                                                        visible={true}
                                                    />
                                                </div> : <div className="modal-footer">
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        onClick={handleHideEmail}
                                                    // data-bs-dismiss="modal"
                                                    >
                                                        Hủy
                                                    </button>
                                                    <button type="submit" className="btn btn-primary">
                                                        Xác nhận
                                                    </button>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            }

            {
                showOtpModal && <Formik
                    initialValues={{
                        code: '',
                        email: mail
                    }}
                    onSubmit={(value) => {
                        const sendOtp = async () => {
                            try {
                                await loginService.checkOtp(value)
                                setShowOtpModal(false)
                                setShowFormResetPass(true)
                            } catch (error) {
                                console.log(error);
                                if (error.response.data.message === "Mã OTP không chính xác") {
                                    document.getElementById("codeErr").innerHTML = "Mã OTP không chính xác hoặc đã hết hạn"
                                } else if (error.response.data.code === "Không được để trống") {
                                    document.getElementById("codeErr").innerHTML = "Không được để trống"
                                } else if (error.response.data.code === "Vui lòng nhập đúng định dạng OTP VD:XXXXXX (X là chữ số)") {
                                    document.getElementById("codeErr").innerHTML = "Vui lòng nhập đúng định dạng OTP VD:XXXXXX (X là chữ số)"
                                } else {
                                    document.getElementById("codeErr").innerHTML = ""
                                }
                            }
                        }
                        sendOtp()

                    }}
                >

                    <Form>
                        <div
                            className="modal d-block"
                            tabIndex={-1}
                        >
                            <div className="modal-dialog">
                                <div className="modal-content" style={{
                                    marginTop: 270
                                }}>
                                    <div className="modal-header">
                                        <div className="text-center">
                                            <img src="/đ.png" style={{ width: 185 }} alt="logo" />
                                        </div>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={handleHideOtp}
                                            aria-label="Close"
                                        />
                                    </div>
                                    <div className="modal-body">

                                        <div >
                                            <label htmlFor="code" className="form-label fw-bold">Xác Nhận Mã OTP:</label>
                                        </div>
                                        <div>
                                            <Field className="form-control" name="code" placeholder="Nhập mã OTP....." />
                                        </div>
                                        {
                                            
                                            submit ?  
                                            <div className="mt-2 d-flex justify-content-end">
                                            <RotatingLines
                                            strokeColor="grey"
                                            strokeWidth="5"
                                            animationDuration="0.75"
                                            width="30"
                                            visible={true}
                                        />
                                            </div>
                                            :  <div className="mt-2">
                                        <span className="text-danger" id="codeErr"></span>
                                        {
                                            countdown === 0 ?
                                                <div className="mt-2">
                                                    <a className="float-end text-black text-decoration-none  bg-forgot-password"
                                                        href="#"
                                                        onClick={handleAgainSendCode}>Gửi lại mã</a>
                                                </div>
                                                :
                                                <div className="mt-2">
                                                    <span className="float-end text-muted"
                                                    > ({countdown}) Gửi lại mã</span>
                                                </div>

                                        }
                                    </div>
                                        }
                                       
                                    </div>


                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={handleHideOtp}
                                        >
                                            Hủy
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Xác nhận
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            }




            {
                showFormResetPass && <Formik
                    initialValues={{
                        newPassword: '',
                        confirmPassword: '',
                        email: mail
                    }}
                    onSubmit={(value) => {
                        const resetPassword = async () => {
                            try {
                                await loginService.resetPassword(value)
                                setShowFormResetPass(false)
                                Swal.fire({
                                    width: '25%',
                                    icon: 'success',
                                    title: 'Thay đổi mật khẩu thành công',
                                    showConfirmButton: false,
                                    timer: 1500
                                  })
                            } catch (error) {
                                const err = error.response.data
                                console.log(err);
                                if (err.newPassword === "Không được bỏ trống") {
                                    document.getElementById("newPasswordErr").innerHTML = "Không được bỏ trống"
                                } else if (err.newPassword === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                    document.getElementById("newPasswordErr").innerHTML = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                } else {
                                    document.getElementById("newPasswordErr").innerHTML = ""
                                }
                                if (err.message === "Mật khẩu xác nhận không trùng khớp") {
                                    document.getElementById("confirmPasswordErr").innerHTML = "Mật khẩu xác nhận không trùng khớp"
                                } else if (err.confirmPassword === "Không được bỏ trống") {
                                    document.getElementById("confirmPasswordErr").innerHTML = "Không được bỏ trống"
                                } else if (err.confirmPassword === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                    document.getElementById("confirmPasswordErr").innerHTML = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                } else {
                                    document.getElementById("confirmPasswordErr").innerHTML = ""
                                }
                            }
                        }
                        resetPassword()
                    }}
                >
                    <Form>
                        <div
                            className="modal d-block"
                            tabIndex={-1}
                        >
                            <div className="modal-dialog">
                                <div className="modal-content" style={{
                                    marginTop: 270
                                }}>
                                    <div className="modal-header">
                                        <div className="text-center">
                                            <img src="/đ.png" style={{ width: 185 }} alt="logo" />
                                        </div>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={handleHideResetPass}
                                            aria-label="Close"
                                        />
                                    </div>

                                    <div className="modal-body">
                                        <div className="mt-2">
                                            <label htmlFor="newPassword" className="fw-bold form-label">Mật khẩu mới:</label>
                                        </div>
                                        <div >
                                            <Field type="password" id="newPassword" className="form-control" name="newPassword" placeholder="Nhập mật khẩu mới..." />
                                        </div>
                                        <div >
                                            <span className="text-danger" id="newPasswordErr"></span>
                                        </div>
                                        <div className="mt-2">
                                            <label htmlFor="confirmPassword" className="fw-bold form-label">Xác nhận mật khẩu:</label>
                                        </div>
                                        <div >
                                            <Field type="password" id="confirmPassword" className="form-control" name="confirmPassword" placeholder="Xác nhận mật khẩu..." />
                                        </div>
                                        <div>
                                            <span className="text-danger" id="confirmPasswordErr"></span>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={handleHideResetPass}
                                            >
                                                Hủy
                                            </button>
                                            <button type="submit" className="btn btn-primary">
                                                Xác nhận
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            }
        </>
    )
}