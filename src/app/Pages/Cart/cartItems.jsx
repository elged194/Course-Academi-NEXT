"use client";
import { DashboardContext } from "@/app/context/ApiContext";
import Image from "next/image";
import React, { useContext } from "react";

const CartItems = () => {
  const { cart, deleteItemCart } = useContext(DashboardContext);

  return (
    <>
      {cart.map((item) => {
        return (
          <div className="cart-item" key={item.id}>
            <Image
              className="product-image"
              src={item.image}
              alt={item.title}
              width={500}
              height={500}
              onClick={() => navigate(`/productItem/${item.id}`)}
            />
            <div
              className="product-details"
              onClick={() => navigate(`/productItem/${item.id}`)}
            >
              <h3 className="product-title">{item.title}</h3>
              <p className="product-price">${item.price}</p>
            </div>
            <button
              className="btn-remove"
              onClick={() => deleteItemCart(item.id)}
            >
              Remove
            </button>
          </div>
        );
      })}
    </>
  );
};

export default CartItems;
