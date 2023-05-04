import styles from "../data-entry/dataEntry.module.css";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import LineChart from "./LineChart";
import { monthRevenue, dayCost, monthCost, listAll } from "../../service/statistics/statisticsService";
import { Field, Form, Formik } from "formik";
Chart.register(CategoryScale);


function Statistics() {
  const [statistics, setStatistics] = useState([]);

  const [monthRevenues, setMonthRevenues] = useState('');

  const [dayCosts, setDaycosts] = useState([]);

  const [monthCosts, setMonthCosts] = useState('');

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const [getMonth, setGetMonth] = useState('');

  const getStatistics = async () => {
    const statisticsData = await listAll("");
    setStatistics(statisticsData.data);

  };

  const getMonthRevenues = async () => {
    const monthRevenuesData = await monthRevenue("");
    setMonthRevenues(monthRevenuesData.data);

  };

  const getDayCosts = async () => {
    const dayCostsData = await dayCost("");
    setDaycosts(dayCostsData.data);

  };

  const getMonthCosts = async () => {
    const monthCostsData = await monthCost("");
    setMonthCosts(monthCostsData.data);

  };
  
  const chartData = {
    // labels: statistics.map((statistic) =>{
    //  return "Ngày " + statistic.day
    // }),

    labels: dayCosts.map((dayCost) =>{
      return "Ngày " + dayCost.day
     }),
    datasets: [
      {
        label: "Doanh thu",
        data: statistics.map((statistic) =>statistic.revenue), 
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
        data: dayCosts.map((dayCost) =>dayCost.cost), 
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
    getStatistics();
  }, []);

  useEffect(() => {
    getMonthRevenues();
  }, []);

  useEffect(() => {
    getDayCosts();
  }, []);

  useEffect(() => {
    getMonthCosts();
  }, []);

  return (
    <>
      <div className="container-fluid p-0">
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
                  const statisticsData = await listAll(value);
                  const monthRevenuesData = await monthRevenue(value);
                  const dayCostsData = await dayCost(value);
                  const monthCostsData = await monthCost(value);
                  setStatistics(statisticsData.data);
                  setMonthRevenues(monthRevenuesData.data.totalRevenue);
                  setDaycosts(dayCostsData.data);
                  setMonthCosts(monthCostsData.data.totalCost);
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
                <div className="d-flex justify-content-center">
                  <LineChart chartData={chartData} />
                </div>
                <div className="row d-flex justify-content-center">
                <div className=" mt-4 mb-4 col-6 pe-0">
                  <h5
                    style={{ backgroundColor: "#93D9D9", width: "500px" }}
                    className="text-center pt-2 pb-2"
                  >
                    Tổng doanh thu tháng  { statistics.length!==0 ? <span> {getMonth} : {monthRevenues} VNĐ</span>  : <span> {getMonth} : 0 VNĐ</span>}
                  </h5>
                </div>
                <div className=" mt-4 mb-4 col-6 ps-0">
                  <h5
                    style={{ backgroundColor: "#FFC58C", width: "500px" }}
                    className="text-center pt-2 pb-2"
                  >
                    Tổng chi phí tháng  { dayCosts.length!==0 ? <span> {getMonth} : {monthCosts} VNĐ</span>  : <span> {getMonth} : 0 VNĐ</span>}
                  </h5>
                </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-outline-primary mb-5"
                  >
                    <i className="bi bi-printer-fill" /> In thống kê
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
export default Statistics;
