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
              width: "50px"
            },
            layout: {
              display: true,
              width: "1000px"
            },
          },
          scales: {
            y: {
              title: {
                display: true,
                text: 'VNĐ'
              },
            }
          },
        }}
      />
    </div>
    </>
  );
}
export default LineChart;