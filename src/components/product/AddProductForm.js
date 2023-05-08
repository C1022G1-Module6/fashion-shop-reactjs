import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Oval } from "react-loader-spinner";
import * as Swal from "sweetalert2";
import productTypeService from "../../service/product/productTypeService";
import productSizeService from "../../service/product/productSizeService";
import productService from "../../service/product/productService";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import * as Yup from "yup";

function AddProductForm() {
  const [productAdd, setProductAdd] = useState([]);
  const [productTypes, setProductTypes] = useState();
  const [productSizes, setProductSizes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [firebaseImg, setImg] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmitAsync = async () => {
    return new Promise((resolve, reject) => {
      const file = selectedFile;
      if (!file) return reject("No file selected");
      const storageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgresspercent(progress);
        },
        (error) => {
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImg(downloadURL);
          resolve(downloadURL);
        }
      );
    });
  };

  let navigate = useNavigate();

  useEffect(() => {
    const getProductType = async () => {
      const productTypeData = await productTypeService.findAllType();
      setProductTypes(productTypeData.data);
    };

    getProductType();
  }, []);

  useEffect(() => {
    const getProductSizes = async () => {
      const productSizeData = await productSizeService.findAllSize();
      setProductSizes(productSizeData.data);
    };

    getProductSizes();
  }, []);

  useEffect(() => {
    document.title = "Thêm mới Hàng hóa";
  }, []);

  if (!productTypes) {
    return null;
  }

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          img: "",
          sellingPrice: "",
          entryPrice: "",
          productType: productTypes[0]?.id,
          productSizes: [],
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("Không được bỏ trống")
            .matches(
              "[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s|_]+",
              "Tên sản phẩm phải đúng định dạng VD: Áo dài Việt Nam"
            ),
          sellingPrice: Yup.number()
            .required("Không được bỏ trống")
            .min(1, "Số tiền phải là số dương")
            .max(1000000000, "Số tiền quá lớn"),
          entryPrice: Yup.number()
            .required("Không được bỏ trống")
            .min(1, "Số tiền phải là số dương")
            .max(1000000000, "Số tiền quá lớn"),
          productSizes: Yup.array().min(1, "Vui lòng chọn ít nhất 1 size"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const newArr = values.productSizes.filter(
              (value) => value !== undefined
            );
            const newValue = {
              ...values,
              productSizes: newArr.map((item) => ({
                id: +item[0],
              })),
              productType: {
                id: parseInt(values.productType),
              },
              img: firebaseImg,
            };
            newValue.img = await handleSubmitAsync();
            await productService.saveProduct(newValue);
            Swal.fire({
              icon: "success",
              title: "Thêm mới thành công",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/product");
            setSubmitting(false);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="row mx-0">
              <div className="col-3"></div>
              <div className="container mt-4 col-9">
                <div className="row justify-content-center">
                  <div className="col-lg-9 shadow col-md-8 col-sm-10 pt-5 px-5 ">
                    <h3
                      className="text-center py-3 text-white pt-3"
                      style={{
                        backgroundColor: "#183661",
                        color: "#fff",
                        marginBottom: 30,
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
                        <ErrorMessage name="name" className="text-danger" component={'span'}/>
                        {/* <span className="Field-group-text" /> */}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        style={{ fontWeight: "bold" }}
                      >
                        Size <span style={{ color: "red" }}>*</span> :
                      </label>
                      {productSizes?.map((size) => (
                        <div
                          className="form-check form-check-inline ml-2"
                          key={size.id}
                        >
                          <Field
                            className="form-check-Field"
                            type="checkbox"
                            id={`size-${size.id}`}
                            value={`${size.id}`}
                            name={`productSizes.${size.id}`}
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor={`size-${size.id}`}
                          >
                            {size.name}
                          </label>
                        </div>
                      ))}
                      <div>
                      <ErrorMessage name="productSizes" className="text-danger" component={'span'}/>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="price"
                        className="form-label"
                        style={{ fontWeight: "bold" }}
                      >
                        Giá Gốc(VNĐ) <span style={{ color: "red" }}>*</span> :
                      </label>
                      <div className="Field-group">
                        <Field
                          type="number"
                          id="entryPrice"
                          className="form-control"
                          placeholder="Nhập giá gốc"
                          name="entryPrice"
                        />
                      </div>
                      <ErrorMessage name="entryPrice" className="text-danger" component={'span'}/>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="sellingPrice"
                        className="form-label"
                        style={{ fontWeight: "bold" }}
                      >
                        Giá Bán(VNĐ) <span style={{ color: "red" }}>*</span> :
                      </label>
                      <div className="Field-group">
                        <Field
                          type="number"
                          id="sellingPrice"
                          className="form-control"
                          placeholder="Nhập giá bán"
                          name="sellingPrice"
                        />
                      </div>
                      <ErrorMessage name="sellingPrice" className="text-danger" component={'span'}/>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="image"
                        className="form-label"
                        style={{ fontWeight: "bold" }}
                      >
                        Hình Ảnh:
                      </label>
                      <Field
                        type="file"
                        onChange={handleFileSelect}
                        className="form-control"
                        id="image"
                        name="img"
                      />
                      {selectedFile && (
                        <img
                          className={"mt-2"}
                          src={URL.createObjectURL(selectedFile)}
                          style={{ width: "50%" }}
                        />
                      )}
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
                        <Field
                          className={"form-select"}
                          as={"select"}
                          name={"productType"}
                        >
                          {productTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                              {type.name}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>
                    {isSubmitting ? (
                      <Oval
                        height={80}
                        width={80}
                        color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                      />
                    ) : (
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
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddProductForm;
