import React, { useEffect, useState } from "react";
import productTypeService from "../../service/product/productTypeService";
import productService from "../../service/product/productService";
import ListModal from "../../util/product/ListModal";
import { NavLink } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import ReactPaginate from "react-paginate";

function ListProduct() {
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [detailId, setDetailId] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [productDetails, setProductDetails] = useState([]);
  const [productFilter, setProductFilter] = useState({
    name: "",
    productTypeId: "",
    page: 0,
  });
  const [productTypeName, setProductTypeName] = useState("");
  const [productTy, setProductTy] = useState({
    name: "",
    page: 0,
  });
  const [flag, setFlag] = useState(false);
  const [showList, setShowList] = useState(false);
  const handleTransferId = (id) => {
    setDetailId(id);
  };
  const role = localStorage.getItem("roles");
  const handleGetListByType = async (e) => {
    const newProductFilter = {
      name: productFilter.name,
      productTypeId: e.target.value,
      page: currentPage,
    };
    try {
      const productsResponse = await productService.search(newProductFilter);
      console.log(productsResponse);
      setProducts(productsResponse.data.content);
      setPageCount(productsResponse.data.totalPages);
      setFlag(true);
      setProductTypeName(+e.target.value);
      setProductFilter(newProductFilter);
      setShowList(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const productDetailsResponse = await productService.getAllProductDetail(
          detailId
        );
        setProductDetails(productDetailsResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductDetails();
  }, [detailId]);

  useEffect(() => {
    const getProducts = async () => {
      console.log(productFilter);
      try {
        const productsResponse = await productService.search(productFilter);
        setPageCount(productsResponse.data.totalPages);
        setProducts(productsResponse.data.content);
        setFlag(false);
        setShowList(false);
      } catch (error) {
        setShowList(true);
        console.log(error);
      }
    };
    getProducts();
  }, [productFilter]);

  useEffect(() => {
    const getProductType = async () => {
      const productTypeData = await productTypeService.findAllType();
      setProductTypes(productTypeData.data);
    };

    getProductType();
  }, []);

  useEffect(() => {
    document.title = "Danh sách hàng hóa";
  }, []);

  const handlePageClick = async (page) => {
    console.log(productTypeName);
    setCurrentPage(page.selected);
    if (!flag) {
      setProductFilter({
        name: productFilter.name,
        productTypeId: productFilter.productTypeId,
        page: `${page.selected}`,
      });
    } else {
      const newProductFilter = {
        name: productFilter.name,
        productTypeId: productTypeName,
        page: page.selected,
      };
      const productsResponse = await productService.searchWithType(
        newProductFilter
      );
      setProducts(productsResponse.data.content);
    }
  };
  return (
    <div>
      <div className="row mx-0 ">
        <div className="col-3"></div>
        <div className="container mt-4 col-9 px-5">
          <div className="card shadow-lg mx-3 px-3 pt-4 ">
            <div
              className="card-header text-white mx-5"
              style={{ backgroundColor: "#183661" }}
            >
              <h2 className="text-center pt-1">HÀNG TRONG KHO</h2>
            </div>
            <div className="card-body px-5">
              <div className="mb-3 d-flex justify-content-between">
                {role === "ROLE_WAREHOUSE_MANAGER" ||
                role === "ROLE_STORE_MANAGER" ? (
                  <div>
                    <NavLink to={`/AddNewProduct`}>
                      {" "}
                      <button
                        type="button"
                        className="btn btn-outline-primary w-100"
                      >
                        <i className="bi bi-plus-square" /> Thêm mới
                      </button>
                    </NavLink>
                  </div>
                ) : (
                  <div></div>
                )}

                <select
                  className="form-select w-25"
                  onChange={(e) => handleGetListByType(e)}
                >
                  <option value="">--- Chọn thể loại ---</option>
                  {productTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                <div>
                  <Formik
                    initialValues={{
                      name: productFilter.name,
                      productTypeId: productFilter.productTypeId,
                    }}
                    onSubmit={(values) => {
                      // setProductFilter((prev) => {
                      //     return { ...prev, ...values, currentPage };
                      // });
                      setProductFilter({
                        name: values.name,
                        productTypeId: productFilter.productTypeId,
                        page: currentPage,
                      });
                    }}
                  >
                    <Form className="d-flex">
                      <Field
                        className="form-control me-2"
                        type="search"
                        placeholder="Tìm kiếm..."
                        aria-label="Search"
                        name="name"
                      />

                      <button
                        className="btn btn-outline-secondary"
                        type="submit"
                      >
                        <i className="bi bi-search" />
                      </button>
                    </Form>
                  </Formik>
                </div>
              </div>
              {!showList ? (
                <div className="table-responsive">
                  <table className="table table-striped table-hover text-center">
                    <thead>
                      <tr>
                        {/*<th>STT</th>*/}
                        <th>Mã hàng</th>
                        <th>Tên hàng</th>
                        <th>Số lượng</th>
                        <th>Đơn giá(VNĐ)</th>
                        <th>Loại</th>
                        <th>Chi tiết sản phẩm</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products?.map((product, index) => (
                        <tr key={index}>
                          <td>{product.code}</td>
                          <td>{product.name}</td>
                          <td>{product.quantity}</td>
                          <td>{product.sellingPrice}</td>
                          <td>{product.productType.name}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-outline-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => handleTransferId(product.id)}
                            >
                             Chi tiết
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <ReactPaginate
                    previousLabel="Trước"
                    nextLabel="Sau"
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName="d-flex justify-content-center list-unstyled"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    activeClassName="active"
                    activeLinkClassName="page-link"
                    disabledLinkClassName="d-none"
                    forcePage={currentPage}
                  />
                </div>
              ) : (
                <div className="fs-5 text-danger text-center">
                  Không tìm thấy sản phẩm
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ListModal productDetails={productDetails} />
    </div>
  );
}

export default ListProduct;
