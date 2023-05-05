import {useEffect, useState} from "react";
import {
    findAllCustomer,
    findNumberOfOrder, findRevenue, findRevenueInMonth, findRevenueInWeek,
    findTopEmployees,
    findTopProduct
} from "../../service/statiscial/statiscialService";
import "./management.css"
export default function ManagementPage() {
    const [customerList, setCustomerList] = useState([])
    const [orderList, setOrderList] = useState([])
    const [employeeList, setEmployeeList] = useState([])
    const [productList, setProductList] = useState([])
    const [revenueList, setRevenueList] = useState(null)
    const [revenue, setRevenue] = useState(null)
    const [type, setType] = useState()

    useEffect(() => {
            const listCustomer = async () => {
                const rs = await findAllCustomer();
                setCustomerList(rs.data);
            }
            const listOrder = async () => {
                const rs = await findNumberOfOrder();
                setOrderList(rs.data);
            }
            const listEmployees = async () => {
                const rs = await findTopEmployees();

                setEmployeeList(rs.data);
            }
            const listProduct = async () => {
                const rs = await findTopProduct();

                setProductList(rs.data);
            }
            const revenue = async () => {
                const rs = await findRevenue();
                setRevenue(rs.data);
            }
            revenue();
            listCustomer();
            listOrder();
            listEmployees();
            listProduct();
        },
        [])

    const revenueWeek = async () => {
        const rw = await findRevenueInWeek();
        setRevenueList(rw.data);
    }
    const revenueMonth = async () => {
        const rm = await findRevenueInMonth();
        setRevenueList(rm.data);
    }
    const handleChange = event => {
        setType(event.target.value);
    };

    useEffect(() => {
        switch (type) {
            case "1":
                revenueWeek();
                break;
            case "2":
                revenueMonth();
                break;
            default:
                revenueWeek();
        }
    },[type]);
    let stt =1;
    return (
        <>
            <div className="row mx-0">
                <div className="col-lg-3 col-md-4 col-sm-6 shadow px-0">
                    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light h-100 w-100">
                        <div style={{backgroundColor: "#183661"}}>
                            <a
                                href="/"
                                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-black fw-bold text-decoration-none"
                            >
                                <svg className="bi" width={40} height={32}/>
                                <span className="fs-4 text-white">DANH MỤC</span>
                            </a>
                        </div>
                        <hr/>
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button
                                        className="accordion-button"
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
                                    data-bs-parent="#accordionExample"
                                >
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
                                            href="#"
                                            className="nav-link link-dark  text-truncate"
                                            aria-current="page"
                                        >
                                            Xem thống kê
                                        </a>
                                    </div>
                                    <div className="nav-item ">
                                        <a
                                            href="#"
                                            className="nav-link link-dark  text-truncate"
                                            aria-current="page"
                                        >
                                            Quản lý nhân viên
                                        </a>
                                    </div>
                                    <div className="nav-item ">
                                        <a
                                            href="#"
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
                                        className="accordion-button collapsed"
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
                                            href="#"
                                            className="nav-link link-dark   text-truncate"
                                            aria-current="page"
                                        >
                                            Tra cứu thông tin hàng hóa
                                        </a>
                                    </div>
                                    <div className="nav-item ">
                                        <a
                                            href="#"
                                            className="nav-link link-dark   text-truncate"
                                            aria-current="page"
                                        >
                                            Lập phiếu thanh toán
                                        </a>
                                    </div>
                                    <div className="nav-item ">
                                        <a
                                            href="#"
                                            className="nav-link link-dark   text-truncate"
                                            aria-current="page"
                                        >
                                            Lập thống kê bán hàng
                                        </a>
                                    </div>
                                    <div className="nav-item ">
                                        <a
                                            href="#"
                                            className="nav-link link-dark   text-truncate"
                                            aria-current="page"
                                        >
                                            Xem thông báo
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button
                                        className="accordion-button collapsed link-dark text-truncate"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree"
                                        aria-expanded="false"
                                        aria-controls="collapseThree"
                                    >
                                        Quản lý kho hàng
                                    </button>
                                </h2>
                                <div
                                    id="collapseThree"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="headingThree"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="nav-item ">
                                        <a
                                            href="#"
                                            className="nav-link link-dark  text-truncate"
                                            aria-current="page"
                                        >
                                            Tra cứu thông tin hàng hóa
                                        </a>
                                    </div>
                                    <div className="nav-item ">
                                        <a
                                            href="#"
                                            className="nav-link link-dark text-truncate"
                                            aria-current="page"
                                        >
                                            Lập phiếu nhập kho
                                        </a>
                                    </div>
                                    <div className="nav-item ">
                                        <a
                                            href="#"
                                            className="nav-link link-dark text-truncate"
                                            aria-current="page"
                                        >
                                            Lập thống kê nhập hàng
                                        </a>
                                    </div>
                                    <div className="nav-item ">
                                        <a
                                            href="#"
                                            className="nav-link link-dark text-truncate"
                                            aria-current="page"
                                        >
                                            Xem thông báo
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" col-md-9 px-0">
                    <div className="container p-5 py-3">
                        {/* Navbar */}
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            {/* Container wrapper */}
                            <div className="container-fluid">
                                <a className="navbar-brand mt-2 mt-lg-0" href="#">
                                    <img src="/img/logo.png" height={15} alt="C10 Logo" loading="lazy"/>
                                </a>
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
                                    <i className="fas fa-bars"/>
                                </button>
                            </div>
                            {/* Right elements */}
                            <div className="d-flex align-items-center">
                                {/* Notifications */}
                                <div className="dropdown">
                                    <a
                                        className="text-reset me-3 dropdown-toggle hidden-arrow"
                                        href="#"
                                        id="navbarDropdownMenuLink"
                                        role="button"
                                        data-mdb-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="fas fa-bell"/>
                                        <span className="badge rounded-pill badge-notification bg-danger">
                                          1
                                          </span>
                                    </a>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end"
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
                                <div className="dropdown">
                                    <a
                                        className="dropdown-toggle d-flex align-items-center hidden-arrow"
                                        href="#"
                                        id="navbarDropdownMenuAvatar"
                                        role="button"
                                        data-mdb-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                            className="rounded-circle"
                                            height={25}
                                            alt="Black and White Portrait of a Man"
                                            loading="lazy"
                                        />
                                    </a>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="navbarDropdownMenuAvatar"
                                    >
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                Thông tin của tôi
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                Cài đặt
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                Đăng xuất
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        {/* Navbar */}
                        <div className="row pt-3">
                            <div className="col-xs-6 col-md-4" style={{textAlign: "center"}}>
                                <div className="card text-center mb-3 shadow">
                                    <div className="card-body" style={{height: 184}}>
                                        <p className="card-title">
                                            <i className='bx bxs-user'></i>
                                        </p>
                                        <p className="card-text" style={{marginBottom: -8}}>Lượng khách</p>
                                        {
                                            customerList.map((value, index) => (
                                                <>
                                                    <p style={{fontSize: "xx-large",marginBottom: 1}}
                                                       key={index}>{value.current}</p>
                                                    <span style={{fontSize: "medium"}}>{value.percent > 0 ? " tăng " : " giảm "}{value.percent} %</span>
                                                    <span
                                                        style={{fontSize: "medium"}}> so với tuần trước</span>
                                                </>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-6 col-md-4 " style={{textAlign: "center"}}>
                                <div className="card text-center mb-3 shadow">
                                    <div className="card-body" style={{height: 184}}>
                                        <p className="card-title">
                                            <i className='bx bxs-pie-chart-alt-2'></i>
                                        </p>
                                        <p className="card-text" style={{marginBottom: -8}}>Đơn hàng</p>
                                        {
                                            orderList.map((ol, index) => (
                                                <div>
                                                    <p style={{fontSize: "xx-large",marginBottom: 1}}
                                                       key={index}>{ol.current}</p>
                                                    <span style={{fontSize: "medium"}}> {ol.percent > 0 ? " tăng " : " giảm "}
                                                        {ol.percent} % so với tuần trước</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-6 col-md-4" style={{textAlign: "left"}}>
                                <div className="card mb-3 shadow">
                                    <div className="card-body" style={{height: 184}}>
                                        <div className="row mb-3">
                                            <div className="col-6">
                                                <p className="card-text">Doanh thu</p>
                                            </div>
                                            <div className="col-6">
                                                <select onChange={handleChange}
                                                        aria-label="Default select example"
                                                        style={{width: 98,height:24}}>
                                                    <option value={1}>Tuần này</option>
                                                    <option value={2}>Tháng này</option>
                                                </select>
                                            </div>
                                        </div>

                                        <h3 style={{textAlign: "center"}}>{revenueList?.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}</h3>
                                        <p>Tổng doanh thu</p>
                                        <h4
                                            style={{ textAlign: "center", marginTop: "-15px" }}
                                        >{revenue?.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row match-height">
                            {/* Company Table Card */}
                            <div className="col-xs-12">
                                <div className="card card-company-table shadow">
                                    <div className="card-body p-0">

                                            <div className="fw-bold fs-5 text-center pt-3">
                                                Top 5 nhân viên bán hàng tốt nhất theo {employeeList[4]?.quarter}
                                            </div>


                                        <div className="table-responsive">
                                            <table className="table align-middle mb-0 bg-white ">
                                                <thead className="bg-light">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Họ và tên</th>
                                                    <th>Doanh thu</th>
                                                    <th>Tổng số lượng</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {employeeList?.map((el,index)=>(
                                                <tr  >
                                                    <td>{stt++}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div>
                                                                <div >{el.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{el.payment?.toLocaleString("vi-VN", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    })}</td>
                                                    <td className="text-nowrap">
                                                        <div className="d-flex flex-column">
                                                            <span className=" mb-25">{el.total} sản phẩm</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                ))}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row match-height">
                            <div className="col-xs-12">
                                <div
                                    className="card card-user-timeline shadow"
                                    style={{marginTop: 24}}
                                >
                                    <div className="card-body ">
                                        <ul className="timeline ms-50">
                                            <div className="fw-bold fs-5 text-center pt-3">
                                                Top 5 mặt hàng bán chạy nhất theo quý {productList[4]?.quarter}
                                            </div>
                                            {
                                                productList.map((pl,index)=>(
                                            <li className="timeline-item" key={index}>
                                                <span className="timeline-point timeline-point-indicator" style={{marginTop:8}}/>
                                                <div className="timeline-event" style={{marginTop : 9}}>
                                                    <p>{pl.name}</p>
                                                </div>
                                                <div style={{marginTop :-16,fontSize: "smaller" }}>
                                                    <span>Tổng số lượng bán: </span>
                                                    <span>{pl.quantity} sản phẩm</span>

                                                </div>
                                            </li>
                                                ))
                                            }
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>


    )
}

