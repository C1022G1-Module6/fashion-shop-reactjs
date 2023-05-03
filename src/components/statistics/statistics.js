import styles from "../data_entry/dataEntry.module.css";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import LineChart from "./LineChart";
import { listAll } from "../../service/statistics/statisticsService";
import { monthRevenue } from "../../service/statistics/statisticsService";
import { Field, Form, Formik } from "formik";
Chart.register(CategoryScale);


function Statistics() {
  const [statistics, setStatistics] = useState([]);

  const [monthRevenues, setMonthRevenues] = useState('');

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
  
  const chartData = {
    labels: statistics.map((statistic) =>{
     return "Ngày " + statistic.day
    }),
    datasets: [
      {
        label: "Doanh thu",
        data: statistics.map((statistic) =>statistic.revenue), 
        backgroundColor: [
          "rgba(75,192,192,1)",
          //   "#ecf0f1",
          //   "#50AF95",
          //   "#f3ba2f",
          //   "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 1,
        hoverBorderWidth: 1,
        hoverBorderColor: "#000",
      },
    ]
  };
  useEffect(() => {
    getStatistics();
  }, []);

  useEffect(() => {
    getMonthRevenues();
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
                const getStatistics = async () => {
                  const statisticsData = await listAll(value);
                  const monthRevenuesData = await monthRevenue(value);
                  console.log(statisticsData.data.filter((a) => a.revenue));
                  setStatistics(statisticsData.data);
                  setMonthRevenues(monthRevenuesData.data[0].totalRevenue);
                  console.log(getMonth)
                };
                getStatistics();
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
                    Tổng doanh thu tháng  { statistics.length!==0 ? <span> {getMonth} : {monthRevenues} VNĐ</span>  : <span> {getMonth} : 0 VNĐ</span>}
                  </h5>
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
      </div>
    </>
  );
}
export default Statistics;