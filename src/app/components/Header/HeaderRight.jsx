"use client";
import Link from "next/link";
import React, { useContext } from "react";
import ProfileCard from "./profileCard";
import { DashboardContext } from "@/app/context/ApiContext";
import { useRouter } from "next/navigation";

const HeaderRight = () => {
  const {
    handleLogout,
    isLoggedIn,
    handleOpenModal,
    quantityCart,
    setshowModalAddProduct,
  } = useContext(DashboardContext);
  const router = useRouter();

  const handlOpenAddProduct = () => {
    setshowModalAddProduct(true);
    handleOpenModal();
  };

  return (
    <>
      {isLoggedIn ? (
        <Link href={"/Pages/Login"}>
          <i
            className="bx bx-log-out"
            onClick={() => {
              handleLogout();
            }}
          ></i>
        </Link>
      ) : (
        <Link href={"/Pages/Login"}>
          <i className="bx bx-log-in"></i>
        </Link>
      )}

      {isLoggedIn && (
        <div className="MyProfile-header" style={{ display: "flex" }}>
          <i
            className="bx bx-user-pin"
            onClick={() => {
              isLoggedIn ? router.push("/Pages/MyProfile") : handleOpenModal();
            }}
          ></i>

          <div className="profile-card">
            <ProfileCard />
          </div>
        </div>
      )}

      <Link href={"/Pages/Favorite"}>
        <i className="bx bx-heart"></i>
      </Link>

      <i className="bx bx-cart-alt" onClick={() => router.push("/Pages/Cart")}>
        <span>{quantityCart}</span>
      </i>

      <button
        onClick={() => {
          // isLoggedIn ? router.push("/Pages/AddProduct") : handleOpenModal();
          handlOpenAddProduct();
        }}
      >
        New Product
      </button>
    </>
  );
};

export default HeaderRight;
