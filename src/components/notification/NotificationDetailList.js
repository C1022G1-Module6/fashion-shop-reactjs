import React, {useState} from 'react'
import {useEffect} from "react"
import * as NotificationService from './service/NotificationService'
import {useParams} from 'react-router-dom'

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
    return (
        <>
            <div className="row">
                <div className="col-md-12-sm-12-xl-12-lg-12 bg-white">
                    <h1 style={{color: 'white'}}> ?? </h1>
                </div>
            </div>


            <div className="row" style={{height: '100%', width: '100%'}}>
                <div className="col-sm-12 col-md-3 col-xl-3 col-xxl-3 col-lg-3  ">
                </div>
                <div className="col-sm-12 col-md-6 col-xl-6 col-xxl-6 col-lg-6 text-center">
                    <div className="card  " style={{boxShadow: "8px 8px 16px 8px rgba(0, 0, 0, 0.2)"}}>
                        <div className="card-header" style={{backgroundColor: '#183661', color: "white"}}>
                            <h4 className="card-title text-center "><b>{detail?.title}</b></h4>

                        </div>
                        <div className="card-body">
                            <form className="form form-horizontal">
                                <div style={{textAlign: "left"}} className="row">

                                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 "
                                             style={{marginBottom: '5%'}}>
                                            <div className="mb-1 row">

                                                <div align='center' className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                    <div align='center' style={{height: '100%', width: '100%'}}
                                                         className="input-group input-group-merge">

                                                            <h5 style={{marginLeft: "40%"}} className="" ><b>Nội dung chi tiết</b> </h5>
                                                        <div style={{marginTop: '5%', marginLeft: '-25%'}}>
                                                            <h6  style= {{fontStyle: 'italic', marginTop: '5%', }}>{detail?.content}</h6>

                                                        </div>
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
