import React, { useState } from "react";
import logo from "../../public/logo2.png";

function SidePanel() {
  const [currentPage, setCurrentPage] = useState("Timer"); // Set the initial current page

  const pages = ["Timer", "Breaks", "Music", "Session"];

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-1/5 bg-[#D0BFFF] p-4">
      <img src={logo} alt="Logo" className="w-20 h-auto mb-4" />

      <ul className="space-y-2">
        {pages.map((page) => (
          <li
            key={page}
            className={`cursor-pointer ${
              currentPage === page ? "font-bold text-black-500" : ""
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidePanel;
