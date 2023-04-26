import { useState } from "react";
import { useEffect } from "react";
import employeeService from './../service/employeeService';
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import loginService from "../service/loginService";



export default function EmployeeDetail() {
    const navigate = useNavigate()
    const [detail, setDetail] = useState()
    const employeeDetail = async () => {
        const res = await employeeService.detail()
        setDetail(res.data)
    }
    useEffect(() => {
        employeeDetail()
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }
    return (
        <>
            <div className="row mx-0">
                <div className="col-lg-3 col-md-12 shadow px-0 "></div>
                <div
                    className=" col-lg-9 col-md-12 d-flex justify-content-center "
                    style={{ backgroundColor: "#183661" }}
                >
                    <div className="card w-75 shadow ">
                        <div className="card-body mt-3 ">
                            <div
                                className="card bg-light shadow "
                                style={{ width: 250, height: 250 }}
                            >
                                <img
                                    className="rounded-circle ms-4 mt-4"
                                    src={detail?.avatar}
                                    alt=""
                                    style={{ width: 200, height: 200, backgroundSize: "cover" }}
                                />
                            </div>
                            <div className="mt-3" style={{ backgroundColor: "#183661" }}>
                                <h3 className="text-white pt-3 pb-3 ps-4">THÔNG TIN CÁ NHÂN</h3>
                            </div>
                            <hr />
                            <div className="container mx-3 ">
                                <div className="table-responsive">
                                    <table>
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
                                                <td style={{ height: 50 }}>{detail?.email}</td>
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
                                            <Formik
                                            initialValues={{
                                                oldPassword:'',
                                                newPassword:'',
                                                confirmPassword:''
                                            }}
                                            onSubmit={(value)=>{
                                                const changePassword = async()=>{
                                                    try {
                                                        await loginService.changePassword(value)
                                                        localStorage.removeItem('token')
                                                    } catch (error) {
                                                        console.log(error);
                                                    }
                                                }
                                                changePassword()
                                            }}
                                            >
                                                <Form>
                                                    <tr className="fs-5 collapse" id="exampleModal">
                                                        <th style={{ height: 50 }}>
                                                            <label htmlFor="mk-1">Mật khẩu cũ :</label>
                                                        </th>
                                                        <td>
                                                            <Field
                                                                id="mk-1"
                                                                type="password"
                                                                placeholder="Nhập mật khẩu cũ"
                                                                name="oldPassword"
                                                            />
                                                        </td>
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
                                                                name="newPassword"
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr className="fs-5 collapse" id="exampleModal">
                                                        <th style={{ height: 50 }}>
                                                            <label htmlFor="mk-3">Xác nhận mật khẩu :</label>
                                                        </th>
                                                        <td>
                                                            <Field
                                                                id="mk-3"
                                                                type="password"
                                                                placeholder="Xác nhận mật khẩu"
                                                                name="confirmPassword"
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr className="fs-5 collapse" id="exampleModal">
                                                        <th />
                                                        <th style={{ height: 50 }}>
                                                            <button className="btn btn-outline-primary" type="submit">
                                                                Xác nhận
                                                            </button>
                                                        </th>
                                                    </tr>
                                                </Form>
                                            </Formik>

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

        </>
    )
}