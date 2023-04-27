// import Chart from "chart.js/auto";
// import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js"
import { useEffect, useState } from "react";
import LineChart from "./LineChart";
import listAll from "../../service/statistics/statisticsService";
import { Field, Form, Formik } from "formik";
Chart.register(CategoryScale);

function Statistics() {
  const [statistics, setStatistics] = useState([]);
  const getStatistics = async () => {
    const statisticsData = await listAll("");
    setStatistics(statisticsData.data);
    console.log(statisticsData.data);
  };

  const chartData = {
    labels: statistics.map((statistic) => statistic.day),
    datasets: [
      {
        label: "Users Gained ",
        data: statistics.map((statistic) => statistic.revenue),
        backgroundColor: [
          "rgba(75,192,192,1)",
          //   "#ecf0f1",
          //   "#50AF95",
          //   "#f3ba2f",
          //   "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    getStatistics();
  }, []);
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [getMonth, setGetMonth] = useState("")
  return (
    <>
      <div class="container-fluid p-0">
      <div className="row">
      <div class="col-sm-12 col-lg-12 col-md-12 p-0">
        <legend class="fw-bolder text-center heading mb-3">
          THỐNG KÊ THU NHẬP THÁNG {getMonth}
        </legend>
      </div>
      <div className="row">
      <Formik
        initialValues={{
          month: "",
        }}
        onSubmit={(value) => {
          const getStatistics = async () => {
            const statisticsData = await listAll(value);
            setStatistics(statisticsData.data);
            setGetMonth(value.month)
          };
          getStatistics();
        }}
      >
        <Form className="row">
          <div className="col-6">
          <Field as="select" className="form-select" name="month">
            <option value={""}>Chọn tháng</option>
            {months.map((month) => (
              <option key={month} value={month}>
                Tháng {month}
              </option>
            ))}
          </Field>
          </div>
          <div className="col-6">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
      </div>
      </div>
      <div className="row d-flex justify-content-center">
        <LineChart chartData={chartData} />
      </div>
      </div>
    </>
  );
}
export default Statistics;
