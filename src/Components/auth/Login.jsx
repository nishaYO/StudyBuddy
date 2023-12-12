import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER_MUTATION } from "./../../graphql/mutations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const LoginPopup = ({ onClose, signedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading, error }] = useMutation(LOGIN_USER_MUTATION);
  const handleLogin = async () => {
    try {
      const { data, error } = await login({
        variables: { input: { email, password } },
      });

      if (data && data.login && data.login.loggedIn) {
        localStorage.setItem("token", data.login.token);
        localStorage.setItem(
          "user",
          JSON.stringify(data.login.user)
        );
        console.log("Login successful");
        signedIn(); 
        onClose();
      } else {
        console.error("Login failed1");
      }
    } catch (error) {
      console.error("Login failed2", error.message);
    }
  };

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-8 max-w-md w-full rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Login</h2>
            <button
              className="text-2xl text-gray-600 hover:text-gray-800"
              onClick={handleCloseClick}
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
          <div>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPopup;
