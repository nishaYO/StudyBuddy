import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useLocation } from "wouter";
import {
  DELETE_USER_MUTATION,
  RESET_PASSWORD_MUTATION,
} from "../../graphql/mutations";
const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      email
      name
    }
  }
`;

function User() {
  const [location, navigate] = useLocation();
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false); // State to control the visibility of the password prompt
  const [newPassword, setNewPassword] = useState("");
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);
  const [resetPassword] = useMutation(RESET_PASSWORD_MUTATION);
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return (
      <p className="text-lg font-medium p-6 rounded-lg flex flex-col items-center justify-center  h-screen ">
        User information not found. Please log in.
      </p>
    );
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    console.log("Logout");
  };

  const handleChangePassword = async () => {
    setShowPasswordPrompt(true); // Show the password prompt when the user clicks on "Change Password"
  };

  const handlePasswordChangeConfirm = async () => {
    try {
      // Call the resetPassword mutation with the user's ID and the new password
      await resetPassword({
        variables: {
          input: {
            id: user.id,
            email: user.email,
            newPassword: newPassword,
          },
        },
      });

      console.log("Changed password successfully");
      setNewPassword(""); // Clear the new password input after changing password
      setShowPasswordPrompt(false); // Hide the password prompt after changing password
    } catch (error) {
      console.error("Error changing password:", error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser({ variables: { userID: user.id } }); // Call the deleteUser mutation with the user's ID
      localStorage.clear();
      console.log("Deleted Your Account");
    } catch (error) {
      console.error("Error deleting account:", error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen mt-6">
      <h2 className="text-3xl font-semibold mb-4">User Info</h2>
      <div className="bg-gray-100 p-6 rounded-lg flex flex-col items-center justify-center  gap-3 shadow-md w-[1000px] h-[500px] text-center">
        <p className="text-lg font-medium mb-2">Name: {user.name}</p>
        <p className="text-lg font-medium mb-4">Email: {user.email}</p>
        <div className="flex flex m-2  gap-10 items-center justify-center">
          <button
            className="bg-[#BEADFA] text-white p-2 rounded-md mb-2"
            onClick={handleChangePassword}
          >
            Change Password
          </button>
          <button
            className="bg-[#BEADFA] text-white p-2 rounded-md mb-2"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            className="bg-[#BEADFA] text-white p-2 rounded-md"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </div>
      </div>
      {showPasswordPrompt && ( // Render the password input field only when showPasswordPrompt is true
        <div>
          <input
            type="password"
            placeholder="New Password"
            className="p-2 rounded-md border border-gray-400"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            className="bg-[#BEADFA] text-white p-2 rounded-md"
            onClick={handlePasswordChangeConfirm}
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}

export default User;
