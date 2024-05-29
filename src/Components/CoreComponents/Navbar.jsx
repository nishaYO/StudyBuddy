import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import NotificationBox from "../InformationComponents/NotificationBox";
import StreakGoal from "../InformationComponents/StreakGoal";
import SignupPopup from "../auth/Signup";
import LoginPopup from "../auth/Login";
import { useQuery } from "@apollo/client";
import { AUTO_LOGIN_QUERY } from "../../graphql/queries";
import { FaRegUser } from "react-icons/fa";

function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRegisterPopUp, setShowRegisterPopUp] = useState(false);
  const [showLoginPopUp, setShowLoginPopUp] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [profilePicUrl,setProfilePicUrl] = useState("");
  

  let inputVariables;
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  if (user && token) {
    inputVariables = {
      id: user.id,
      email: user.email,
      token: token,
    };
    // console.log(inputVariables);
  }
  const { data, loading, error } = useQuery(AUTO_LOGIN_QUERY, {
    variables: { input: inputVariables },
  });

  useEffect(() => {
    const handleAutoLoginResponse = () => {
      if (data.autoLogin.loggedIn) {
        setIsRegistered(true);
        setIsSignedIn(true);
      } else {
        setIsRegistered(false);
        setIsSignedIn(false);
      }
    };

    const checkAutoLogin = async () => {
      try {
        if (data && data.autoLogin) {
          const { loggedIn } = data.autoLogin;
          if (loggedIn) {
            console.log("logged in",data);
            setProfilePicUrl(data.autoLogin.profilePicUrl);
            handleAutoLoginResponse();
          }
        }
      } catch (error) {
        console.error("Error during AutoLogin:", error.message);
        setIsRegistered(false);
        setIsSignedIn(false);
      }
    };

    // Call checkAutoLogin when the data changes
    checkAutoLogin();
  }, [data]);

  const handleSignedIn = () => {
    setIsRegistered(true);
    setIsSignedIn(true);
  };

  const handleRegisterClick = () => {
    setShowRegisterPopUp(!showRegisterPopUp);
  };

  const handleLoginClick = () => {
    setShowLoginPopUp(!showLoginPopUp);
  };

  const closeRegisterPopUp = () => {
    setShowRegisterPopUp(false);
  };

  const closeLoginPopUp = () => {
    setShowLoginPopUp(false);
  };

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
  };

  const closeNotifications = () => {
    setShowNotifications(false);
  };
  useEffect(() => {
    if (!user) {
      setShowRegisterPopUp(true);
    }
  }, [user]);
  
  return (
    <div className="p-3 bg-white border-2 border-b-black flex items-center justify-between relative">
      {isSignedIn ? (
        // streak 0 days
        <div className="flex items-center space-x-4 ">
          <StreakGoal/>
          <NavbarIcons onNotificationsClick={handleNotificationsClick} />
        </div>
      ) : (
        // logo and name
        <div className="flex items-center ">
          <img src="/logo1.png" className="h-14 w-14" alt="Logo image" />
          <h3 className="text-xl font-bold">StudyBuddy</h3>
        </div>
      )}
      {/* second section of navbar btns */}
      <div className="flex gap-2 items-center">
        {/* Notifications Box */}
        {showNotifications && <NotificationBox onClose={closeNotifications} />}
        {/* Reports Button  only for signed users */}
        {isSignedIn && (
          <>
            <Link href="/notes">
              <button className="bg-purple-600 hover:bg-purple-400 text-white px-4 py-1 rounded border-2 border-black">
                See Notes
              </button>
            </Link>
            <Link href="/reports">
              <button className="bg-purple-600 hover:bg-purple-400 text-white px-4 py-1 rounded border-2 border-black">
                Reports
              </button>
            </Link>
          </>
        )}
        {/* user auth */}
        {isRegistered ? (
          isSignedIn ? (
            <div className="group">
              <Link href="/user">
                <button className="text-2xl cursor-pointer p-2 bg-white group-hover:bg-purple-500 rounded-full border border-transparent">
                  {/* <FaRegUser className="group-hover:text-white" /> */}
                  <img src={profilePicUrl} alt="profilePic" className="w-10 rounded-2xl"/>
                </button>
              </Link>
            </div>
          ) : (
            <button
              className="bg-[#BEADFA] px-4 py-1 border-2 border-black"
              onClick={handleLoginClick}
            >
              Log In
            </button>
          )
        ) : (
          <button
            className="bg-[#BEADFA] px-4 py-1 border-2 border-black"
            onClick={handleRegisterClick}
          >
            Register
          </button>
        )}
        {showRegisterPopUp && (
          <SignupPopup
            onClose={closeRegisterPopUp}
            showLogin={handleLoginClick}
            signedIn={handleSignedIn}
          />
        )}
        {showLoginPopUp && (
          <LoginPopup
            onClose={closeLoginPopUp}
            showSignup={handleRegisterClick}
            signedIn={handleSignedIn}
          />
        )}
      </div>
    </div>
  );
}
function NavbarIcons({ onNotificationsClick }) {
  return (
    <>
      {/* bell icon */}
      <button
        className="text-2xl cursor-pointer hidden md:block"
        onClick={onNotificationsClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
        </svg>
      </button>
      {/* question mark icon */}
      <Link to="/help">
        <button className="text-2xl cursor-pointer hidden md:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-7 h-7 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
        </button>
      </Link>
    </>
  );
}
export default Navbar;
