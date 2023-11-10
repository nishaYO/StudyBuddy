import React, { useState } from "react";
import logo from "/logo2.png";
import { faHome,faMusic,faMugHot,faHourglass,faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SidePanel() {

  const pages = [
    {title: "Welcome",icon:faHome},
    {title: "Timer",icon:faHourglass},
    {title:"Breaks",icon:faMugHot}, 
    {title:"Music",icon:faMusic}, 
    {title:"Session",icon:faBook}
  ];
  const [currentPage, setCurrentPage] = useState("Welcome");

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-1/5 bg-[#D0BFFF] p-4 flex flex-col items-center min-h-screen">
      <img src={logo} alt="Logo" className="w-20 h-auto mb-4" />

      <ul className="mt-8">
        {pages.map((page) => (
          <li
            key={page.title}
            className={`py-4 cursor-pointer flex items-center gap-3 ${
              currentPage === page.title ? "font-bold text-black-500" : ""
            }`}
            onClick={() => handlePageClick(page.title)}
          >
            <span className="text-3xl hidden lg:flex">{page.title}</span>
            <FontAwesomeIcon title={page.title} className="text-2xl lg:hidden flex" icon={page.icon} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidePanel;
