import "./statiscial/management.css"
export default function LeftSideBar() {

    return (
        <>
            <div className="col-lg-3 col-md-4 col-sm-6  px-0 fixed-top "
                 style={{ height: '90vh' }}
            >
                <div className="flex-column flex-shrink-0 p-3 bg-light shadow-lg h-100 w-100">
                    <div style={{ backgroundColor: "#183661", height: 50 }} >
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

                                    <h2 className="accordion-header" id="headingOne">
                                        <button
                                            className="accordion-button fs-5 fw-bold"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                        >
                                            Quản lý cửa hàng
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseOne"
                                        className="accordion-collapse collapse show"
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
                                            <a
                                                to='/statistics'
                                                className="nav-link link-dark  text-truncate"
                                                aria-current="page"
                                            >
                                                Xem thống kê
                                            </a>
                                        </div>
                                        <div className="nav-item ">
                                            <a

                                                className="nav-link link-dark  text-truncate"
                                                aria-current="page"
                                            >
                                                Quản lý nhân viên
                                            </a>
                                        </div>
                                        <div className="nav-item ">
                                            <a
                                                to='/customer'
                                                className="nav-link link-dark  text-truncate"
                                                aria-current="page"
                                            >
                                                Quản lý khách hàng
                                            </a>
                                        </div>
                                    </div>
                        </div>
                        <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                            <button
                                                className="accordion-button collapsed text-truncate fs-5 fw-bold"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseTwo"
                                                aria-expanded="false"
                                                aria-controls="collapseTwo"
                                            >
                                                Nhân viên bán hàng
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseTwo"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingTwo"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="nav-item ">
                                                <a
                                                    to={'/product'}
                                                    className="nav-link link-dark   text-truncate"
                                                    aria-current="page"
                                                >
                                                    Hàng trong kho
                                                </a>
                                            </div>
                                            <div className="nav-item ">
                                                <a to={'/invoice'}
                                                         className="nav-link link-dark   text-truncate"
                                                         aria-current="page"
                                                >
                                                    Thanh toán
                                                </a>
                                            </div>
                                            <div className="nav-item ">
                                                <a
                                                    to='/statistics'
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

                                        <h2 className="accordion-header" id="headingThree">
                                            <button
                                                className="accordion-button link-dark text-truncate fs-5 fw-bold"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseThree"
                                                aria-expanded="true"
                                                aria-controls="collapseThree"
                                            >
                                                Quản lý kho hàng
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseThree"
                                            className="accordion-collapse collapse show"
                                            aria-labelledby="headingThree"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="nav-item ">
                                                <a
                                                    to={'/product'}
                                                    className="nav-link link-dark  text-truncate"
                                                    aria-current="page"
                                                >
                                                    Hàng trong kho
                                                </a>
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
                                                    to='/statistics'
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
                <div className="shadow-lg" style={{ height: '10vh' }}>
                    <nav className="navbar navbar-expand-lg navbar-light bg-white pt-3">
                        {/* Container wrapper */}
                        <div className="container-fluid px-2">
                                <img src="/img/logo.png" height={40} alt="C10 Logo" loading="lazy" />
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
                                        src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
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
                                            Thông tin cá nhân
                                    </li>
                                    {/* <li>
                                    <a className="dropdown-item" href="#">
                                        Cài đặt
                                    </a>
                                </li> */}
                                    <li>
                                        <button  className="dropdown-item" href="#">
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
        </>
    )
}