import React, {useEffect, useState} from 'react'
import {Field, Form, Formik} from 'formik'
import customerService, {search} from "../../service/customer/CustomerService";
import customerTypeService from "../../service/customer/CustomerTypeService";
import ReactPaginate from 'react-paginate';
import {useNavigate} from 'react-router-dom';
import CustomerDelete from "./CustomerDelete";
import './Customer.css';

export default function CustomerList() {
    const [customerList, setCustomerList] = useState([])
    const [customerTypeList, setCustomerTypeList] = useState([])
    const [pageCount, setPageCount] = useState(0)
    let [count, setCount] = useState(1)
    const [currentPage, setCurrentPage] = useState(0)
    const [name, setName] = useState('');
    const [deleteId, setDeleteId] = useState(0)
    const [deleteName, setDeleteName] = useState("")
    const navigate = useNavigate();
    const  [err,setErr] = useState(false)
        useEffect(() => {
            document.title = "Danh sách khách hàng"; // Thay đổi title
        }, []);
    const search = async (value) => {
        try {
            const rs = await customerService.search(value.name, value.page)
            setCurrentPage(rs.data.number)
            setCustomerTypeList(value.customerTypeDTO)
            setName(value.name)
            const {totalPages} = rs.data;
            setPageCount(totalPages)
            setCustomerList(rs.data.content)
            setCount(Math.ceil(rs.data.size * rs.data.number + 1))
            console.log(rs)
        }catch (e) {
            console.log(e)
            setErr(true)
            if (e.response.data===""){
                document.getElementById("error").innerHTML=`Không tìm thấy tên này ${value.name}`
            }else {
                document.getElementById("error").innerHTML=""
            }

        }
    }
    useEffect(() => {
        search()
    }, [err]);
    const showList = async () => {
        const rs = await customerService.search(name, currentPage)
        setCustomerList(rs.data.content)
        const {totalPages} = rs.data;
        setPageCount(totalPages)
    }

    const showCustomerType = async () => {
        const rs = await customerTypeService.findAll()
        setCustomerTypeList(rs.data)
    }

    console.log(pageCount)
    useEffect(() => {
        showList();
        showCustomerType();
        setErr(false)
    }, []);

    const handlePageClick = async (page) => {
        setCurrentPage(page.selected)
        const rs = await customerService.search(name, page.selected)
        setCustomerList(rs.data.content)
        setCount(Math.ceil(rs.data.size * page.selected + 1))
    }

    const getPropsDeleteCustomer = (id, name) => {
        setDeleteId(id);
        setDeleteName(name);
    }
    // const [isEmpty, setIsEmpty] = useState(false);
    //
    // const handleSearch = async (value) => {
    //     const rs = await customerService.search(value.name, value.page);
    //     if (rs.data.content.length === 0) {
    //         setIsEmpty(true);
    //     } else {
    //         setIsEmpty(false);
    //         setCurrentPage(rs.data.number);
    //         setCustomerTypeList(value.customerTypeDTO);
    //         setName(value.name);
    //         const {totalPages} = rs.data;
    //         setPageCount(totalPages);
    //         setCustomerList(rs.data.content);
    //         setCount(Math.ceil(rs.data.size * rs.data.number + 1));
    //     }
    // };
    console.log(customerList)


    return (
        <>

            <div className="container mx-auto my-5" style={{width: "80%"}}>
                <div style={{boxShadow: "1px 3px 10px 5px rgba(0, 0, 0, 0.2)"}}>
                    {
                        customerList.data !== "" &&
                        <>
                            <div style={{marginBottom: 20}}>
                                <h2 className="d-flex justify-content-center"
                                    style={{padding: 16, backgroundColor: "#183661", color: "#fff"}}>
                                    DANH SÁCH KHÁCH HÀNG
                                </h2>
                            </div>
                            {
                                    err ?
                                    <h2 id='error' className={'text-center text-danger'}></h2> :
                                    <>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="d-flex justify-content-center">
                                                <table className="table table-striped table-hover" style={{width: "85%"}}>
                                                    <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Mã KH</th>
                                                        <th>Tên KH</th>
                                                        <th>Email</th>
                                                        <th>Giới tính</th>
                                                        <th>Điểm</th>
                                                        <th>Bậc</th>
                                                        {/*<th>Chỉnh sửa</th>*/}
                                                        {/*<th>Xoá</th>*/}
                                                        <th>Chức năng</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        customerList.map((customer, index) => (
                                                            <tr key={index}>
                                                                <td>{count++}</td>
                                                                <td>{customer.code}</td>
                                                                <td className="text-cut">{customer.name}</td>
                                                                <td className="text-cut">{customer.email}</td>
                                                                <td>{customer.gender ? 'Nam' : 'Nữ'}</td>
                                                                <td>{customer.point}</td>
                                                                <td>{customer.customerTypeDTO.name}</td>
                                                                <td className="row">
                                                                    <div className="col-6">
                                                                        <button type="button"
                                                                                className="btn btn-outline-primary">
                                                                            <i className="bi bi-pencil-square"/>
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <button type="button" className="btn btn-outline-danger"
                                                                                onClick={() => getPropsDeleteCustomer(customer.id, customer.name)}
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#deleteCustomer">
                                                                            <i className="bi bi-trash3"/>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=' d-flex justify-content-center'>
                                        <ReactPaginate
                                            previousLabel="Trước"
                                            nextLabel="Sau"
                                            pageCount={pageCount}
                                            onPageChange={handlePageClick}
                                            containerClassName="pagination"
                                            previousClassName="page-item"
                                            previousLinkClassName="page-link"
                                            nextClassName="page-item"
                                            nextLinkClassName="page-link"
                                            pageClassName="page-item"
                                            pageLinkClassName="page-link"
                                            activeClassName="active"
                                            activeLinkClassName="page-link"
                                            forcePage={currentPage}
                                            pageRangeDisplayed={3} // Hiển thị 3 trang trên mỗi lần render
                                            marginPagesDisplayed={1} // Hiển thị 1 trang ở đầu và cuối danh sách trang
                                        />
                                    </div>
                                        </>
                            }

                            <div className="row" style={{marginBottom: 50}}>
                                <div className="col-md-9">
                                    <Formik initialValues={{
                                        code: '',
                                        name: '',
                                        phoneNumber: '',
                                        page: currentPage
                                    }}
                                            onSubmit={(value) => {
                                                search(value)
                                            }}
                                    >
                                        <Form className="d-flex justify-content-center" role="search"
                                              style={{marginLeft: "200px", marginTop: "25px"}}>
                                            <button className="btn btn-outline-secondary" type="submit"><i
                                                className="bi bi-search"/>
                                            </button>
                                            <Field style={{width: "90%", marginLeft: "15px"}}
                                                   type="search"
                                                   className="form-control float-start"
                                                   name="name"
                                                   placeholder="Tìm kiếm mã, tên, số điện thoại"/>
                                        </Form>
                                    </Formik>
                                </div>
                                <div className="col-md-3">
                                    <div>
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary"
                                            style={{width: 150}}>
                                            <i className="bi bi-plus-square"/> Thêm mới
                                        </button>
                                    </div>
                                    <div style={{marginTop: 15, marginBottom: 20}}>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            style={{width: 150}}>
                                            Cài đặt nhóm
                                        </button>
                                    </div>
                                </div>
                            </div>


                        </>
                    }
                    <h2 id='searchName' className='text-danger text-center'>
                    </h2>
                    <CustomerDelete
                        id={deleteId}
                        name={deleteName}
                        showList={() => {
                            showList();
                        }}
                    />
                </div>

            </div>
        </>
    )
}