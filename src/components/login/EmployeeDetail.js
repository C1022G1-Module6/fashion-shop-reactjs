import { useState } from "react";
import { useEffect } from "react";
import employeeService from '../../service/employeeService';
import { Outlet, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";



import loginService from "../../service/loginService";

export default function EmployeeDetail() {
    const navigate = useNavigate()
    const [detail, setDetail] = useState()
    const employeeDetail = async () => {
        const res = await employeeService.detail()
        setDetail(res.data)
    }
    useEffect(() => {
        document.title = "Thông Tin Cá Nhân"; // Thay đổi title
    }, [])
    useEffect(() => {
        employeeDetail()
    }, [])
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('roles')
        localStorage.removeItem('name')
        navigate('/')
    }
    if(!detail){
        return null
    }
    return (
        <>
            <Formik
                initialValues={{
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }}
                onSubmit={(value) => {
                    const changePassword = async () => {
                        try {
                            await loginService.changePassword(value)
                            localStorage.removeItem('token')
                            Swal.fire({
                                icon: 'success',
                                title: 'Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại',
                                showConfirmButton: false,
                                timer: 1500
                              })
                            navigate('/')

                        } catch (error) {
                           const err = error.response.data
                           console.log(err);
                            if(err.message === "Mật khẩu hiện tại không đúng"){
                                document.getElementById("oldPasswordErr").innerHTML = "Mật khẩu hiện tại không đúng"
                            }else if(err.oldPassword === "Không được bỏ trống"){
                                document.getElementById("oldPasswordErr").innerHTML = "Không được bỏ trống"
                            }else if(err.oldPassword === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"){
                                document.getElementById("oldPasswordErr").innerHTML = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                            }else{
                                document.getElementById("oldPasswordErr").innerHTML = ""
                            }

                            if(err.message === "Mật khẩu mới không được trùng với mật khẩu cũ"){
                                document.getElementById("newPasswordErr").innerHTML = "Mật khẩu mới không được trùng với mật khẩu cũ"
                            } else if(err.newPassword === "Không được bỏ trống"){
                                document.getElementById("newPasswordErr").innerHTML = "Không được bỏ trống"
                            }else if(err.newPassword === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"){
                                document.getElementById("newPasswordErr").innerHTML = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                            }else{
                                document.getElementById("newPasswordErr").innerHTML = ""
                            }
                            

                            if(err.message === "Mật khẩu xác nhận không trùng khớp"){
                                document.getElementById("confirmPasswordErr").innerHTML = "Mật khẩu xác nhận không trùng khớp"
                            } else if(err.confirmPassword === "Không được bỏ trống"){
                                document.getElementById("confirmPasswordErr").innerHTML = "Không được bỏ trống"
                            }else if(err.confirmPassword === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"){
                                document.getElementById("confirmPasswordErr").innerHTML = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                            }else{
                                document.getElementById("confirmPasswordErr").innerHTML = ""
                            }
                           
                        }
                    }
                    changePassword()
                }}
            >
                <Form>
                    <div className="row mx-0">
                        <div className="col-lg-3 col-md-12 px-0 "></div>
                        <div
                            className=" col-lg-7 mx-auto col-md-12 "
                            
                        >
                            <div className="card w-100 shadow-lg ">
                                <div className="card-body mt-3 px-5">
                                    <div
                                        className="card  shadow"
                                        style={{ width: 250, height: 250,backgroundColor: "#183661" }}
                                    >
                                        <img
                                            className="rounded-circle ms-2 mt-2 border border-4"
                                            src={detail?.avatar}
                                            alt=""
                                            style={{ width: 230, height: 230 }}
                                        />

                                    </div>
                                    <div className="mt-3" style={{ backgroundColor: "#183661" }}>
                                        <h3 className="text-white pt-3 pb-3 ps-4">THÔNG TIN CÁ NHÂN</h3>
                                    </div>
                                    <hr />
                                    <div className="container mx-3">
                                        <div className="table-responsive ">
                                            <table >
                                                <thead>
                                                    <tr className="fs-5">
                                                        <th>Mã nhân viên : </th>
                                                        <td style={{ height: 50 }}>{detail?.code}</td>
                                                    </tr>
                                                    <tr className="fs-5">
                                                        <th>Họ và tên : </th>
                                                        <td style={{ height: 50 }}>{detail?.name}</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                <tr className="fs-5">
                                                        <th>Vị trí : </th>
                                                        <td style={{ height: 50 }}>{detail?.roleDTOSetSet[0].name === 'ROLE_SALER' ? 'Nhân viên bán hàng' : detail?.roleDTOSetSet[0].name==='ROLE_WAREHOUSE_MANAGER' ? 'Quản lý kho hàng' : 'Quản lý cửa hàng'}</td>
                                                    </tr>
                                                    <tr className="fs-5">
                                                        <th style={{ width: 250 }}>Giới tính : </th>
                                                        <td style={{ height: 50 }}>{detail?.gender === false ? 'Nam' : 'Nữ'}</td>
                                                    </tr>
                                                    <tr className="fs-5">
                                                        <th>Ngày sinh : </th>
                                                        <td style={{ height: 50 }}>{detail?.dateOfBirth}</td>
                                                    </tr>
                                                    <tr className="fs-5">
                                                        <th>Số điện thoại : </th>
                                                        <td style={{ height: 50 }}>{detail?.phoneNumber}</td>
                                                    </tr>
                                                    <tr className="fs-5">
                                                        <th>Email : </th>
                                                        <td style={{ height: 50 }}>{
                                                        detail?.email
                                                        }</td>
                                                    </tr>
                                                    <tr className="fs-5">
                                                        <th>Địa chỉ : </th>
                                                        <td style={{ height: 50 }}>{detail?.address}</td>
                                                    </tr>

                                                    <tr className="fs-5">
                                                        <th style={{ height: 70 }}>
                                                            <div>
                                                                <a
                                                                    className=" text-black btn btn-outline-secondary fs-5"
                                                                    data-bs-toggle="collapse"
                                                                    href="#exampleModal"
                                                                >
                                                                    Đổi mật khẩu
                                                                </a>
                                                            </div>
                                                        </th>
                                                    </tr>

                                                    <tr className="fs-5 collapse" id="exampleModal">
                                                        <th style={{ height: 50 }}>
                                                            <label htmlFor="mk-1">Mật khẩu cũ :</label>
                                                        </th>
                                                        <td>
                                                            <Field
                                                                id="mk-1"
                                                                type="password"
                                                                className="form-control"
                                                                placeholder="Nhập mật khẩu cũ"
                                                                name="oldPassword"
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr id="exampleModal">
                                                        <th></th>
                                                        <td><span className="text-danger" id="oldPasswordErr"></span></td>
                                                        
                                                    </tr>
                                                    <tr className="fs-5 collapse" id="exampleModal">
                                                        <th style={{ height: 50 }}>
                                                            <label htmlFor="mk-2">Mật khẩu mới :</label>
                                                        </th>
                                                        <td>
                                                            <Field
                                                                id="mk-2"
                                                                type="password"
                                                                placeholder="Nhập mật khẩu mới"
                                                                className="form-control"
                                                                name="newPassword"
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr id="exampleModal">
                                                        <th></th>
                                                        <td><span className="text-danger" id="newPasswordErr"></span></td>
                                                    </tr>
                                                    <tr className="fs-5 collapse" id="exampleModal">
                                                        <th style={{ height: 50 }}>
                                                            <label htmlFor="mk-3">Xác nhận mật khẩu :</label>
                                                        </th>
                                                        <td>
                                                            <Field
                                                                id="mk-3"
                                                                type="password"
                                                                className="form-control"
                                                                placeholder="Xác nhận mật khẩu"
                                                                name="confirmPassword"
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr id="exampleModal">
                                                        <th></th>
                                                        <td><span className="text-danger" id="confirmPasswordErr"></span></td>
                                                    </tr>
                                                    <tr className="fs-5 collapse" id="exampleModal">
                                                        <th></th>
                                                        <th style={{ height: 50 }}>
                                                            <button className="btn btn-outline-primary" type="submit">
                                                                Xác nhận
                                                            </button>
                                                        </th>
                                                    </tr>

                                                    <tr className="fs-5">
                                                        <th style={{ height: 70 }}>
                                                            <div>
                                                                <button onClick={() => handleLogout()}
                                                                    className=" text-black btn btn-outline-secondary fs-5"
                                                                >
                                                                    Đăng xuất
                                                                </button>
                                                            </div>
                                                        </th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    )
}