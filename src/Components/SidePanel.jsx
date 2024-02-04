import React, { useEffect, useState } from "react";
// icons 
import { IoIosTimer } from "react-icons/io";
import { MdFreeBreakfast,MdMusicNote } from "react-icons/md";


import logo from "/logo2.png";

function SidePanel() {
  // getting username to display in sidepannel
  const [username, setUsername] = useState("");
  useEffect(() => {
    let name = localStorage.getItem("name");
    name ? setUsername(name) : "";
  });

  const pages = [
    {title:"Timer",label: "Set Timer",icon:<IoIosTimer/>}, 
    {title:"Breaks",label: "Set Breaks",icon:<MdFreeBreakfast/>}, 
    {title:"Music",label: "Set Music",icon:<MdMusicNote/>}
  ];
  const [currentPage, setCurrentPage] = useState(pages[0]);
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div>
      {/* sidepanel for lg screens */}
      <div className="w-56 bg-[#D0BFFF]  hidden lg:block min-h-screen">
        {/* logo and welcome message */}
        <div className="flex flex-col items-center p-2">
          <img src={logo} alt="Logo" className="w-20 h-20 " />
          <div >
            <h1 className="text-xl font-bold">StudyBuddy</h1>
            <h2 className="text-center font-bold">{username}!</h2>
          </div>
        </div>
        <div className="flex items-center justify-center">
        <hr className="border border-[#FFF3DA] w-52"/>
        </div>
        <ul className="space-y-2 mt-6 flex flex-col gap-y-6 items-center ">
          {pages.map((page) => (
            <li
              key={page.title}
              className={`ml-2 p-2 cursor-pointer flex gap-x-6 items-center   ${
                currentPage === page.title ? "font-bold text-black-500 bg-[#FFF3DA] p-2 w-full rounded-l-full" : ""
              }`}
              onClick={() => handlePageClick(page.title)}
            >
              <span className="text-3xl">{page.icon}</span>
              {page.label}
            </li>
          ))}
        </ul>
      </div>
      {/* navbar for mobild and md screens */}
      <div className="absolute left-0 mt-2 block lg:hidden z-50">
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
          <div className="relative p-2 left-1 rounded-lg h-24 w-full bg-purple-500 border-2 border-white">
            <ul className="space-y-2">
              {pages.map((page) => (
                <li
                  key={page}
                  className={`cursor-pointer text-white ${
                    currentPage === page ? "font-extrabold" : ""
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
