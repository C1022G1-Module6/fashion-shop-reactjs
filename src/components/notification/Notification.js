import React, { useState } from 'react'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import * as NotificationService from './service/NotificationService'
export default function Notification() {

    const [notification, setNotification] = useState([])

    const listNotification = async () => {
        let res = await NotificationService.getAllNotification()
        return setNotification(res)
    }
    console.log(notification);

    useEffect(() => {
        listNotification()
    }, [])

    return (
        <>

            <div className="container ">
                <div className="row">
                    <div className="col-12 bg-white">
                        <h1 style={{ color: "white" }}> ?? </h1>
                    </div>
                </div>
                <div className="row" >
                    <div className="col-sm-12 col-md-3 col-xl-3 col-xxl-2 col-lg-3  ">
                    </div>

                    <div className="col-sm-12 col-md-6 col-xl-6 col-xxl-8 col-lg-6 text-center">
                        <h1 style={{ backgroundColor: '#183661', color: "white" }}> THÔNG BÁO MỚI </h1>





                        <div className="row">
                            {
                                notification?.map((nitifyList, index) => (
                                    <div className="col-sm-12 col-md-6 col-xl-6 col-xxl-6 col-lg-6" key={index}>
                                        <div className="caxrd h-100" style={{ boxShadow: "8px 8px 16px 8px rgba(0, 0, 0, 0.2)" }}>


                                            <img className="card-img-top" src={nitifyList.img} alt="" />

                                            <div className="card-body">
                                                <NavLink to={`/notifications/detail/${nitifyList.id}`} style={{ textDecoration: "none" }}>
                                                    <h4 className="card-title">{nitifyList.title}</h4>
                                                </NavLink>

                                            </div>
                                            {/* <div className="card-footer">
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </div> */}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                    <div className="col-sm-12 col-md-3 col-xl-3 col-xxl-2 col-lg-3  ">
                    </div>
                </div>



            </div>
        </>
    )
}
