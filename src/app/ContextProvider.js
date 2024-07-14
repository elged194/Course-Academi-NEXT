"use client";
import React from "react";
import { Provider } from "./context/ApiContext";

const ContextProvider = ({ children }) => {
  return <Provider>{children}</Provider>;
};

export default ContextProvider;
