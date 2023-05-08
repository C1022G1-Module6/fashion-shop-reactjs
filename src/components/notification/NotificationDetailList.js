import React, { useState } from 'react'
import { useEffect } from "react"
import * as NotificationService from './service/NotificationService'
import { useParams } from 'react-router-dom'

export default function NotificationDetailList() {
    const [detail, setDetail] = useState()
    let param = useParams()

    useEffect(() => {
        const detailShow = async () => {
            const rs = await NotificationService.findById(param.id)
            setDetail(rs)
        }
        detailShow()
    }, [param.id])
    useEffect(() => {
        document.title = "Chi tiết thông báo";
      }, []);
    return (
        <>
            <div className='row mx-0 mt-5'>
                <div className='col-3'></div>
                <div className='col-7 mx-auto mt-5'>
                            <div className="card  " style={{ boxShadow: "8px 8px 16px 8px rgba(0, 0, 0, 0.2)" }}>
                                <div className="card-header" style={{ backgroundColor: '#183661', color: "white" }}>
                                    <h3 className="card-title text-center "><b>{detail?.title}</b></h3>
                                </div>
                                <div className="card-body">
                                    <form className="form form-horizontal">
                                        <div style={{ textAlign: "left" }} className="row">

                                            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 "
                                                style={{ marginBottom: '5%' }}>
                                                <div style={{ textAlign: 'center' }} className="mb-1 row">

                                                    <div align='center' className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <div style={{ height: '100%', width: '100%', textAlign: 'center' }}
                                                            className="input-group input-group-merge">
                                                            <h4 style={{ textAlign: 'center' }} className="detail " ><b>Nội dung chi tiết:</b> </h4>
                                                            <h5  style= {{fontStyle: 'italic', marginTop: '5%', }} dangerouslySetInnerHTML={{__html: detail?.content}}></h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="row">


                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3 col-xl-3 col-xxl-3 col-lg-3  ">
                    </div>
            </div>
        </>
    )
}