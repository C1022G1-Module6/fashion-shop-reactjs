

import { Field, Form, Formik } from "formik";
import loginService from "../service/loginService";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
export default function Login() {


    // const emptyErr = 'Không được bỏ trống'
    // const usernameErr = 'Tên đăng nhập ít nhất 5 ký tự và nhiều nhất 20 ký tự'
    // const passwordErr = 'Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự'
    // const existErr = 'Tên người dùng không tồn tại'
    // const existPassErr = 'Mật khẩu không chính xác'
    //     if(err.username===emptyErr){
    //         document.getElementById(`usernameError`).innerText = emptyErr 
    //     }else if(err.username===usernameErr){
    //         document.getElementById(`usernameError`).innerText = usernameErr  
    //     }else if(err.message===existPassErr){
    //         document.getElementById(`usernameError`).innerText = existErr 
    //     }
    //     else{
    //         document.getElementById(`usernameError`).innerText = ""
    //     }
    //     if(err.password===emptyErr){
    //         document.getElementById(`passwordError`).innerText = emptyErr 
    //     }else if(err.password===passwordErr){
    //         document.getElementById(`passwordError`).innerText = passwordErr 
    //     }else if(err.status===403){
    //         document.getElementById(`passwordError`).innerText = existPassErr 
    //     }
       const navigate = useNavigate()
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
                                                username:'',
                                                password:''
                                            }}
                                            validationSchema={Yup.object({
                                                username:Yup.string().required('Không được bỏ trống'),
                                                password:Yup.string().required('Không được bỏ trống')
                                            })}
                                            onSubmit={(value)=>{
                                                const login = async()=>{
                                                    try {
                                                    const rs = await loginService.login(value)
                                                      localStorage.setItem('token',rs.data.token)
                                                      navigate('/employee')
                                                    } catch (error) {
                                                        console.log(error);
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
                                                        <span className="text-danger" id="usernameError"></span>
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
                                                        <span className="text-danger" id="passwordError"></span>
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