"use client";
import React, { useContext, useState } from "react";
import { DashboardContext } from "@/app/context/ApiContext";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const { checkUser, setCheckUser, checkUserAcc } =
    useContext(DashboardContext);

  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);

    const isUserValid = checkUserAcc();

    if (!isUserValid) {
      setErrorMsg("Invalid email or password");
      setIsLoading(false);
    } else {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        router.push("/");
        setCheckUser({ email: "", password: "" });
      }, 1000);
    }
  };

  return (
    <>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={checkUser.email}
        onChange={(e) => setCheckUser({ ...checkUser, email: e.target.value })}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={checkUser.password}
        onChange={(e) =>
          setCheckUser({ ...checkUser, password: e.target.value })
        }
        required
      />

      {errorMsg && (
        <p className="error" style={{ color: "red" }}>
          {errorMsg}
        </p>
      )}

      <button onClick={handleSubmit}>
        {isLoading ? "Loading..." : "Login"}{" "}
      </button>
    </>
  );
};

export default LoginForm;
