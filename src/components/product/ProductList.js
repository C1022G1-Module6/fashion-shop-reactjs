import React, {useEffect, useState} from "react";
import productTypeService from "../../service/product/ProductTypeService";
import productService from "../../service/product/ProductService";
import ListModal from "../../modal/ListModal";
import {NavLink} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import ReactPaginate from "react-paginate";

function ListProduct() {
    const [products, setProducts] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [detailId, setDetailId] = useState()
    const [currentPage, setCurrentPage] = useState(0)
    const [productDetails, setProductDetails] = useState([])
    const [productFilter, setProductFilter] = useState({
        name: "",
        page: 0
    })
    const [productTypeName,setProductTypeName] = useState('')
    const [productTy, setProductTy] = useState({
        name: "",
        page: 0
    })
    const [flag, setFlag] = useState(false);

    const handleTransferId = (id) => {
        setDetailId(id)
    }

    const handleGetListByType = async (e) => {
        // console.log({
        //     name: +e.target.value,page:currentPage
        // })

        const newProductFilter = {name: +e.target.value,page:currentPage}
        const productsResponse = await productService.searchWithType(newProductFilter);
        setProducts(productsResponse.data.content)
        setPageCount(productsResponse.data.totalPages)
        setFlag(true)
        setProductTypeName(+e.target.value)
    }
    useEffect(() => {
        const getProductDetails = async () => {
            const productDetailsResponse = await productService.getAllProductDetail(detailId)
            setProductDetails(productDetailsResponse.data)
        }
        getProductDetails();
    }, [detailId])

    useEffect(() => {
        const getProducts = async () => {
            const productsResponse = await productService.search(productFilter);
            setPageCount(productsResponse.data.totalPages)
            setProducts(productsResponse.data.content)
            setFlag(false)
        }
        getProducts();
    }, [productFilter])

    useEffect(() => {
        const getProductType = async () => {
            const productTypeData = await productTypeService.findAllType();
            setProductTypes(productTypeData.data);
        };

        getProductType()

    }, [])

    const handlePageClick = async (page) => {
        console.log(productTypeName)
        setCurrentPage(page.selected)
        if (!flag) {
            setProductFilter({
                name : productFilter.name,
                page: `${page.selected}`
            })
        } else {
            const newProductFilter = {name:productTypeName,page:page.selected}
            const productsResponse = await productService.searchWithType(newProductFilter);
            setProducts(productsResponse.data.content)
        }
    }

    return (

        <div>
            <div>
                <div className="container mt-5">
                    <div className="card shadow-lg">
                        <div
                            className="card-header text-white"
                            style={{backgroundColor: "#183661"}}
                        >
                            <h2 className="text-center">HÀNG TRONG KHO</h2>
                        </div>
                        <div className="card-body">
                            <div className="mb-3 d-flex justify-content-between">
                                <div>
                                  <NavLink to={`/AddNewProduct`}>  <button  type="button" className="btn btn-outline-primary w-100">

                                      <i className="bi bi-plus-square"/> Thêm mới
                                  </button>
                                  </NavLink>
                                </div>
                                <select onChange={(e) => handleGetListByType(e)}>
                                    <option value="">--- Hãy chọn thể loại ---</option>
                                    {productTypes.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                                <div>
                                    <Formik
                                    initialValues={{
                                        name: productFilter.name
                                    }}
                                    onSubmit={(values)=>{
                                        // setProductFilter((prev) => {
                                        //     return { ...prev, ...values, currentPage };
                                        // });
                                        setProductFilter({
                                            name : values.name,
                                            page : currentPage
                                        })
                                    }}
                                    >
                                    <Form className="d-flex">
                                        <Field
                                            className="form-control me-2"
                                            type="search"
                                            placeholder="Tìm kiếm..."
                                            aria-label="Search"
                                            name='name'
                                        />

                                        <button className="btn btn-outline-secondary" type="submit">
                                            <i className="bi bi-search"/>
                                        </button>
                                    </Form>
                                    </Formik>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-striped table-hover text-center">
                                    <thead>
                                    <tr>
                                        {/*<th>STT</th>*/}
                                        <th>Mã HÀNG</th>
                                        <th>TÊN HÀNG</th>
                                        <th>SỐ LƯỢNG</th>
                                        <th>ĐƠN GIÁ(VNĐ)</th>
                                        <th>Loại</th>
                                        <th>Chi tiết sản phẩm</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {products?.map((product, index) =>
                                        <tr key={index}>
                                            <td>{product.code}</td>
                                            <td>{product.name}</td>
                                            <td>{product.quantity}</td>
                                            <td>{product.sellingPrice}</td>
                                            <td>{product.productType.name}
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-outline-primary"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#exampleModal"
                                                        onClick={() => handleTransferId(product.id)}>
                                                    <i className="bi bi-exclamation-lg"></i> Chi tiết
                                                </button>
                                            </td>

                                        </tr>
                                    )}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <ReactPaginate
                            previousLabel="Trước"
                            nextLabel="Sau"
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName='d-flex justify-content-center list-unstyled'
                            previousClassName='page-item'
                            previousLinkClassName='page-link'
                            nextClassName= 'page-item'
                            nextLinkClassName='page-link'
                            pageClassName='page-item'
                            pageLinkClassName='page-link'
                            activeClassName='active'
                            activeLinkClassName='page-link'
                            disabledLinkClassName='d-none'
                            forcePage={currentPage}
                        />
                    </div>
                </div>

            </div>
            <ListModal
                productDetails={productDetails}
            />

        </div>


    )

}

export default ListProduct;