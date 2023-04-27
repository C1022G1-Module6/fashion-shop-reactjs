import React, { useEffect, useState } from 'react'
import * as NotificationService from './service/NotificationService'
import { ErrorMessage, Field, Form, Formik } from 'formik'
// import CKEditor from "@ckeditor/ckeditor5-react";
import * as Yup from 'yup'
import Swal from 'sweetalert2'

export default function NotificationCreate() {
  const [employee, setEmployee] = useState([])
  const [notification, setNotification] = useState()

  console.log(notification);
  const listNotification = async () => {
    let res = await NotificationService.getAllNotification()
    return setNotification(res)
  }
  const listEmployee = async () => {
    let res = await NotificationService.getAllEmployee()
    setEmployee(res)
  }
  useEffect(() => {

    listEmployee()
    listNotification()
  }, [])

  return (
    <>
      <div className="row">
        <div className="col-md-12-sm-12-xl-12-lg-12 bg-white">
          <h1 style={{ color: 'white' }}> ?? </h1>
        </div>
      </div>
      <div className="row" style={{ height: '100%', width: "100%" }}>
        <div className=" col-sm-12 col-md-3 col-xl-3 col-lg-3 col-xxl-3 ">
        </div>
        <div className=" col-sm-12 col-md-6 col-xl-6 col-lg-6 col-xxl-6  ">
          <div className="card " style={{ boxShadow: "8px 8px 16px 8px rgba(0, 0, 0, 0.2)" }}>
            <div className="card-header " style={{ backgroundColor: '#183661', color: "white" }}>
              <h4 className="card-title text-center "><b>ĐĂNG THÔNG BÁO</b></h4>
            </div>
            <div className="card-body">
              <Formik initialValues={{
                title: '',
                content: '',
                img: null,
                employeeDTO: employee?.id
              }}
                validationSchema={Yup.object({
                  title: Yup.string().required('Vui lòng nhập tiêu đề bài đăng').min(6, 'Tối thiểu 6 kí tự').max(30, 'Tối đa là 30 kí tự'),
                  content: Yup.string().required('Vui long nhập nội dung bài đăng').min(20, 'Tối thiểu 20 kí tự').max(300, 'Tối đa là 300 kí tự'),
                  img: Yup.string().required('Vui lòng chọn ảnh'),
                  employeeDTO: Yup.string().required('Vui lòng chọn đối tượng hiển thị')



                })}
                onSubmit={async (values) => {
                  const formData = new FormData();
                  formData.append('img', values.img)
                  console.log(values.img);
                  await NotificationService.save(
                    {
                      ...values,
                      img: `../../image/` + values.img.name

                      ,

                      employeeDTO: {
                        id: +values.employeeDTO
                      }
                    }
                    
                  )
                  console.log(values)
                
               
                    Swal.fire(
                      'Good job!',
                      'You clicked the button!',
                      'success'
                    )
                
                 
                 

                }}>

                {({ setFieldValue }) => (

                  <Form className="form form-horizontal">

                    <div className="row">
                      <div className="col-12-sm-12-md-12-xl-12-lg-12 " style={{ marginBottom: '2%' }}>
                        <div className="mb-1 row">
                          <div className="col-3-sm-3-md-3-xl-3-lg-3">
                            <label className="col-form-label " htmlFor="fname-icon"><b>Tiêu đề:</b></label>
                          </div>
                          <div className="col-9-sm-9-md-9-xl-9-lg-9">
                            <div style={{ height: '100%', width: "100%" }} className="input-group input-group-merge">
                              <span className="input-group-text"><i className="bi bi-pencil-square"></i></span>
                              <Field type="text" id="fname-icon" className="form-control " name='title'
                                placeholder="Nhập tiêu đề" />

                            </div>
                            <div>
                              <ErrorMessage name='title' className='text-danger' component='span' />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12-sm-12-md-12-xl-12-lg-12" style={{ marginBottom: '2%' }}>
                        <div className="mb-1 row">
                          <div className="col-3-sm-3-md-3-xl-3-lg-3">
                            <label className="col-form-label" htmlFor="noiDung"><b>Nội dung:</b></label>
                          </div>
                          <div className="col-9-sm-9-md-9-xl-9-lg-9">
                            <div className="input-group input-group-merge">
                              <span className="input-group-text"><i className="bi bi-pen-fill"></i></span>

                              <Field as='textarea' className="form-control char-textarea" name='content'
                                style={{ boxSizing: '0 0 10px 0', cols: '70', rows: '4' }} />
                            </div>
                            <ErrorMessage name='content' className='text-danger' component='span' />

                          </div>
                        </div>
                      </div>
                      <div className="col-12-sm-12-md-12-xl-12-lg-12" style={{ marginBottom: '2%' }}>
                        <div className="mb-1 row">
                          <div className="col-3-sm-3-md-3-xl-3-lg-3">
                            <label className="col-form-label" htmlFor="hinhAnh"><b>Hình ảnh:</b></label>
                          </div>
                          <div className="col-9-sm-9-md-9-xl-9-lg-9">
                            <div className="input-group input-group-merge">
                              <Field id="hinhAnh" className="form-control" name="img">
                                {
                                  ({ field }) => (

                                    <input type="file"accept="image/*" aria-label="Chọn tệp"  onChange={(event) => {
                                      setFieldValue('img', event.currentTarget.files[0]);
                                    }} />
                                  )

                                }
                              </Field>
                            

                            </div>
                            <ErrorMessage name='img' className='text-danger' component='span' />
                          </div>
                        </div>
                      </div>
                      <div className="col-12-sm-12-md-12-xl-12-lg-12" style={{ marginBottom: '5%' }}>
                        <div className="mb-1 row">

                          <label className="d-block form-label"> <b>Đối tượng: <span style={{ color: 'red' }}>*</span> </b> </label>
                          <div className="form-check my-50" style={{ marginLeft: '15%' }}>
                            <Field type="radio" id="validationRadiojq3" name="employeeDTO"
                              className="form-check-input" value='3' />
                            <label className="form-check-label" htmlFor="validationRadiojq3">Quản lý kho
                              hàng</label>
                          </div>
                          <div className="form-check" style={{ marginLeft: '15%' }}>
                            <Field type="radio" id="validationRadiojq21" name="employeeDTO"
                              className="form-check-input" value='1' />
                            <label className="form-check-label" htmlFor="validationRadiojq1">Quản lý cửa
                              hàng</label>
                          </div>
                          <div className="form-check" style={{ marginLeft: '15%' }}>
                            <Field type="radio" id="validationRadiojq2" name="employeeDTO"
                              className="form-check-input" value='2' />
                            <label className="form-check-label" htmlFor="validationRadiojq2">Quản lý bán
                              hàng</label>
                          </div>
                          <ErrorMessage name='employeeDTO' className='text-danger' component='span' />

                        </div>

                        <center>
                          <div className="col-9-sm-9-md-9-xl-9-lg-9" >
                            <button type="submit" className="btn btn-outline-primary" style={{ width: '150px' }}><i
                              className="bi bi-plus-square"></i> Thêm mới</button>
                            <button style={{ marginLeft: '3%' }} type="reset" className="btn btn-outline-secondary waves-effect">Hủy</button>
                          </div>
                        </center>



                      </div>
                    </div>

                  </Form>

                )

                }


              </Formik>
            </div>
          </div>
        </div>
        <div className=" col-sm-12 col-md-3 col-xl-3 col-lg-3 col-xxl-3 ">

        </div>
      </div>


    </>
  )
}
