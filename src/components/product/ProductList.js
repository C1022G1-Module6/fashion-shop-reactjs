import {useEffect, useState} from "react";
import productTypeService from "../../service/product/ProductTypeService";
import productService from "../../service/product/ProductService";
import ListModal from "../../modal/ListModal";

function ListProduct() {
    const [products, setProducts] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [detailId, setDetailId] = useState()
    const [productDetails, setProductDetails] = useState([])

    const handleTransferId = (id) => {
        setDetailId(id)
    }

    useEffect(() => {
        const getProductDetails = async () => {
            const productDetailsResponse= await productService.getAllProductDetail(detailId)
            setProductDetails(productDetailsResponse.data)
        }
        getProductDetails();
    }, [detailId])

    useEffect(()=>{
        const getProducts = async () => {
            const productsResponse = await productService.findAll();
            setProducts(productsResponse.data.content)
        }
        getProducts();
    },[])

    useEffect(() => {
        const getProductType = async () => {
            const productTypeData = await productTypeService.findAllType();
            setProductTypes(productTypeData.data);
        };

        getProductType()

    }, [])


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
                            <div className="row mb-3">
                                <div className="col-lg-2">
                                    <button type="button" className="btn btn-outline-primary w-100">
                                        <i className="bi bi-plus-square"/> Thêm mới
                                    </button>
                                </div>
                                <div className="col-lg-5"/>
                                <div className="col-lg-5">
                                    <form className="d-flex">
                                        <input
                                            className="form-control me-2"
                                            type="search"
                                            placeholder="Tìm kiếm..."
                                            aria-label="Search"
                                        />
                                        <button className="btn btn-outline-secondary" type="submit">
                                            <i className="bi bi-search"/>
                                        </button>
                                    </form>
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
                                                <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal"
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
                    </div>
                </div>

            </div>
            <ListModal
                productDetails = {productDetails}
            />
        </div>
    )

}

export default ListProduct;