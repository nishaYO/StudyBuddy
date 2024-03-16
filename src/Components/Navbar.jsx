import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import NotificationBox from "./NotificationBox";
import SignupPopup from "./auth/Signup";
import LoginPopup from "./auth/Login";
import { useQuery } from "@apollo/client";
import { AUTO_LOGIN_QUERY } from "../graphql/queries";
import { FaRegUser } from "react-icons/fa";
import { FaFire } from "react-icons/fa";

// Component for rendering notification and help icons in the navbar
function NavbarIcons({ onNotificationsClick }) {
  return (
    <>
      {/* Bell icon */}
      <button
        className="text-2xl cursor-pointer"
        onClick={onNotificationsClick}
      >
        {/* SVG code for bell icon */}
      </button>
      {/* Help icon */}
      <Link to="/help">
        <button className="text-2xl cursor-pointer">
          {/* SVG code for help icon */}
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

  // Set input variables for auto-login query if user is logged in
  if (user && token) {
    inputVariables = {
      id: user.id,
      email: user.email,
      token: token,
    };
  }

  // Fetch auto-login data
  const { data, loading, error } = useQuery(AUTO_LOGIN_QUERY, {
    variables: { input: inputVariables },
  });

  // Update user login status based on auto-login response
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

  // Set user as signed in
  const handleSignedIn = () => {
    setIsRegistered(true);
    setIsSignedIn(true);
  };

  // Toggle register popup visibility
  const handleRegisterClick = () => {
    setShowRegisterPopUp(!showRegisterPopUp);
  };

  // Toggle login popup visibility
  const handleLoginClick = () => {
    setShowLoginPopUp(!showLoginPopUp);
  };

  // Close register popup
  const closeRegisterPopUp = () => {
    setShowRegisterPopUp(false);
  };

  // Close login popup
  const closeLoginPopUp = () => {
    setShowLoginPopUp(false);
  };

  // Toggle notifications visibility
  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
  };

  // Close notifications
  const closeNotifications = () => {
    setShowNotifications(false);
  };

  return (
    <div className="p-3 bg-white border-2 border-b-black flex items-center justify-between relative">
      {/* Render StudyBuddy logo if not signed in */}
      {!isSignedIn ? (
        <div className="flex items-center ">
          <img src="/logo1.png" className="h-14 w-14" alt="Logo image" />
          <h3 className="text-xl font-bold">StudyBuddy</h3>
        </div>
      ) : (
        // Render streak information if signed in
        <div className="flex items-center space-x-4">
          <button className="bg-[#BEADFA] p-1 rounded-xl font-bold text-xl  flex items-center">
            <FaFire />0
          </button>
          <NavbarIcons onNotificationsClick={handleNotificationsClick} />
        </div>
      )}

      {/* Render authentication and user actions */}
      <div className="flex gap-2 items-center">
        {/* Render notifications box if visible */}
        {showNotifications && <NotificationBox onClose={closeNotifications} />}

        {/* Render different authentication and user actions based on user state */}
        {isRegistered ? (
          isSignedIn ? (
            // Render user dropdown if signed in
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="">
                <div className=" rounded-full">
                  <FaRegUser className="group-hover:text-white text-3xl" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {/* Render user actions */}
                {isSignedIn && (
                  <div className="grid">
                    <Link href="/notes">
                      <button className=" hover:text-purple-500 hover:bg-transparent btn bg-transparent border-none">
                        See Notes
                      </button>
                    </Link>
                    <Link href="/reports">
                      <button className=" hover:text-purple-500 hover:bg-transparent btn bg-transparent border-none">
                        Reports
                      </button>
                    </Link>
                    <Link href="/user">
                      <button className="bg-purple-600 hover:bg-purple-400 text-white btn">
                        Profile
                      </button>
                    </Link>
                  </div>
                )}
              </ul>
            </div>
          ) : (
            // Render login button if not signed in
            <button
              className="bg-[#BEADFA] px-4 py-1 border-2 border-black"
              onClick={handleLoginClick}
            >
              Log In
            </button>
          )
        ) : (
          // Render register button if not registered
          <button
            className="bg-[#BEADFA] px-4 py-1 border-2 border-black"
            onClick={handleRegisterClick}
          >
            Register
          </button>
        )}

        {/* Render sign up and login popups */}
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

export default Navbar;
