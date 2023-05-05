import {useEffect, useState} from "react";
import {
    findAllCustomer,
    findNumberOfOrder, findRevenueInMonth, findRevenueInWeek,
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
                break;
        }
    },[type]);
    return (
        <>
            {/* <div className="row mx-0"> */}
                <div className="col-3"></div>
                <div className="col-9 px-0 mt-3">
                    <div className="container p-5 py-3">
                        {/* Navbar */}
                     
                        {/* Navbar */}
                        <div className="row pt-3">
                            <div className="col-4 " style={{textAlign: "center"}}>
                                <div className="card text-center mb-3 shadow">
                                    <div className="card-body" style={{height: 184}}>
                                        <p className="card-title">
                                            <i className='bx bxs-user'></i>
                                        </p>
                                        <p className="card-text fs-5 fw-bold" style={{marginBottom: -8}}>Lượng khách</p>
                                        {
                                            customerList.map((value, index) => (
                                                <>
                                                    <p style={{fontSize: "xx-large",marginBottom: 1}}
                                                       key={index}>{value.current}</p>
                                                    <span style={{fontSize: "large"}}>{value.percent==null ? 0 :  value.percent}%</span>
                                                    <span
                                                        style={{fontSize: "large"}}> so với tuần trước</span>
                                                </>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 " style={{textAlign: "center"}}>
                                <div className="card text-center mb-3 shadow">
                                    <div className="card-body" style={{height: 184}}>
                                        <p className="card-title">
                                            <i className='bx bxs-pie-chart-alt-2'></i>
                                        </p>
                                        <p className="card-text fs-5 fw-bold" style={{marginBottom: -8}}>Đơn hàng</p>
                                        {
                                            orderList.map((ol, index) => (
                                                <>
                                                    <p style={{fontSize: "xx-large",marginBottom: 1}}
                                                       key={index}>{ol.current}</p>
                                                    <span style={{fontSize: "large"}}>{ol.percent==null ? 0 :  ol.percent}%</span>
                                                    <span
                                                        style={{fontSize: "large"}}> so với tuần trước</span>
                                                </>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-4" style={{textAlign: "left"}}>
                                <div className="card mb-3 shadow">
                                    <div className="card-body" style={{height: 184}}>
                                        <div className="row mb-3">
                                            <div className="col-6">
                                                <p className="card-text fs-5 fw-bold">Doanh thu</p>
                                            </div>
                                            <div className="col-6">
                                                <select onChange={handleChange}
                                                        aria-label="Default select example "
                                                        style={{width: 98,height:24,borderRadius:12}}
                                                >
                                                    <option value={1}>Tuần này</option>
                                                    <option value={2}>Tháng này</option>
                                                </select>
                                            </div>
                                        </div>

                                        <h3>{revenueList}</h3>
                                        <p className="fs-5 fw-bold">Tổng doanh thu</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row match-height">
                            {/* Company Table Card */}
                            <div className="col-12">
                                <div className="card card-company-table shadow">
                                    <div className="card-body p-0">
                                        <div className="table-responsive">
                                            <div className="fw-bold fs-5 text-white text-center pt-3 pb-3" 
                                            style={{background:'#183661'}}>
                                                Top 5 nhân viên bán hàng tốt nhất
                                            </div>
                                            <table className="table align-middle mb-0 bg-white ">
                                                <thead className="bg-light">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Họ và tên</th>
                                                    <th>Giá</th>
                                                    <th>Số lượng</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {employeeList?.map((el,index)=>(
                                                <tr  key={index}>
                                                    <td>{index+1}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div>
                                                                <div >{el.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{el.payment}</td>
                                                    <td className="text-nowrap">
                                                        <div className="d-flex flex-column">
                                                            <span className=" mb-25">{el.total}</span>
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
                            <div className="col-12">
                                <div
                                    className="card card-user-timeline shadow"
                                    style={{marginTop: 24}}
                                >
                                    <div className="card-body px-0 py-0">
                                        <ul className="timeline ms-50 px-0">
                                            <div className="fw-bold fs-5 text-center pt-3 text-white pb-3"
                                            style={{background:'#183661'}}>
                                                Top 5 mặt hàng bán chạy nhất
                                            </div>
                                            {
                                                productList.map((pl,index)=>(
                                            <li className="timeline-item" key={index}>
                                                <span className="timeline-point timeline-point-indicator"/>
                                                <div className="timeline-event">
                                                    <p>{pl.name}</p>
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
            {/* </div> */}                            
        </>


    )
}
