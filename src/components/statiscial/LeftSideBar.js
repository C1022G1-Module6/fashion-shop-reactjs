import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import employeeService from '../../service/employeeService';
import Swal from "sweetalert2";
export default function LeftSideBar() {
    const [detail, setDetail] = useState()
    const navigate = useNavigate()
    const handleLogout = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('roles')
        localStorage.removeItem('name')
        navigate('/')
    }
    const employeeDetail = async () => {
        const res = await employeeService.detail()
        setDetail(res.data)
    }
    const handleAuthority = ()=>{
        Swal.fire({
            icon: 'error',
            title: 'Bạn không có quyền truy cập',
            showConfirmButton: false,
            timer: 1500
        })
    }
    useEffect(() => {
        employeeDetail()
    }, [])
    if(!detail){
        return null
    }

    return (
        <>
            <div className="col-3  px-0 fixed-top "
            style={{height: '90vh'}}
            >
                <div className="flex-column flex-shrink-0 p-3 bg-light shadow-lg h-100 w-100">
                    <div style={{ backgroundColor: "#183661",height:50 }} >
                        <a
                            href="#"
                            className="d-flex align-items-center shadow mb-3 pt-2 mb-md-0 me-md-auto text-black fw-bold text-decoration-none"
                        >
                            <svg className="bi" width={18} height={32} />
                            <span className="fs-4 text-white">DANH MỤC</span>
                        </a>
                    </div>
                    <hr />
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            {
                                detail?.roleDTOSetSet[0].name === 'ROLE_STORE_MANAGER' 
                                ?
                                <h2 className="accordion-header" id="headingOne">
                                <button
                                    className="accordion-button collapsed fs-5 fw-bold"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne"
                                    aria-expanded="true"
                                    aria-controls="collapseOne"
                                >
                                    Quản lý cửa hàng
                                </button>
                                </h2>
                                :
                                <h2 className="accordion-header" id="headingOne">
                                <button
                                    className="accordion-button fs-5 fw-bold collapsed text-muted"
                                    onClick={handleAuthority}
                                >
                                    Quản lý cửa hàng
                                </button>
                            </h2>
                            }
                            <div
                                id="collapseOne"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample">
                                <div className="nav-item">
                                    <a
                                        href="#"
                                        className="nav-link link-dark  text-truncate"
                                        aria-current="page"
                                    >
                                        Đăng thông báo
                                    </a>
                                </div>
                                <div className="nav-item ">
                                    <NavLink
                                        to='/statistics'
                                        className="nav-link link-dark  text-truncate"
                                        aria-current="page"
                                    >
                                        Xem thống kê
                                    </NavLink>
                                </div>
                                <div className="nav-item ">
                                    <NavLink
                                        
                                        className="nav-link link-dark  text-truncate"
                                        aria-current="page"
                                    >
                                        Quản lý nhân viên
                                    </NavLink>
                                </div>
                                <div className="nav-item ">
                                    <NavLink 
                                        to={'/customer'}
                                        className="nav-link link-dark  text-truncate"
                                        aria-current="page"
                                    >
                                        Quản lý khách hàng
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            {
                                detail?.roleDTOSetSet[0].name === 'ROLE_SALER' 
                                ||
                                detail?.roleDTOSetSet[0].name === 'ROLE_STORE_MANAGER'
                                ? 
                                <h2 className="accordion-header" id="headingTwo">
                                <button
                                    className="accordion-button text-truncate collapsed fs-5 fw-bold"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo"
                                    aria-expanded="false"
                                    aria-controls="collapseTwo"
                                >
                                    Nhân viên bán hàng
                                </button>
                            </h2> 
                            : 
                                 <h2 className="accordion-header" id="headingTwo">
                                <button
                                    className="accordion-button text-muted collapsed fs-5 fw-bold"
                                    onClick={handleAuthority}
                                >
                                    Nhân viên bán hàng
                                </button>
                            </h2> 
                            }
                            
                            <div
                                id="collapseTwo"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingTwo"
                                data-bs-parent="#accordionExample"
                            >
                                <div className="nav-item ">
                                    <NavLink
                                    to={'/product'}
                                        className="nav-link link-dark   text-truncate"
                                        aria-current="page"
                                    >
                                        Hàng trong kho
                                    </NavLink>
                                </div>
                                <div className="nav-item ">
                                    <NavLink to={'/invoice'}
                                        className="nav-link link-dark   text-truncate"
                                        aria-current="page"
                                    >
                                        Thanh toán
                                    </NavLink>
                                </div>
                                <div className="nav-item ">
                                    <a
                                        href="#"
                                        className="nav-link link-dark   text-truncate"
                                        aria-current="page"
                                    >
                                        Thống kê
                                    </a>
                                </div>
                                <div className="nav-item ">
                                    <a
                                        href="#"
                                        className="nav-link link-dark   text-truncate"
                                        aria-current="page"
                                    >
                                        Thông báo mới
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            {
                                 detail?.roleDTOSetSet[0].name === 'ROLE_WAREHOUSE_MANAGER' 
                                 ||
                                 detail?.roleDTOSetSet[0].name === 'ROLE_STORE_MANAGER'
                                 ? 
                                 <h2 className="accordion-header" id="headingThree">
                                 <button
                                     className="accordion-button collapsed link-dark text-truncate fs-5 fw-bold"
                                     type="button"
                                     data-bs-toggle="collapse"
                                     data-bs-target="#collapseThree"
                                     aria-expanded="false"
                                     aria-controls="collapseThree"
                                 >
                                     Quản lý kho hàng
                                 </button>
                             </h2>
                             :
                             <h2 className="accordion-header" id="headingThree">
                                 <button
                                     className="accordion-button collapsed link-dark text-muted fs-5 fw-bold"
                                     onClick={handleAuthority}
                                 >
                                     Quản lý kho hàng
                                 </button>
                             </h2>
                            }
                            
                            <div
                                id="collapseThree"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingThree"
                                data-bs-parent="#accordionExample"
                            >
                                <div className="nav-item ">
                                    <NavLink 
                                        to={'/product'}
                                        className="nav-link link-dark  text-truncate"
                                        aria-current="page"
                                    >
                                        Hàng trong kho
                                    </NavLink>
                                </div>
                                <div className="nav-item ">
                                    <a
                                        href="#"
                                        className="nav-link link-dark text-truncate"
                                        aria-current="page"
                                    >
                                        Nhập liệu
                                    </a>
                                </div>
                                <div className="nav-item ">
                                    <a
                                        href="#"
                                        className="nav-link link-dark text-truncate"
                                        aria-current="page"
                                    >
                                        Thống kê
                                    </a>
                                </div>
                                <div className="nav-item ">
                                    <a
                                        href="#"
                                        className="nav-link link-dark text-truncate"
                                        aria-current="page"
                                    >
                                        Thông báo mới
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="shadow-lg" style={{height: '10vh'}}>
                        <nav className="navbar navbar-expand-lg navbar-light bg-white pt-3">
                    {/* Container wrapper */}
                    <div className="container-fluid px-2">
                        <NavLink to={'/home'} className="navbar-brand ms-2 mt-2 mt-lg-0" href="#">
                            <img src="đ.png" height={40} alt="C10 Logo" loading="lazy" />
                        </NavLink>
                        {/* Toggle button */}
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-mdb-toggle="collapse"
                            data-mdb-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <i className="fas fa-bars" />
                        </button>
                    </div>
                    {/* Right elements */}
                    <div className="d-flex align-items-center me-3">
                        {/* Notifications */}
                        <div className="dropup">
                            <a
                                className="text-reset me-1 dropdown-toggle hidden-arrow"
                                href="#"
                                id="navbarDropdownMenuLink"
                                role="button"
                                data-mdb-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="fas fa-bell" />
                                <span className="badge rounded-pill badge-notification bg-danger">
                                    1
                                </span>
                            </a>
                            <ul
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdownMenuLink"
                            >
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Một vài tin tức
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Tin tức khác
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* Avatar */}
                        <div className="dropup">
                            <a
                                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                                id="navbarDropdownMenuAvatar"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src={detail?.avatar}
                                    className="rounded-circle border border-2 border-secondary"
                                    height={35}
                                    alt="avatar"
                                    loading="lazy"
                                />
                            </a>
                            <ul
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdownMenuAvatar"
                            >
                                <li>
                                    <NavLink to='/employee' className="dropdown-item">
                                        Thông tin cá nhân  
                                    </NavLink>
                                </li>
                                {/* <li>
                                    <a className="dropdown-item" href="#">
                                        Cài đặt
                                    </a>
                                </li> */}
                                <li>
                                    <button onClick={handleLogout} className="dropdown-item" href="#">
                                        Đăng xuất
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                        </nav>
                        </div>
            </div>
            {/* <div className="col-9 px-0" style={{
                position: 'fixed',
                right: 0,
                zIndex: 99
            }}>
                
            </div> */}
            <Outlet/>
        </>
    )
}