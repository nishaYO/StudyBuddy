import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGN_UP_MUTATION } from "../../graphql/mutations";
import VerifyEmailPopup from "./VerifyEmail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { getUserInfo } from "../Services/getUserInfo";
import GoogleAuth from "./GoogleAuth";

const SignupPopup = ({ onClose, signedIn, showLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const userMetadata = getUserInfo();
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);

  const [signup, { loading, error }] = useMutation(SIGN_UP_MUTATION);

  const handleCloseClick = () => {
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      console.log("hello");
      const { data, error } = await signup({
        variables: {
          input: {
            name: userMetadata.name,
            email: formData.email,
            password: formData.password,
            timezone: userMetadata.timezone,
            streakGoal: userMetadata.streakGoal,
            deviceSize: userMetadata.deviceSize,
            userAgent: userMetadata.userAgent,
          },
        },
      });
      console.log("hello");

      if (error) {
        console.error("GraphQL Errors:", error);
        return;
      }

      console.log("data: ", data);
      console.log("data.signup", data.signup)
      console.log("data.signup.codemailed", data.signup.CodeMailed)
      if (data && data.signup && data.signup.CodeMailed) {
        setShowVerifyEmail(true);
        console.log("data is true");
        
      } else {
        console.log("Error: error while sending mail.");
      }
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };

  return (
    <>
      <div className="fixed flex z-40 justify-center items-center bg-[rgba(0,0,0,0.5)] left-0 top-0 w-full min-h-screen">
        <div className="bg-white p-8 min-h-[30rem] sm:max-w-1 lg:min-w-[350px] rounded-lg shadow-lg grid-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Sign up to unlock all features</h2>
            <button
              onClick={handleCloseClick}
              className="p-4"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
          {/* form body */}
          <div className="sm:grid-rows-2 sm:grid lg:flex items-center lg:gap-x-20 w-full">
            <div>
              <img className="max-w-[250px] m-auto" src="/Images/welcome.svg" alt="SignUp Image" />
            </div>
            {/* form */}
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full lg:min-w-[350px] border rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
           <div >
            <p
              onClick={() => {
                showLogin();
                handleCloseClick();
              }}
              className="bg-white-500 text-violet-600 rounded-md mt-4 mb-4
            hover:underline"
            >
              Already registered?{" "}
            </p>
           <button
              type="submit"
              className="bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-violet-600 w-full"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            <GoogleAuth signedIn={signedIn} onClose={onClose}/>
           </div>
          </form>
          </div>
          
          {error && <p className="text-red-500 mt-4">{error.message}</p>}
        </div>
      {showVerifyEmail && (
        <VerifyEmailPopup
          email={formData.email}
          onVerificationSuccess={() => {
            signedIn();
            setShowVerifyEmail(false);
            onClose();
          }}
          onClose={() => setShowVerifyEmail(false)}
          actionType={"Sign Up"}
        />
      )}
        </div>
    </>
  );
};

export default SignupPopup;
{/* <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            <button
              onClick={() => {
                showLogin();
                handleCloseClick();
              }}
              className="bg-white-500 text-blue-600 px-4 py-2  mx-5  rounded-md
            hover:bg-grey-100 m-4"
            >
              Already registered?{" "}
            </button>
          </form> */}