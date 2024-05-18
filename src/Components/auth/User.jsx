import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
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
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);
  const [resetPassword] = useMutation(RESET_PASSWORD_MUTATION);
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <p className="text-lg font-medium p-6 rounded-lg flex flex-col items-center justify-center h-screen">
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
    setShowPasswordPrompt(true);
  };

  const handlePasswordChangeConfirm = async () => {
    try {
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
      setNewPassword("");
      setShowPasswordPrompt(false);
    } catch (error) {
      console.error("Error changing password:", error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser({ variables: { userID: user.id } });
      localStorage.clear();
      console.log("Deleted Your Account");
    } catch (error) {
      console.error("Error deleting account:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <h2 className="text-3xl font-semibold mb-4">User Info</h2>
      <div className="bg-gray-100 p-6 rounded-lg flex flex-col items-center justify-center gap-3 shadow-md w-full max-w-md md:max-w-2xl lg:max-w-4xl text-center">
        <img
          src="/avatar.jpg"
          alt="User Avatar"
          className="w-24 h-24 rounded-full mb-4"
        />
        <p className="text-lg font-medium mb-2">Name: {user.name}</p>
        <p className="text-lg font-medium mb-4">Email: {user.email}</p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-center">
          <button
            className="bg-[#BEADFA] text-white p-2 rounded-md mb-2 sm:mb-0"
            onClick={handleChangePassword}
          >
            Change Password
          </button>
          <button
            className="bg-[#BEADFA] text-white p-2 rounded-md mb-2 sm:mb-0"
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
      {showPasswordPrompt && (
        <div className="mt-4 flex flex-col items-center">
          <input
            type="password"
            placeholder="New Password"
            className="p-2 rounded-md border border-gray-400 mb-2"
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
