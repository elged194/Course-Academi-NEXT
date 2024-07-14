"use client";
import { useMemo, useContext } from "react";
import Link from "next/link";
import { DashboardContext } from "@/app/context/ApiContext";
import Image from "next/image";

const ProductsList = ({ DataProduct }) => {
  const {
    addCart,
    isLoggedIn,
    addMyFavorite,
    deletItemFavorit,
    favProduct,
    search,
    priceFilter,
    handleOpenModal,
  } = useContext(DashboardContext);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return DataProduct.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    ).filter((item) => {
      switch (priceFilter) {
        case "under50":
          return item.price <= 30;
        case "20to50":
          return item.price > 20 && item.price <= 50;
        case "above100":
          return item.price > 100;
        default:
          return true;
      }
    });
  }, [DataProduct, search, priceFilter]);

  return (
    <>
      {filteredProducts?.map((product) => (
        <article className="product-item" key={product.id}>
          <Link href={`/Pages/ProductItem/${product.id}`}>
            <figure>
              <Image
                src={product.image}
                alt={product.title}
                width={700}
                height={400}
                layout="responsive"
              />
            </figure>
          </Link>
          <div className="product-details">
            <div>
              <h3>{product.title}</h3>
              <p>Course • Mindful Mike</p>
            </div>

            <div>
              <h5>${product.price}</h5>

              <div className="acton-btn">
                {favProduct.some((favItem) => favItem.id === product.id) ? (
                  <i
                    className="bx bxs-heart-circle"
                    onClick={() => deletItemFavorit(product.id)}
                  ></i>
                ) : (
                  <i
                    className="bx bx-heart-circle"
                    onClick={() => addMyFavorite(product.id)}
                  ></i>
                )}

                <button
                  onClick={() =>
                    isLoggedIn ? addCart(product) : handleOpenModal()
                  }
                >
                  <i className="bx bx-cart-alt"></i> Add To Cart
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default ProductsList;
