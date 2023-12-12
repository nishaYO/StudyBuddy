import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import NotificationBox from "./NotificationBox";
import SignupPopup from "./auth/Signup";
import LoginPopup from "./auth/Login";
import { useQuery } from "@apollo/client";
import { AUTO_LOGIN_QUERY } from "../graphql/queries";

function NavbarIcons({ onNotificationsClick }) {
  return (
    <>
      {/* bell icon */}
      <button
        className="text-2xl cursor-pointer"
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
        <button className="text-2xl cursor-pointer">
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

function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRegisterPopUp, setShowRegisterPopUp] = useState(false);
  const [showLoginPopUp, setShowLoginPopUp] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  let inputVariables;
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (user && token) {
    inputVariables = {
      id: user.id,
      email: user.email,
      token: token,
    };
    console.log(inputVariables);
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
            console.log("logged in ");
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

  return (
    <div className="p-3 bg-white border-2 border-b-black flex items-center justify-between relative">
      <div className="flex items-center space-x-4">
        <button className="bg-[#BEADFA] p-1 border-2 border-black">
          Streak: 0 Days
        </button>
        <NavbarIcons onNotificationsClick={handleNotificationsClick} />
      </div>
      {/* Notifications Box */}
      {showNotifications && <NotificationBox onClose={closeNotifications} />}
      {/* Reports Button */}
      <div className="absolute bottom-1 right-20 m-1 p-0">
        <Link href="/reports">
          <button className="bg-purple-500 text-white px-4 py-2 rounded">
            Reports
          </button>
        </Link>
      </div>
      {/* user auth */}
      {isRegistered ? (
        isSignedIn ? (
          <Link href="/user">
            <button className="text-2xl cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="19"
                viewBox="0 0 448 512"
              >
                <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
              </svg>{" "}
            </button>
          </Link>
        ) : (
          <button
            className="bg-[#BEADFA] p-1 border-2 border-black"
            onClick={handleLoginClick}
          >
            Log In
          </button>
        )
      ) : (
        <button
          className="bg-[#BEADFA] p-1 border-2 border-black"
          onClick={handleRegisterClick}
        >
          Register
        </button>
      )}
      {showRegisterPopUp && (
        <SignupPopup onClose={closeRegisterPopUp} signedIn={handleSignedIn} />
      )}
      {showLoginPopUp && (
        <LoginPopup onClose={closeLoginPopUp} signedIn={handleSignedIn} />
      )}
    </div>
  );
}

export default Navbar;
