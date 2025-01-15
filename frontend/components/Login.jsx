import React, { useState } from "react";
import authLogin, { getUserDetails } from "../pages/api/auth/auth";
import { useRouter } from "next/router";
import PopUpMessage from "./PopUpMessage";

const Login = ({ signedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    setError("");
    e.preventDefault();

    // Only this part
    // localStorage.setItem("JWT_token", c5e391cc4f1f90b705b8a033b60ae823ecb6dd38);
    // signedIn(c5e391cc4f1f90b705b8a033b60ae823ecb6dd38);
    // localStorage.setItem("UserDetails", { name: "admin", role: 1 });
    // router.push("/");

    try {
      // Verify username and password
      const result = await authLogin(username, password);
      if (result.name !== "AxiosError") {
        signedIn(result);
        localStorage.setItem("JWT_token", result);
        const userDetails = await getUserDetails(username);

        localStorage.setItem("UserDetails", userDetails);
        router.push("/");
      }
      setError(
        "Username or password are incorrect. Please try again or contact the administrator."
      );
      setPassword("");
      setUsername("");
      router.push("/");
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div className="flex flex-row h-screen">
      <div className="sm:flex w-1/2 h-screen hidden">
        <img src="/login.jpeg" className="h-full w-full" />
      </div>
      <div className="w-full sm:w-1/2 min-h-full m-auto flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src="/simplestock.png" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            method="POST"
            onSubmit={(e) => handleLogin(e)}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Email address
                </label>
                <input
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            {error && <PopUpMessage content={error} type={"error"} />}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
