import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { VERIFY_EMAIL_MUTATION } from "../../graphql/mutations";

const VerifyEmailPopup = ({ email, onVerificationSuccess, onClose }) => {
  const [verificationCode, setVerificationCode] = useState("");

  const [verifyEmail, { loading, error }] = useMutation(
    VERIFY_EMAIL_MUTATION,
    {}
  );

  const handleCloseClick = () => {
    onClose();
  };

  const handleChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleVerifyEmail = async () => {
    try {
      const response = await verifyEmail({
        variables: { input: { code: verificationCode, email } },
      });
  
      if (response.data.verifyEmail.verified) {
        // Verification successful
        localStorage.setItem("token", response.data.verifyEmail.token);
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.verifyEmail.user)
        );
        // signin the user and close the verify email popup 
        onVerificationSuccess();
      } else {
        // Verification failed
        console.error("Email verification failed: Invalid verification code.");
      }
    } catch (error) {
      console.error("Email verification failed:", error.message);
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-8 max-w-md w-full rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Verify Email</h2>
          <button
            className="text-2xl text-gray-600 hover:text-gray-800"
            onClick={handleCloseClick}
          >
            Close
          </button>
        </div>
        <p>Please check your email for the verification code.</p>
        <input
          type="text"
          placeholder="Verification Code"
          value={verificationCode}
          onChange={handleChange}
          className="mt-2 p-2 w-full border rounded-md"
          required
        />
        <button
          onClick={handleVerifyEmail}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>
        {error && <p className="text-red-500 mt-4">{error.message}</p>}
      </div>
    </div>
  );
};

export default VerifyEmailPopup;
