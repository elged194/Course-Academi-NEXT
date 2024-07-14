"use client";
import { DashboardContext } from "@/app/context/ApiContext";
import Image from "next/image";
import React, { useContext } from "react";

const ProfileCard = () => {
  const { currentUser, lastLoginTime } = useContext(DashboardContext);
  return (
    <>
      <Image
        src={currentUser?.image || "https://via.placeholder.com/85"}
        alt={currentUser.username}
        className="profile-image"
        width={500}
        height={500}
      />
      <div className="profile-details">
        <h2>Hussein Elged</h2>
      </div>
      <h6>
        Last login: {lastLoginTime} <span></span>
      </h6>
    </>
  );
};

export default ProfileCard;
