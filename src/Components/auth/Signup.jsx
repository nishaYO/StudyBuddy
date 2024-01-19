import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGN_UP_MUTATION } from "../../graphql/mutations";
import VerifyEmailPopup from "./VerifyEmail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { getUserInfo } from "./../../utils/getUserInfo";

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

      if (error) {
        console.error("GraphQL Errors:", error);
        return;
      }

      console.log("data: ", data);

      if (data && data.signup && data.signup.CodeMailed) {
        setShowVerifyEmail(true);
      } else {
        console.log("Error: error while sending mail.");
      }
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-8 max-w-md w-full rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Sign Up</h2>
            <button
              className="text-2xl text-gray-600 hover:text-gray-800"
              onClick={handleCloseClick}
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
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
          </form>
          {error && <p className="text-red-500 mt-4">{error.message}</p>}
        </div>
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
    </>
  );
};

export default SignupPopup;
