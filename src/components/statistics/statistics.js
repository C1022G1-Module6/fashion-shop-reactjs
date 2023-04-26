import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import LineChart from "./LineChart";
import listAll from "../../service/statistics/statisticsService";
import './App.css';
Chart.register(CategoryScale);
 
function Statistics() {
  
  const [statistics, setStatistics] = useState([]);
  const getStatistics = async () => {
    const statisticsData = await listAll();
    setStatistics(statisticsData.data);
    console.log(statisticsData.data);
  };

  const chartData = {
    labels: statistics.map((statistic) => statistic.date), 
    datasets: [
      {
        label: "Users Gained ",
        data: statistics.map((statistic) => statistic.revenue),
        backgroundColor: [
          "rgba(75,192,192,1)"
        //   "#ecf0f1",
        //   "#50AF95",
        //   "#f3ba2f",
        //   "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 1
      }
    ]
  }
  useEffect(() => {
    getStatistics();
  },[])
 
  return (
    <>
    <div>
      <LineChart chartData={chartData}/>
    </div>
    </>
  );
}
export default Statistics;
