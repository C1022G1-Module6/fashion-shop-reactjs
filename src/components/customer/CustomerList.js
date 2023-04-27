import React, {useEffect, useState} from 'react'
import customerService from "../../service/customer/CustomerService";
import customerTypeService from "../../service/customer/CustomerTypeService";
import {Field, Form, Formik} from 'formik';
import ReactPaginate from 'react-paginate';

export default function CustomerList() {
    const [customerList, setCustomerList] = useState([])
    const [customerTypeList, setCustomerTypeList] = useState([])
    const [pageCount, setPageCount] = useState(0)
    let [count, setCount] = useState(1)
    const [currentPage, setCurrentPage] = useState(0)
    const [name, setName] = useState('');
    const [deleteId, setDeleteId] = useState(0)
    const [deleteName, setDeleteName] = useState('')

    const showList = async () => {
        const rs = await customerService.search( name, currentPage)
        setCustomerList(rs.data.content)

        setPageCount(rs.data.totalPages)
    }
    const showCustomerType = async () => {
        const rs = await customerTypeService.findAll()
        setCustomerTypeList(rs.data)
    }
    console.log(pageCount)
    useEffect(() => {
        showList();
        showCustomerType();
    }, [])

    const handlePageClick = async (page) => {
        setCurrentPage(page.selected)
        const rs = await customerService.search( name, page.selected )
        setCustomerList(rs.data.content)
        setCount(Math.ceil(rs.data.size * page.selected + 1))
    }

    const getId = (id, name) => {
        setDeleteId(id)
        setDeleteName(name)
    }

    const handleDelete = async (id) => {
        await customerService.remove(id)
        alert("Xóa thành công")
        showList()
    }
    return (
        <>
            <div className="container mx-auto my-5" style={{width: "70%"}}>
                <div style={{boxShadow: "1px 3px 10px 5px rgba(0, 0, 0, 0.2)"}}>
                    <Formik initialValues={{
                        code: '',
                        name: '',
                        phoneNumber: '',
                        page: currentPage
                    }}
                            onSubmit={(value) => {
                                const showList = async () => {
                                    console.log(value.page);
                                    const rs = await customerService.search(value.name, value.page)
                                    if (rs.data.content == '') {
                                        document.getElementById('searchName').innerHTML = 'Không tìm thấy tên ' + value.name
                                    } else {
                                        document.getElementById('searchName').innerHTML = ''
                                    }
                                    setCurrentPage(rs.data.number)
                                    setCustomerTypeList(value.customerTypeDTO)
                                    setName(value.name)
                                    setPageCount(rs.data.totalPages)
                                    setCustomerList(rs.data.content)
                                    setCount(Math.ceil(rs.data.size * rs.data.number + 1))
                                }
                                showList()
                            }}
                    >
                    </Formik>
                    {
                        customerList != '' &&
                        <>
                            <div style={{marginBottom: 20}}>
                                <h2 className="d-flex justify-content-center"
                                    style={{padding: 16, backgroundColor: "#183661", color: "#fff"}}>
                                    DANH SÁCH KHÁCH HÀNG
                                </h2>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="d-flex justify-content-center">
                                        <table className="table table-striped table-hover" style={{width: "80%"}}>
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
                                                <th>Xoá</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                customerList.map((customer, index) => (
                                                    <tr key={index}>
                                                        <td scope="row">{count++}</td>
                                                        <td>{customer.code}</td>
                                                        <td>{customer.name}</td>
                                                        <td>{customer.email}</td>
                                                        <td>{customer.gender}</td>
                                                        <td>{customer.point}</td>
                                                        <td>{customer.customerTypeDTO.name}</td>
                                                        <td>
                                                            <button type="button" className="btn btn-danger"
                                                                    onClick={() => getId(customer.id, customer.name)}
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#exampleModal">
                                                                Xóa
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
                                    containerClassName='pagination'
                                    previousClassName='page-item'
                                    previousLinkClassName='page-link'
                                    nextClassName='page-item'
                                    nextLinkClassName='page-link'
                                    pageClassName='page-item'
                                    pageLinkClassName='page-link'
                                    activeClassName='active'
                                    activeLinkClassName='page-link'
                                    forcePage={currentPage}
                                />
                            </div>
                            <div className="row" style={{marginBottom: 50}}>
                                <div className="col-md-8">
                                    <Form className="d-flex justify-content-center" role="search"
                                          style={{marginLeft: 200, marginTop: 25}}>
                                        <button className="btn btn-outline-secondary" type="submit">
                                            <i className="bi bi-search"/>
                                        </button>

                                        <Field type="text"
                                               className="form-control float-start w-50"
                                               name="name"
                                               placeholder="Tìm kiếm..."/>
                                    </Form>
                                </div>
                                <div className="col-md-4">
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
                </div>
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close">
                                </button>
                            </div>
                            <div className="modal-body">
                                Bạn có chắc chắn muốn xóa <span className='text-danger'>{deleteName}</span>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                <button type="button" data-bs-dismiss="modal" onClick={() => handleDelete(deleteId)}
                                        className="btn btn-primary">Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}