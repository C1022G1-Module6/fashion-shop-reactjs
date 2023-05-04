import React, { useState } from 'react'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import * as NotificationService from './service/NotificationService'
import ReactPaginate from 'react-paginate';
import './../notification/notifications.css'

export default function Notification() {
    const [pageCount, setPageCount] = useState(0)
    let [count, setCount] = useState(1)
    console.log(count)
    const [currentPage, setCurrentPage] = useState(0)
    const [notification, setNotification] = useState([])
    const listNotification = async () => {
        let res = await NotificationService.getAllNotification(currentPage)
        setNotification(res.data.content)
        setPageCount(res.data.totalPages)



    }
    console.log(pageCount);
    const handlePageClick = async (page) => {
        setCurrentPage(page.selected)
        const rs = await NotificationService.getAllNotification(page.selected)
        setNotification(rs.data.content)
        setCount(Math.ceil(rs.data.size * page.selected + 1))
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
                                notification
                                    // ?.slice(currentPage * 3, currentPage * 3 + 3)
                                    ?.map((nitifyList, index) => (

                                        <div className="col-sm-12 col-md-6 col-xl-6 col-xxl-6 col-lg-6" key={index}>

                                            <div className="card h-100" style={{ boxShadow: "8px 8px 16px 8px rgba(0, 0, 0, 0.2)" }}>


                                                <img className="card-img-top" src={nitifyList.img} alt="" />

                                                <div className="card-body">
                                                    <NavLink to={`/notifications/detail/${nitifyList.id}`} style={{ textDecoration: "none", color: 'black' }}>
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
                <div style={{ marginLeft: '45%' }}>

                </div>




            </div>
            <div className='row'>

                <div className="col-sm-12 col-md-12 col-xl-12 col-xxl-12 col-lg-12 " style={{marginLeft: '45%', position: 'sticky'}}>
                   <div style={{height: "100%", width: "100%"}}>
                       <ReactPaginate


                           breakLabel="..."
                           nextLabel=">"
                           onPageChange={handlePageClick}
                           pageCount={pageCount}
                           previousLabel="< "
                           containerClassName="pagination"
                           pageLinkClassName="page-num"
                           nextLinkClassName="page-next"
                           previousLinkClassName="page-previous"
                           activeClassName="active"
                           disabledClassName="d-none"
                       />
                   </div>
                </div>


            </div>

        </>

    )
}
