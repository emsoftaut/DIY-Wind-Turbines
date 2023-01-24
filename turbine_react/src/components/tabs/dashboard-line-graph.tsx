import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.defaults.color = "#FFFFFF";

const DashboardLineChart = () => {
  const data = {
    labels: [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000],
    datasets: [
      {
        label: "Turbine Rotation",
        data: [15, 30, 45, 60, 75, 90, 105, 110, 115, 116, 116],
        borderWidth: 1,
        borderColor: "rgb(55,162,235)",
        backgroundColor: "rgb(53,162,235)",
        yAxisID: "y",
      },
      {
        label: "PID Error",
        data: [15, 15, 15, 15, 15, 15, 15, 5, 5, 1, 1],
        borderWidth: 1,
        borderColor: "rgb(55,162,235)",
        backgroundColor: "rgb(53,162,235)",
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,

    title: {
      display: true,
      text: "Turbine Rotation (°) vs Time (ms)",
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
      },

      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return <Line options={options} data={data}></Line>;
};

export default DashboardLineChart;
