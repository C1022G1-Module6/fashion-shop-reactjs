import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as NotificationService from "./service/NotificationService";
import ReactPaginate from "react-paginate";
import "./../notification/notifications.css";

export default function Notification() {
  const [pageCount, setPageCount] = useState(0);
  let [count, setCount] = useState(1);
  console.log(count);
  const [currentPage, setCurrentPage] = useState(0);
  const [notification, setNotification] = useState([]);
  const listNotification = async () => {
    let res = await NotificationService.getAllNotification(currentPage);
    setNotification(res.data.content);
    setPageCount(res.data.totalPages);
  };
  console.log(pageCount);
  const handlePageClick = async (page) => {
    setCurrentPage(page.selected);
    const rs = await NotificationService.getAllNotification(page.selected);
    setNotification(rs.data.content);
    setCount(Math.ceil(rs.data.size * page.selected + 1));
  };

  console.log(notification);
  const role = localStorage.getItem("roles");
  useEffect(() => {
    listNotification();
  }, []);

    useEffect(() => {
    document.title = "Danh sách hàng hóa";
  }, []);

  return (
    <>
      <div className="row mx-0">
        <div className="col-3"></div>
        <div className="container col-7 mt-5 mx-auto">
          <h1 style={{ backgroundColor: "#183661", color: "white" }}>
            {" "}
            THÔNG BÁO MỚI{" "}
          </h1>
          <div className="row ">
            {role !== "ROLE_STORE_MANAGER"
              ? notification
                  .filter((niti) => niti.role === role)
                  .map((nitifyList, index) => (
                    <div key={index} className="col-sm-12 col-md-6 col-xl-6 col-xxl-6 col-lg-6 p-4">
                      <div
                        className="card h-100"
                        style={{
                          boxShadow: "8px 8px 16px 8px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        <img
                          className="card-img-top"
                          src={nitifyList.img}
                          alt=""
                        />
                        <div className="card-body">
                          <NavLink
                            to={`/notifications/detail/${nitifyList.id}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <h4 className="card-title">{nitifyList.title}</h4>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  ))
              : notification.map((nitifyList, index) => (
                  <div key={index} className="col-sm-12 col-md-6 col-xl-6 col-xxl-6 col-lg-6 p-4">
                    <div
                      className="card h-100"
                      style={{
                        boxShadow: "8px 8px 16px 8px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <img
                        className="card-img-top"
                        src={nitifyList.img}
                        alt=""
                      />
                      <div className="card-body">
                        <NavLink
                          to={`/notifications/detail/${nitifyList.id}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <h4 className="card-title">{nitifyList.title}</h4>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                ))}
            <div className="d-flex justify-content-center">
              <ReactPaginate
                breakLabel="..."
                nextLabel="trước"
                onPageChange={handlePageClick}
                pageCount={pageCount}
                previousLabel="sau"
                containerClassName="pagination"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                activeClassName="active"
                activeLinkClassName="page-link"
                disabledClassName="d-none"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
