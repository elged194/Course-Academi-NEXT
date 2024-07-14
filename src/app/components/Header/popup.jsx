"use client";
import React, { useContext } from "react";
import Modal from "../Modal/Modal";
import Link from "next/link";
import { DashboardContext } from "@/app/context/ApiContext";
import AddProductItem from "./AddProductItem/AddProductItem";

const Popup = () => {
  const { isLoggedIn, handleCloseModal ,showModalAddProduct } = useContext(DashboardContext);

  return (
    <>
      {/* Modal show  login Redirect */}
      {!isLoggedIn && (
        <Modal>
          <div className="login-redirect">
            <i className="bx bx-log-in"></i>
            <h1>Please Login to Continue</h1>

            <div className="redirect-links">
              <Link href="/Pages/Login" onClick={handleCloseModal}>
                LogIn{" "}
              </Link>{" "}
              or
              <Link href="/Pages/Register" onClick={handleCloseModal}>
                {" "}
                Register
              </Link>
            </div>
          </div>
        </Modal>
      )}

      {/* Show Modal Add Product Item */}
      {isLoggedIn && showModalAddProduct && (
        <Modal>
          <AddProductItem  />
        </Modal>
      )}
    </>
  );
};

export default Popup;
