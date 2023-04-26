import React, { useEffect, useState } from 'react'
import * as NotificationService from './service/NotificationService'
import { Field, Form, Formik } from 'formik'


export default function NotificationCreate() {
  const [employee, setEmployee] = useState()

 useEffect(() =>{
    const listEmployee = async() =>{
      let res = await NotificationService.getAllEmployee()
      setEmployee(res)
    }
    listEmployee()
 },[])
 if(!employee){
  return null;
 }

  return (
    <>
      <div className="row">
        <div className="col-md-12-sm-12-xl-12-lg-12 bg-white">
          <h1 style={{color: 'white'}}> ?? </h1>
        </div>
      </div>
      <div className="row" style={{height: '100%', width: "100%"}}>
        <div className=" col-sm-12 col-md-3 col-xl-3 col-lg-3 col-xxl-3 ">
        </div>
        <div className=" col-sm-12 col-md-6 col-xl-6 col-lg-6 col-xxl-6  ">
          <div className="card " style={{boxShadow: "8px 8px 16px 8px rgba(0, 0, 0, 0.2)"}}>
            <div className="card-header " style={{backgroundColor:'#183661', color: "white" }}>
              <h4 className="card-title text-center "><b>ĐĂNG THÔNG BÁO</b></h4>
            </div>
            <div className="card-body">
            <Formik initialValues={{
              title: '',
              content: '',
              img: '',
              employeeDTO: employee[0]?.id
            }}>

              <Form className="form form-horizontal">
             
              <div className="row">
                  <div className="col-12-sm-12-md-12-xl-12-lg-12 " style={{marginBottom: '2%'}}>
                    <div className="mb-1 row">
                      <div className="col-3-sm-3-md-3-xl-3-lg-3">
                        <label className="col-form-label " for="fname-icon"><b>Tiêu đề:<span
                          style={{color: 'red'}}>*</span></b></label>
                      </div>
                      <div className="col-9-sm-9-md-9-xl-9-lg-9">
                        <div style={{height: '100%', width: "100%"}} className="input-group input-group-merge">
                          <span className="input-group-text"><i className="bi bi-pencil-square"></i></span>
                          <Field type="text" id="fname-icon" className="form-control " name="fname-icon"
                            placeholder="Nhập tiêu đề" />

                        </div>
                        <div>
                          <span style={{color: 'red'}}>Vui lòng nhập tiêu đề bài viết</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12-sm-12-md-12-xl-12-lg-12"  style={{marginBottom: '2%'}}>
                    <div className="mb-1 row">
                      <div className="col-3-sm-3-md-3-xl-3-lg-3">
                        <label className="col-form-label" for="noiDung"><b>Nội dung:<span
                          style={{color: 'red'}}>*</span></b></label>
                      </div>
                      <div className="col-9-sm-9-md-9-xl-9-lg-9">
                        <div className="input-group input-group-merge">
                          <span className="input-group-text"><i className="bi bi-pen-fill"></i></span>
                          <textarea data-length="100" id="noiDung" className="form-control char-textarea"
                            style={{boxSizing: '0 0 10px 0'}} name=""  cols="70" rows="4"
                            placeholder="Nhập nội dung">
                          </textarea>
                        </div>
                        <span style={{color: 'red'}}>Vui lòng nhập nội dung bài viết</span>

                      </div>
                    </div>
                  </div>
                  <div className="col-12-sm-12-md-12-xl-12-lg-12" style={{marginBottom: '2%'}}>
                    <div className="mb-1 row">
                      <div className="col-3-sm-3-md-3-xl-3-lg-3">
                        <label className="col-form-label" for="hinhAnh"><b>Hình ảnh:</b></label>
                      </div>
                      <div className="col-9-sm-9-md-9-xl-9-lg-9">
                        <div className="input-group input-group-merge">
                          <input id="hinhAnh" className="form-control" type="file"
                            placeholder="Chọn hình ảnh" name="customFile" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12-sm-12-md-12-xl-12-lg-12" style={{marginBottom: '5%'}}>
                    <div className="mb-1 row">

                      <label className="d-block form-label"> <b>Đối tượng: <span style={{color: 'red'}}>*</span> </b> </label>
                      <div className="form-check my-50" style={{marginLeft: '15%'}}>
                        <input type="radio" id="validationRadiojq1" name="validationRadiojq"
                          className="form-check-input" />
                        <label className="form-check-label" for="validationRadiojq1">Quản lý kho
                          hàng</label>
                      </div>
                      <div className="form-check" style={{marginLeft: '15%'}}>
                        <input type="radio" id="validationRadiojq2" name="validationRadiojq"
                          className="form-check-input" />
                        <label className="form-check-label" for="validationRadiojq2">Quản lý cửa
                          hàng</label>
                      </div>
                      <div className="form-check" style={{marginLeft: '15%'}}>
                        <input type="radio" id="validationRadiojq2" name="validationRadiojq"
                          className="form-check-input" />
                        <label className="form-check-label" for="validationRadiojq2">Quản lý bán
                          hàng</label>
                      </div>

                    </div>

                    <center>
                    <div className="col-9-sm-9-md-9-xl-9-lg-9" >
                        <button type="button" className="btn btn-outline-primary" style={{width: '150px'}}><i
                          className="bi bi-plus-square"></i> Thêm mới</button>
                        <button style={{marginLeft: '3%'}} type="reset" className="btn btn-outline-secondary waves-effect">Hủy</button>
                      </div>
                    </center>
                   
                  

                  </div>
                </div>
      
              </Form>

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
