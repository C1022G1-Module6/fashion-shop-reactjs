import {useNavigate} from "react-router";
import React, {useEffect, useState} from "react";
import productTypeService from "../../service/product/ProductTypeService";
import {Field, Form, Formik} from "formik";
import productService from "../../service/product/ProductService";
import productSizeService from "../../service/product/ProductSizeService";

function AddProductForm() {
const [productAdd,setProductAdd] = useState([]);
const [productTypes,setProductTypes] = useState();
const [productSizes,setProductSizes] = useState();

let navigate = useNavigate();

    useEffect(() => {
        const getProductType = async () => {
            const productTypeData = await productTypeService.findAllType();
            setProductTypes(productTypeData.data);
        };

        getProductType()

    }, [])
    useEffect(() => {
        const getProductSizes = async () => {
            const productSizeData = await productSizeService.findAllSize();
            setProductSizes(productSizeData.data);
        };

        getProductSizes()

    }, [])
if (!productTypes){
    return null
}
return (
    <div>
        <Formik initialValues={{
            name : '',
            qrImg : '',
            img : '',
            sellingPrice : '',
            entryPrice : '',
            productType : productTypes[0]?.id,

            productSize : []}}
                onSubmit={(values,{setSubmitting}) => {
                    const createProduct = async () => {
                        console.log(values);
                        try {
                            await productService.saveProduct(values);
                            setProductAdd(values)
                            navigate("/")
                        }catch (e) {
                            console.log(e)
                        }
                        setSubmitting(false);
                    };
                    createProduct()
                }} >
            ({isSubmitting}) => (
            <Form>
                <div className="container mt-5 shadow-lg">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8 col-sm-10">
                            <form style={{ marginTop: 20 }}>
                                <h3
                                    className="text-center py-3 text-white"
                                    style={{
                                        padding: "16px 0",
                                        backgroundColor: "#183661",
                                        color: "#fff",
                                        marginBottom: 30
                                    }}
                                >
                                    THÊM MỚI THÔNG TIN HÀNG HÓA
                                </h3>
                                <div className="mb-3">
                                    <label
                                        htmlFor="nameProduct"
                                        className="form-label"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        Tên Hàng <span style={{ color: "red" }}>*</span> :
                                    </label>
                                    <div className="input-group">
                                        <Field
                                            type="text"
                                            id="name"
                                            className="form-control"
                                            placeholder="Nhập tên hàng"
                                            name="name"
                                        />
                                        <span className="input-group-text" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" style={{ fontWeight: "bold" }}>
                                        Size <span style={{ color: "red" }}>*</span> :
                                    </label>
                                    <div>
                                        <div className="form-check form-check-inline ml-2">
                                            <Field
                                                className="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox1"
                                                defaultValue="option1"
                                            />
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">
                                                XS
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline ml-2">
                                            <Field
                                                className="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox2"
                                                defaultValue="option2"
                                            />
                                            <label className="form-check-label" htmlFor="inlineCheckbox2">
                                                S
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline ml-2">
                                            <Field
                                                className="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox3"
                                                defaultValue="option2"
                                            />
                                            <label className="form-check-label" htmlFor="inlineCheckbox2">
                                                M
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline ml-2">
                                            <Field
                                                className="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox4"
                                                defaultValue="option2"
                                            />
                                            <label className="form-check-label" htmlFor="inlineCheckbox2">
                                                L
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline ml-2">
                                            <Field
                                                className="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox5"
                                                defaultValue="option2"
                                            />
                                            <label className="form-check-label" htmlFor="inlineCheckbox2">
                                                XL
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline ml-2">
                                            <Field
                                                className="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox6"
                                                defaultValue="option2"
                                            />
                                            <label className="form-check-label" htmlFor="inlineCheckbox2">
                                                XXL
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="price"
                                        className="form-label"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        Giá <span style={{ color: "red" }}>*</span> :
                                    </label>
                                    <div className="input-group">
                                        <Field
                                            type="number"
                                            id="price"
                                            className="form-control"
                                            placeholder="Nhập giá"
                                            name="price"
                                        />
                                        <span className="input-group-text">VNĐ</span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="image"
                                        className="form-label"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        Hình Ảnh:
                                    </label>
                                    <Field type="file" className="form-control" id="image" name="image" />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="typeProduct"
                                        className="form-label"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        Loại <span style={{ color: "red" }}>*</span> :
                                    </label>
                                    <div className="input-group">
                                        {/*                        <Field type="text" id="typeProduct" class="form-control" placeholder="Nhập mã hàng" name="typeProduct">*/}
                                        <select className="form-select" name="typeProduct" id="typeProduct">
                                            <option value={1}>Quần</option>
                                            <option value={2}>Áo</option>
                                            <option value={3}>Phụ kiện</option>
                                        </select>
                                        <span className="input-group-text" />
                                    </div>
                                </div>
                                <div
                                    className="d-flex justify-content-center mt-4"
                                    style={{ marginBottom: 20 }}
                                >
                                    <div>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary ml-3"
                                            style={{ width: 150 }}
                                        >
                                            {" "}
                                            <i className="bi bi-x" />
                                            Hủy Bỏ
                                        </button>
                                    </div>
                                    <div className="ml-2">
                                        <button
                                            type="submit"
                                            className="btn btn-outline-primary"
                                            style={{ width: 150 }}
                                        >
                                            <i className="bi bi-plus-square" /> Thêm Mới
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </Form>
            )


        </Formik>
    </div>
)
}