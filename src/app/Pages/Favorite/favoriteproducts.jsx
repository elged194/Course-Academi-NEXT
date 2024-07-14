"use client";
import { DashboardContext } from "@/app/context/ApiContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const Favoriteproducts = () => {
  const { favProduct, deletItemFavorit } = useContext(DashboardContext);

  return (
    <>
      {favProduct.length > 0 ? (
        favProduct.map((item) => (
          <article className="product-item" key={item.id}>
            <Link href={`/Pages/ProductItem/${item.id}`}>
              <figure>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={500}
                />
              </figure>
            </Link>

            <div className="product-details">
              <h3>{item.title}</h3>

              <div className="">
                <p>${item.price}</p>
                <i
                  className="bx bx-trash"
                  onClick={() => deletItemFavorit(item.id)}
                ></i>
              </div>
            </div>
          </article>
        ))
      ) : (
        // eslint-disable-next-line react/no-unescaped-entities
        <p>You haven't added Any favorite products yet.</p>
      )}
    </>
  );
};

export default Favoriteproducts;
