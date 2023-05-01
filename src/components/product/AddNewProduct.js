import {useNavigate} from "react-router";
import React, {useEffect, useState} from "react";
import productTypeService from "../../service/product/ProductTypeService";
import {Field, Form, Formik} from "formik";
import productService from "../../service/product/ProductService";
import productSizeService from "../../service/product/ProductSizeService";
import * as Swal from "sweetalert2";

function AddProductForm() {
    const [productAdd, setProductAdd] = useState([]);
    const [productTypes, setProductTypes] = useState();
    const [productSizes, setProductSizes] = useState([]);

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
    if (!productTypes) {
        return null
    }

    return (
        <div>
            <Formik initialValues={{
                name: '',
                img: '',
                sellingPrice: '',
                entryPrice: '',
                productType: productTypes[0]?.id,
                productSizes: []
            }}
                    onSubmit={(values) => {
                        const createProduct = async () => {
                            try {
                            const newArr = values.productSizes.filter(value => value !== undefined);
                            const newValue = {...values,
                                productSizes: newArr.map((item) => ({
                                        id: +item[0]
                                    }
                                )),
                                productType: {
                                    id : parseInt(values.productType)
                                }}
                                 await productService.saveProduct(newValue);
                                // setProductAdd(values)
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Thêm mới thành công',
                                    showConfirmButton: false,
                                    timer: 1500
                                })

                                navigate("/")
                            } catch (e) {
                                console.log(e)
                            }

                        };
                        createProduct()
                    }}>

<Form>
    <div className="container mt-5 shadow-lg">
        <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-10">

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
                        <div className="Field-group">
                            <Field
                                type="text"
                                id="nameProduct"
                                className="form-control"
                                placeholder="Nhập tên hàng"
                                name="name"
                            />
                            <span className="Field-group-text" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" style={{ fontWeight: "bold" }}>
                            Size <span style={{ color: "red" }}>*</span> :
                        </label>
                        {

                            productSizes?.map((size)=>(
                                <div className="form-check form-check-inline ml-2">
                                    <Field
                                        className="form-check-Field"
                                        type="checkbox"
                                        id={`size-${size.id}`}
                                        value= {`${size.id}`}
                                        name={`productSizes.${size.id}`}
                                    />
                                    <label className="form-check-label ms-2" htmlFor={`size-${size.id}`}>
                                        {size.name}
                                    </label>
                                </div>
                            ))
                        }

                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="price"
                            className="form-label"
                            style={{ fontWeight: "bold" }}
                        >
                            Giá <span style={{ color: "red" }}>*</span> :
                        </label>
                        <div className="Field-group">
                            <Field
                                type="number"
                                id="entryPrice"
                                className="form-control"
                                placeholder="Nhập giá gốc"
                                name="entryPrice"
                            />
                            <span className="Field-group-text">VNĐ</span>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="sellingPrice"
                            className="form-label"
                            style={{ fontWeight: "bold" }}
                        >
                            Giá <span style={{ color: "red" }}>*</span> :
                        </label>
                        <div className="Field-group">
                            <Field
                                type="number"
                                id="sellingPrice"
                                className="form-control"
                                placeholder="Nhập giá bán"
                                name="sellingPrice"
                            />
                            <span className="Field-group-text">VNĐ</span>
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
                        <Field type="file" className="form-control" id="image" name="img" />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="productType"
                            className="form-label"
                            style={{ fontWeight: "bold" }}
                        >
                            Loại <span style={{ color: "red" }}>*</span> :
                        </label>
                        <div className="item">
                            <Field className={'form-select'} as={"select"} name={"productType"}>
                                {productTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </Field>
                        </div>
                    </div>
                    <div
                        className="d-flex justify-content-center mt-4"
                        style={{ marginBottom: 20 }}
                    >

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

            </div>
        </div>
    </div>

</Form>

            </Formik>
        </div>

)
}
export default AddProductForm;