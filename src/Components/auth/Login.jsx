import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER_MUTATION } from "./../../graphql/mutations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const LoginPopup = ({ onClose, signedIn, showSignup }) => {
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
        localStorage.setItem("user", JSON.stringify(data.login.user));
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
      <div className="fixed inset-0 flex items-center justify-center mt-12">
        <div className="bg-white ml-10 p-8 max-w-4xl h-[30rem] w-full rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Login</h2>
            <button
              className="text-2xl text-gray-600 hover:text-gray-800"
              onClick={handleCloseClick}
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
          {/* form body */}
          <div className="flex items-center gap-x-20 w-full">
            <div>
              <img
                src="/Images/login.svg"
                className="h-[15rem] lg:flex hidden"
                alt="Login image"
              />
              {/* login Form*/}
            </div>
            <div className="h-full flex flex-col justify-center">
              <form>
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
              </form>
              <div className="mt-4 flex mx-auto">
                <button
                  onClick={handleLogin}
                  className="bg-violet-500 text-white px-4 py-1.5  rounded-md hover:bg-violet-600 "
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
                <button
                  onClick={() => {
                    showSignup();
                    handleCloseClick();
                  }}
                  className="bg-white-500 text-violet-500 px-4 py-2  mx-5  rounded-md
            hover:underline "
                >
                  Create a new account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPopup;

{
  /* <label
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
/> */
}
