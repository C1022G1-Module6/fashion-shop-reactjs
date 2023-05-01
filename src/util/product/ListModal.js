

function ListModal(props) {
    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Chi tiết sản phẩm</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="table-responsive">
                                <table className="table table-striped table-hover text-center">
                                    <thead>
                                    <tr>
                                        {/*<th>STT</th>*/}
                                        <th>Mã HÀNG</th>
                                        <th>TÊN HÀNG</th>
                                        <th>SỐ LƯỢNG</th>
                                        <th>Size</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {props.productDetails?.map((productDetail, index) =>
                                        <tr key={index}>
                                            <td>{productDetail.code}</td>
                                            <td>{productDetail.name}</td>
                                            <td>{productDetail.quantity}</td>
                                            <td>{productDetail.size}
                                            </td>


                                        </tr>
                                    )}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListModal;