import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { VERIFY_EMAIL_MUTATION } from "../../graphql/mutations";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const VerifyEmailPopup = ({
  email,
  onVerificationSuccess,
  onClose,
  actionType,
}) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [invalid,setInvalid] = useState(false)
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
      console.log("response: ", response);
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
        console.error("Email verification failed: Invalid verification code.");
        setInvalid(true)
      }
    } catch (error) {
      console.error("Email verification failed:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center mt-12 ml-12 ">
      <div className="bg-violet-500 border-4 border-t-4  border-violet-500 h-[30rem]  max-w-md w-full rounded-lg  shadow-lg">
        <div className="text-center bg-violet border-b-4 border-white">
          <h2 className="text-xl font-bold text-gray-200">Verify Email for {actionType}</h2>
        </div>
        <div className="flex justify-between items-center mb-6 p-3">
          <button
            className="text-2xl text-white hover:text-gray-800"
            onClick={handleCloseClick}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>

        <div className="flex flex-col p-3">
          <div className="flex justify-center items-start">
            <img src="/Images/otp.svg" className="h-32" alt="OTP image" />
          </div>

         {invalid ? (
           <p className="text-center font-bold text-white capitalize">Invalid Verification Number Please check your email for The Verification Code Again.</p>

         ) : (
           <p className="text-center font-bold text-white">Please check your email for the verification code.</p>
         )}
          <input
            type="number"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={handleChange}
            className="mt-2 p-2 w-72 mx-auto border rounded-md "
            required
          />
          <button
            onClick={handleVerifyEmail}
            className="bg-white w-52 mx-auto text-violet-500 font-bold px-4 py-2 mt-4 rounded-md hover:bg-violet-600 hover:text-white"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error.message}</p>}
      </div>
    </div>
  );
};

export default VerifyEmailPopup;
