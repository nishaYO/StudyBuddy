import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { fetchReports } from "../apis/reportsData";

function Reports() {
  const [location, navigate] = useLocation();
  
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
    const fetchReportsData = async () => {
      try {
        const data = await fetchReports();
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReportsData();
  }, []);

  const handlePreviousClick = () => {
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
                {key.charAt(0).toUpperCase() + key.slice(1)}: {reports["main-stats"][key]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Reports;
