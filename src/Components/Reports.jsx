import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

function Reports() {
  const [location, navigate] = useLocation();
  
  // sample reports object
  const sampleReports = {
    "main-stats": {
      "current Streak": 0,
      "Highest Streak": 0,
      "Highest Hours local Session": 0,
      "total Hours": 0,
      "today total Hours": 0,
    },
  };
  const [reports, setReports] = useState(sampleReports);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("http://localhost:5000/reports/fetch");
        if (response.ok) {
          const data = await response.json();
          setReports(data.reports);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  const handlePreviousClick = () => {
    // todo: Navigate back to the previous page
    navigate("/");
  };

  return (
    <div className="m-5 flex flex-col items-center">
      <button
        className="bg-[#D0BFFF] text-white px-4 py-2 m-2 rounded"
        onClick={handlePreviousClick}
      >
        Back
      </button>
      <h2 className="">See your Reports📝</h2>
      <div className="bg-white flex flex-col items-center w-full lg:w-1/2 p-5 m-4 border-2 rounded-lg border-[#BEADFA] shadow-lg">
        <div className="m-5">
          <ul>
            {Object.keys(reports["main-stats"]).map((key) => (
              <li key={key} className="m-8">
                {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                {reports["main-stats"][key]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Reports;
