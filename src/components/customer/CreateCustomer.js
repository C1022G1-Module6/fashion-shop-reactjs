function CreateCustomer() {
    return (
        <section>
            <div className=" py-5" style={{ padding: 0, margin: 0, overflow: "hidden" }}>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-lg-8 col-xl-6">
                        <div className="card rounded-3">
                            <div
                                className="card-body"
                                style={{ boxShadow: "0 0 20px 0 #253365" }}
                            >
                                <h1
                                    className="mb-3 mt-3 text-center"
                                    style={{ backgroundColor: "#183661", color: "white" }}
                                >
                                    THÊM MỚI KHÁCH HÀNG{" "}
                                </h1>
                                <form className="px-md-4 ">
                                    <div className="form-group">
                                        <label htmlFor="name" className="h6">
                                            Họ Tên
                                            <sup style={{ color: "red", fontSize: 15 }} className="m-1">
                                                *
                                            </sup>
                                            :
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="name"
                                                className="form-control"
                                                placeholder="Nhập tên khách hàng..."
                                                name="name"
                                            />
                                            <span className="input-group-text">
                                                <i className="bi bi-person-add" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-3 form-group">
                                        <label htmlFor="dateOfBirth" className="h6">
                                            Ngày sinh
                                            <sup style={{ color: "red", fontSize: 15 }} className="m-1">
                                                *
                                            </sup>
                                            :
                                        </label>
                                        <input
                                            type="date"
                                            id="dateOfBirth"
                                            className="form-control"
                                            name="dateOfBirth"
                                        />
                                    </div>
                                    <div className="mt-3 form-group">
                                        <label className="h6">
                                            Giới tính
                                            <sup style={{ color: "red", fontSize: 15 }} className="m-1">
                                                *
                                            </sup>
                                            :
                                        </label>
                                        <div className="d-flex">
                                            <label className="d-block me-4">
                                                <input
                                                    type="radio"
                                                    defaultValue={1}
                                                    name="gender"
                                                    defaultChecked=""
                                                />{" "}
                                                Nam
                                                <i className="bi bi-gender-male" />
                                            </label>
                                            <label className="d-block me-4">
                                                <input type="radio" defaultValue={0} name="gender" /> Nữ
                                                <i className="bi bi-gender-female" />
                                            </label>
                                            <label className="d-block">
                                                <input type="radio" defaultValue={2} name="gender" /> LGBT
                                                <i className="bi bi-gender-trans" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="mt-3 form-group">
                                        <label htmlFor="phone" className="h6">
                                            Số điện thoại
                                            <sup style={{ color: "red", fontSize: 15 }} className="m-1">
                                                *
                                            </sup>
                                            :
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="phone"
                                                className="form-control"
                                                placeholder="Nhập số điện thoại khách hàng..."
                                                name="phone"
                                            />
                                            <span className="input-group-text">
                                                <i className="bi bi-telephone-inbound" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-3 form-group">
                                        <label htmlFor="email" className="h6">
                                            Email
                                            <sup style={{ color: "red", fontSize: 15 }} className="m-1">
                                                *
                                            </sup>
                                            :
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="email"
                                                className="form-control"
                                                placeholder="Nhập email khách hàng..."
                                                name="email"
                                            />
                                            <span className="input-group-text">
                                                <i className="bi bi-envelope-at" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-3 form-group">
                                        <label htmlFor="address" className="h6">
                                            Địa chỉ
                                            <sup style={{ color: "red", fontSize: 15 }} className="m-1">
                                                *
                                            </sup>
                                            :
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="address"
                                                className="form-control"
                                                placeholder="Nhập địa chỉ khách hàng..."
                                                name="address"
                                            />
                                            <span className="input-group-text">
                                                <i className="bi bi-geo-alt-fill" />
                                            </span>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-center" style={{ marginTop: 10 }}>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            style={{ marginRight: 5 }}
                                        >
                                            <i className="bi bi-x-circle" /> Hủy
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            style={{ marginLeft: 5 }}
                                        >
                                            <i className="bi bi-check2-circle" /> Lưu
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
 export default CreateCustomer;