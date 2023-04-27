import React from "react";
// import { Line } from "react-chartjs-2";
import {Line} from "react-chartjs-2"
import '../../App.css';
function LineChart({ chartData }) {
  return (
    <>
    <div style={{ width: "1000px"}}>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Doanh thu năm 2023",
              width: "50px"
            },
            layout: {
              display: true,
              width: "1000px"
            }
          }
        }}
      />
    </div>
    </>
  );
}
export default LineChart;