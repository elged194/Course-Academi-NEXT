"use client";
import { useContext, useState } from "react";
import { DashboardContext } from "@/app/context/ApiContext";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

const RegisterForm = () => {
    const { newUser, setNewUser, addUser, usersErrMsg } =
    useContext(DashboardContext);

  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();

    // تحقق من طول كلمة المرور
    if (newUser.password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    const addUsers = addUser();

    if (addUsers) {
      setIsLoading(true);
      setTimeout(() => {
        router.push("/Pages/Login");
      }, 2000);
    } else {
      return usersErrMsg;
    }
  };

  return (
    <>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={newUser.username}
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={newUser.password}
        onChange={(e) => {
          setNewUser({ ...newUser, password: e.target.value });
          setPasswordError(""); // إعادة تعيين رسالة الخطأ عند تغيير كلمة المرور
        }}
        required
      />

      {passwordError && <p className="error">{passwordError}</p>}

      <button onClick={handleRegister}>
        {isLoading ? "Loading..." : "Sign Up"}
      </button>
    </>
  );
};

export default RegisterForm;
