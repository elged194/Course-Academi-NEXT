"use client";
import "./Header.css";
import Link from "next/link";
import "boxicons/css/boxicons.min.css";
import { useContext } from "react";
// import { DashboardContext } from "@/app/context/ApiContext";
import { DashboardContext } from "@/app/context/ApiContext";
import { useRouter } from "next/navigation";
import Popup from "./popup";
import HeaderRight from "./HeaderRight";

const Header = () => {
  const { isLoggedIn, handleOpenModal } = useContext(DashboardContext);
  const router = useRouter();

  return (
    <>
      {/* Show modal  */}
      <Popup />

      <header className="header">
        <h1 className="logo"> 
          <Link href="/">Course Academi</Link>
        </h1>

        <ul className="nav-links">
          <li
            style={{ cursor: "pointer" }}
            onClick={() => {
              isLoggedIn ? router.push("/Pages/Dashboard") : handleOpenModal();
            }}
          >
            Dashboard
          </li>

          {!isLoggedIn && (
            <>
              <li>
                <Link href="/Pages/Login">Login</Link>
              </li>
              <li>
                <Link href={`/Pages/Register`}>Register</Link>
              </li>
            </>
          )}

          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>

        <div className="header-icons">
          <HeaderRight />
        </div>
      </header>
    </>
  );
};

export default Header;
