"use client";
import { useContext } from "react";
import "./Modal.css";
import { DashboardContext } from "@/app/context/ApiContext";

const Modal = ({ children }) => {
  const { showModal, handleCloseModal, setshowModalAddProduct , setShowModalDeleteUser} =
    useContext(DashboardContext);

  if (!showModal) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button
          className="close-button"
          onClick={() => {
            handleCloseModal();
            setshowModalAddProduct(false);
            setShowModalDeleteUser(false)
          }}
        >
          &times;
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
