import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Stats() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // Replace with your real API endpoint
        // const response = await fetch('/api/stats');
        // const data = await response.json();

        // Placeholder "fake API data"
        const data = {
          labels: ["Science", "Math", "History"],
          values: [50, 98, 86],
        };

        setChartData({
          labels: data.labels,
          datasets: [
            {
              label: "Sample Data",
              data: data.values,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        });
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "600px", margin: "auto" }}>
      <h1 style={{ color: "black", textAlign: "center" }}>Stats Page</h1>
      {loading && <p>Loading chart...</p>}
      {!loading && chartData && <Bar data={chartData} />}
      {!loading && !chartData && <p>No data available.</p>}
    </div>
  );
}

export default Stats;
