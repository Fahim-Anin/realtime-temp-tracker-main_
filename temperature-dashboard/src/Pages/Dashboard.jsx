import React, { useEffect, useState } from "react";
import TemperatureChart from "../Components/TemperatureChart";
import Layout from "../Components/Layout";
import Navbar from "../Components/Navbar/Navbar";

export default function Dashboard() {
  const [hasToken, setHasToken] = useState(!!localStorage.getItem("accessToken"));

  useEffect(() => {
    const handleTokenChange = () => {
      setHasToken(!!localStorage.getItem("accessToken"));
    };

    window.addEventListener("tokenChanged", handleTokenChange);
    return () => window.removeEventListener("tokenChanged", handleTokenChange);
  }, []);

  return (
    <Layout>
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-8 mt-12 w-full lg:w-1/2 mx-auto">
        <h1 className="text-lg font-semibold md:font-bold md:text-2xl text-center mb-4">
          Real-Time Temperature Monitoring
        </h1>

        {hasToken ? (
          <TemperatureChart />
        ) : (
          <div className="text-center text-red-600 font-medium mt-8">
            🔒 Please <span className="text-blue-600 font-semibold">log in</span> to access the temperature chart.
          </div>
        )}
      </div>
    </Layout>
  );
}
