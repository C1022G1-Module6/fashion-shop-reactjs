import styles from "../data_entry/dataEntry.module.css";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import LineChart from "./LineChart";
import { monthRevenue, dayCost, monthCost, listAll } from "../../service/statistics/statisticsService";
import { Field, Form, Formik } from "formik";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

Chart.register(CategoryScale);

function Statistics() {
    const [statistics, setStatistics] = useState([]);

    const [monthRevenues, setMonthRevenues] = useState(0);

    const [dayCosts, setDaycosts] = useState([]);

    const [monthCosts, setMonthCosts] = useState(0);

    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const [getMonth, setGetMonth] = useState('');
    const componentBRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => componentBRef.current,
        pageStyle: "@page { size: A4; margin: 0; }",
    });

    const chartData = {
        labels: dayCosts.map((dayCost) => {
            return "Ngày " + dayCost.day
        }),
        datasets: [
            {
                label: "Doanh thu",
                data: statistics.map((statistic) => statistic.revenue),
                backgroundColor: [
                    "rgba(75,192,192,1)"
                ],
                borderColor: "black",
                borderWidth: 1,
                hoverBorderWidth: 1,
                hoverBorderColor: "#000",
            },
            {
                label: "Chi phí",
                data: dayCosts.map((dayCost) => dayCost.cost),
                backgroundColor: [
                    "rgba(255,159,64,0.6)"
                ],
                borderColor: "black",
                borderWidth: 1,
                hoverBorderWidth: 1,
                hoverBorderColor: "#000",
            }
        ]
    };
    useEffect(() => {
        const getStatistics = async () => {
            const statisticsData = await listAll("");
            setStatistics(statisticsData.data);
        };
        getStatistics();
    }, []);

    useEffect(() => {
        const getMonthRevenues = async () => {
            const monthRevenuesData = await monthRevenue("");
            setMonthRevenues(monthRevenuesData.data);
        };
        getMonthRevenues();
    }, []);

    useEffect(() => {
        const getDayCosts = async () => {
            const dayCostsData = await dayCost("");
            setDaycosts(dayCostsData.data);
        };
        getDayCosts();
    }, []);

    useEffect(() => {
        const getMonthCosts = async () => {
            const monthCostsData = await monthCost("");
            setMonthCosts(monthCostsData.data);
        };
        getMonthCosts();
    }, []);

    return (
        <>
            <div className="col-3"></div>
            <div className="col-8 m-auto mt-4 pb-5">
                <div className="container-fluid pt-4 px-5 shadow-lg">
                    <div className="row p-0 m-0">
                        <div className="col-sm-12 col-lg-12 col-md-12 p-0">
                            <legend class={`${styles.heading} fw-bolder text-center mb-3`}>
                                THỐNG KÊ THU NHẬP THÁNG {getMonth}
                            </legend>
                        </div>
                        <div className="p-0 m-0">
                            <Formik
                                initialValues={{
                                    month: "",
                                }}
                                onSubmit={(value) => {
                                    setGetMonth(value.month);
                                    const getTotal = async () => {
                                        try {
                                            const statisticsData = await listAll(value);
                                            const monthRevenuesData = await monthRevenue(value);
                                            const dayCostsData = await dayCost(value);
                                            const monthCostsData = await monthCost(value);
                                            setStatistics(statisticsData.data);
                                            setMonthRevenues(monthRevenuesData.data[0].totalRevenue);
                                            setDaycosts(dayCostsData.data);
                                            if (!monthCostsData.data) {
                                                setMonthCosts(0)
                                            } else {
                                                setMonthCosts(monthCostsData.data[0].totalCost);
                                            }
                                            
                                        } catch (error) {
                                            console.log(error);
                                        }

                                    };
                                    getTotal();
                                }}
                            >
                                <Form className="container-fluid p-0 ">
                                    <div
                                        className="d-flex justify-content-center "
                                        style={{ gap: "10px" }}
                                    >
                                        <Field
                                            as="select"
                                            className="form-select"
                                            name="month"
                                            style={{ width: "140px" }}
                                        >
                                            <option value={""}>Chọn tháng</option>
                                            {months.map((month) => (
                                                <option key={month} value={month}>
                                                    Tháng {month}
                                                </option>
                                            ))}
                                        </Field>
                                        <button type="submit" className="btn btn-outline-primary">
                                            Chọn
                                        </button>
                                    </div>
                                    <div className="d-flex justify-content-center mx-5">
                                        <LineChart chartData={chartData} />
                                    </div>
                                    <div className="d-flex justify-content-center mt-4 mb-4">
                                        <h5
                                            style={{ backgroundColor: "#93D9D9", width: "500px" }}
                                            className="text-center pt-2 pb-2"
                                        >
                                            Tổng doanh thu tháng  {statistics.length !== 0 ? <span> {getMonth} : {monthRevenues} VNĐ</span> : <span> {getMonth} : 0 VNĐ</span>}
                                        </h5>
                                    </div>

                                    <div className="d-flex justify-content-center mt-4 mb-4">
                                        <h5
                                            style={{ backgroundColor: "#FFC58C", width: "500px" }}
                                            className="text-center pt-2 pb-2"
                                        >
                                            Tổng chi phí tháng  {dayCosts.length !== 0 ? <span> {getMonth} : {monthCosts} VNĐ </span> : <span> {getMonth} : 0 VNĐ</span>}</h5>
                                    </div>

                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            className="btn btn-outline-primary mb-5"
                                            data-bs-toggle="modal" data-bs-target="#exampleModal1"
                                        >
                                            <i className="bi bi-printer-fill" /> In thống kê
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal1">
                <div className="row ">
                    <div className="col-3"></div>
                    <div className="modal-dialog col-9" style={{ maxWidth: "800px" }}>
                        <div className="modal-content">
                            <div className="modal-body p-0">
                                <div ref={componentBRef}>
                                    {/* <Statistics
                                        statistics={statistics}
                                        monthRevenues={monthRevenues}
                                        dayCosts={dayCosts}
                                        monthCosts={monthCosts}
                                    /> */}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <div>
                                    <button
                                        className="btn btn-outline-primary"
                                        data-bs-dismiss="modal"
                                        onClick={() => handlePrint()}
                                    >
                                        Xác nhận in hóa đơn
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Statistics;