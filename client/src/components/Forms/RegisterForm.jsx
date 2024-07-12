import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../constants.js";
import { DNA } from "react-loader-spinner";
import useAuth from "../../contexts/UserContext.js";

function RegisterForm() {
    const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleConfirmPassword = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);
    setIsPasswordMatch(confirmPasswordValue === password);
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setIsPasswordMatch(passwordValue === confirmPassword);
  };

  const { login } = useAuth();

  const handleLogin = async (loginUsername, loginPassword) => {
    try {
      const response = await axios.post(
        `${server}/user/login`,
        { username: loginUsername, password: loginPassword },
        { withCredentials: true }
      );

      const { _id, name, email, username, problems, contests } = response.data.data.loggedInUser;
      login({ _id, name, email, username, problems, contests });
      navigate('/');
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if ([username, name, email, password].some((field) => !field || field.trim() === "")) {
      setIsLoading(false);
      alert("All fields are required");
      return;
    }

    if (!isPasswordMatch) {
      setIsLoading(false);
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${server}/user/register`,
        {
          username: username.trim().toLowerCase(),
          name,
          email: email.trim().toLowerCase(),
          password,
        },
        {
          withCredentials: true,
        }
      );

      await handleLogin(username, password);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert("User with Username or Email already exists");
      } else {
        alert("An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="bg-black text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
        <div className="text-foreground font-semibold text-4xl tracking-tighter mx-auto flex items-center gap-2 logoText-notlogo">
          <span>&lt;CodeCache&gt;</span>
        </div>
        <div className="relative mt-12 w-full max-w-lg sm:mt-10">
          <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
          <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
            <div className="flex flex-col p-6">
              <h3 className="text-xl font-semibold leading-6 tracking-tighter">
                Register
              </h3>
              <p className="mt-1.5 text-sm font-medium text-white/50">
                Welcome, fill in your details to register
              </p>
            </div>
            <div className="p-6 pt-0">
              <form onSubmit={handleRegister}>
                <div className="flex flex-col gap-4">
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Username
                      </label>
                    </div>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      autoComplete="off"
                      className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Email
                      </label>
                    </div>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      autoComplete="off"
                      className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Name
                      </label>
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      autoComplete="off"
                      className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Password
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="password"
                        name="password"
                        className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                    </div>
                  </div>
                  <div
                    className={`group relative rounded-lg border px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring ${isPasswordMatch ? "focus-within:ring-sky-300/30  focus-within:border-sky-200" : "focus-within:ring-red-500/50  focus-within:border-red-200"}`}
                  >
                    <div className="flex justify-between">
                      <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Confirm Password
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="password"
                        name="confirmPassword"
                        className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground cnfPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-end gap-x-2">
                  {isLoading ? (
                    <DNA />
                  ) : (
                    <button
                      className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
