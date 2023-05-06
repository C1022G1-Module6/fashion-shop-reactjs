import React, { useEffect, useState } from 'react'
import { Field, Form, Formik } from 'formik'
import customerService from "../../service/customer/CustomerService";
import customerTypeService from "../../service/customer/CustomerTypeService";
import ReactPaginate from 'react-paginate';
import { NavLink, useNavigate } from 'react-router-dom';
import CustomerDelete from "./CustomerDelete";

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

    useEffect(() => {
        document.title = "Danh sách khách hàng"; // Thay đổi title
    }, []);

    const search = async (value) => {
        let showTable = document.getElementById("showTable")
        let errMsg = document.getElementById("error")
        try {
            const rs = await customerService.search(value.name, value.page)
            setCurrentPage(rs.data.number)
            setCustomerTypeList(value.customerTypeDTO)
            setName(value.name)
            const { totalPages } = rs.data;
            setPageCount(totalPages)
            setCustomerList(rs.data.content)
            setCount(Math.ceil(rs.data.size * rs.data.number + 1))
            showTable.style.display = 'block'
            errMsg.style.display = 'none'
        } catch (e) {
            console.log(e)
            showTable.style.display = 'none'
            errMsg.innerHTML = "Danh sách trống"
            errMsg.style.display = 'block'
        }
    }

    // useEffect(() => {
    //     search()
    // }, [err]);

    const showList = async () => {
        const rs = await customerService.search(name, currentPage)
        setCustomerList(rs.data.content)
        const { totalPages } = rs.data;
        setPageCount(totalPages)
    }

    const showCustomerType = async () => {
        const rs = await customerTypeService.findAll()
        setCustomerTypeList(rs.data)
    }

    useEffect(() => {
        showList();
        showCustomerType();
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
    console.log(customerList)


    return (
        <>
            <div className='row mx-0'>
                <div className='col-3'></div>
                <div className="container mx-auto my-5 col-8" >
                    <div style={{ boxShadow: "1px 3px 10px 5px rgba(0, 0, 0, 0.2)" }}>
                        {
                            customerList.data !== "" &&
                            <>
                                <div style={{ marginBottom: 20 }}>
                                    <h2 className="d-flex justify-content-center"
                                        style={{ padding: 16, backgroundColor: "#183661", color: "#fff" }}>
                                        DANH SÁCH KHÁCH HÀNG
                                    </h2>
                                </div>
                                <h2 id='error' className={'text-center text-danger'} style={{ display: 'none' }}></h2>
                                <div id='showTable'>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="d-flex justify-content-center">
                                                <table className="table table-striped table-hover"
                                                    style={{ width: "85%" }}>
                                                    <thead>
                                                        <tr>
                                                            <th>STT</th>
                                                            <th>Mã KH</th>
                                                            <th>Tên KH</th>
                                                            <th>Email</th>
                                                            <th>GT</th>
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
                                                                    <td style={{width:'5%'}}>{count++}</td>
                                                                    <td style={{width:'15%'}}>{customer.code}</td>
                                                                    <td style={{width:'30%'}} className="text-cut">{customer.name}</td>
                                                                    <td style={{width:'15%'}} className="text-cut">{customer.email}</td>
                                                                    <td style={{width:'5%'}}>{customer.gender ? 'Nam' : 'Nữ'}</td>
                                                                    <td style={{width:'5%'}}>{customer.point}</td>
                                                                    <td style={{width:'5%'}}>{customer.customerTypeDTO.name}</td>
                                                                    <td style={{width:'20%'}}>
                                                                        <NavLink 
                                                                            to={`/customer/edit/${customer.id}`} 
                                                                            className="btn btn-outline-primary">
                                                                            <i className="bi bi-pencil-square" />
                                                                        </NavLink>
                                                                        <button type="button"
                                                                            className="btn btn-outline-danger"
                                                                            onClick={() => getPropsDeleteCustomer(customer.id, customer.name)}
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#deleteCustomer">
                                                                            <i className="bi bi-trash3" />
                                                                        </button>
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
                                            pageRangeDisplayed={2} // Hiển thị 3 trang trên mỗi lần render
                                            marginPagesDisplayed={1} // Hiển thị 1 trang ở đầu và cuối danh sách trang
                                        />
                                    </div>
                                </div>


                                <div className="row" style={{ marginBottom: 50 }}>
                                    <div className="col-md-9">
                                        <Formik
                                            initialValues={{
                                                name: '',
                                                page: currentPage
                                            }}
                                            onSubmit={(value) => {
                                                search(value)
                                            }}
                                        >
                                            <Form className="d-flex justify-content-center" role="search"
                                                style={{ marginLeft: "200px", marginTop: "25px" }}>
                                                <button className="btn btn-outline-secondary" type="submit"><i
                                                    className="bi bi-search" />
                                                </button>
                                                <Field style={{ width: "90%", marginLeft: "15px" }}
                                                    type="search"
                                                    className="form-control float-start"
                                                    name="name"
                                                    placeholder="Tìm kiếm mã, tên, số điện thoại" />
                                            </Form>
                                        </Formik>
                                    </div>
                                    <div className="col-md-3 mb-5">
                                        <div>
                                            <NavLink
                                                to='/customer/create'
                                                type="button"
                                                className="btn btn-outline-primary mt-4"
                                                style={{ width: 150 }}>
                                                <i className="bi bi-plus-square" /> Thêm mới
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>


                            </>
                        }
                        <CustomerDelete
                            id={deleteId}
                            name={deleteName}
                            showList={() => {
                                showList();
                            }}
                        />
                    </div>

                </div>
            </div>

        </>
    )
}