import React, { useState } from "react";
import logo from "/logo2.png";

function SidePanel() {
  const pages = ["Timer", "Breaks", "Music"];
  const [currentPage, setCurrentPage] = useState(pages[0]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div>
      {/* sidepanel for lg screens */}
      <div className="w-44 bg-[#D0BFFF] p-4 hidden lg:block min-h-screen">
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
      {/* navbar for mobild and md screens */}
      <div className="absolute left-0 mt-2 block lg:hidden">
        <button onClick={() => setShowMenu((prev) => !prev)}>
          {!showMenu ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
        {showMenu && (
          <div className="relative p-2 left-1 rounded-lg h-24 w-full bg-white ">
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
        )}
      </div>
    </div>
  );
}

export default SidePanel;
