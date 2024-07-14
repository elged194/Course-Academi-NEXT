"use client";
import Modal from "@/app/components/Modal/Modal";
import { DashboardContext } from "@/app/context/ApiContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const ProfileCard = () => {
  const {
    currentUser,
    setCurrentUser,
    isLoggedIn,
    handleOpenModal,
    handleCloseModal,
  } = useContext(DashboardContext);

  const [profileImage, setProfileImage] = useState(
    currentUser?.image || "https://via.placeholder.com/85"
  );

  useEffect(() => {
    if (currentUser?.image) {
      setProfileImage(currentUser.image);
    }
  }, [currentUser]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageUrl = reader.result;
        setProfileImage(imageUrl);

        // Update the image in currentUser
        setCurrentUser((prevUser) => ({ ...prevUser, image: imageUrl }));

        // Store the updated user in localStorage
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ ...currentUser, image: imageUrl })
        );
      };

      reader.readAsDataURL(file);
    }
  };

  // Render NotLogin component if user is not logged in
  if (!isLoggedIn) {
    return (
      <>
        {handleOpenModal()}

        {/* Modal show  */}
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
      </>
    );
  }

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        id="file-input"
        style={{ display: "none" }}
      />
      <label htmlFor="file-input">
        <i className="bx bx-edit"></i>
        <Image
          src={profileImage}
          alt={currentUser.username}
          className="profile-image"
          style={{ cursor: "pointer" }}
          width={500}
          height={500}
        />
      </label>

      <div className="profile-details">
        <h2>{currentUser.username}</h2>
        <p>Email: {currentUser.email}</p>
        <p>Password: {currentUser.password}</p>
      </div>
    </>
  );
};

export default ProfileCard;
