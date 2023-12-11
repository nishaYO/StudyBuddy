import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      email
      name
    }
  }
`;

function User() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <p className="text-lg font-medium p-6 rounded-lg flex flex-col items-center justify-center  h-screen " >User information not found. Please log in.</p>;
  }
  const handleChangePassword = () => {
    console.log(`Change password for user with ID: ${user.id}`);
  };

  const handleLogout = () => {
    console.log("Logout");
  };

  const handleDeleteAccount = () => {
    console.log("Delete Account");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h2 className="text-3xl font-semibold mb-4">User Info</h2>
      <div className="bg-gray-100 p-6 rounded-lg flex flex-col items-center justify-center  gap-3 shadow-md w-[1000px] h-[500px] text-center">
        <p className="text-lg font-medium mb-2">Name: {user.name}</p>
        <p className="text-lg font-medium mb-4">Email: {user.email}</p>
        <div  className="flex flex m-2  gap-10 items-center justify-center">
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
    </div>
  );
}

export default User;
