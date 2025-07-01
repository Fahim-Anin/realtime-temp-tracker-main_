import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { fetchTemperature } from "../api/temperature";

Chart.register(...registerables);

export default function TemperatureChart() {
  const [chartData, setChartData] = useState([]);

  const { data, error } = useQuery({
    queryKey: ["temperature"],
    queryFn: fetchTemperature,
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (data?.temperature !== undefined) {
      setChartData((prev) => [
        ...prev.slice(-9), // keep last 9 entries (total 10)
        { time: new Date().toLocaleTimeString(), temp: data.temperature },
      ]);
    }
  }, [data]);

  if (error) return <div>Error loading temperature data</div>;

  return (
    <div className="w-full max-w-4xl mx-auto p-2 ml-4 md:ml-8">
      {/* Current Temperature Display */}
      {data?.temperature !== undefined && (
        <div className="text-center mb-2">
          <span className="inline-block bg-teal-100 text-gray-800 font-semibold text-sm sm:text-sm md:text-lg px-2 sm:px-3 py-1 rounded shadow ml-2 sm:ml-4 ">
            Present Temperature: {data.temperature}°C
          </span>
        </div>
      )}

      {/* Chart */}
      <Line
        data={{
          labels: chartData.map((point) => point.time),
          datasets: [
            {
              label: "Temperature (°C)",
              data: chartData.map((point) => point.temp),
              fill: true,
              backgroundColor: "rgba(62, 221, 221, 0.2)",
              borderColor: "rgb(62, 221, 221)",
              pointBackgroundColor: "#3edddd",
              tension: 0.4,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true, position: "top" },
            tooltip: { mode: "index", intersect: false },
          },
          interaction: { mode: "nearest", axis: "x", intersect: false },
          scales: {
            x: {
              grid: { display: false },
              title: { display: true, text: "Time" },
              ticks: {
                callback: function (val, index, ticks) {
                  const label = this.getLabelForValue(val);
                  const currentTime = chartData[chartData.length - 1]?.time;
                  return label === currentTime ? `**${label}**` : label;
                },
                font: (context) => {
                  const label = context.tick.label;
                  const currentTime = chartData[chartData.length - 1]?.time;
                  return {
                    weight: label === currentTime ? "bold" : "normal",
                  };
                },
              },
            },
            y: {
              beginAtZero: false,
              title: { display: true, text: "Temperature (°C)" },
            },
          },
        }}
      />
    </div>
  );
}
