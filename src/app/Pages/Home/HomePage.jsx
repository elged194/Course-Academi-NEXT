// pages/index.js (HomePage)
import { Suspense, lazy } from "react";
import "./Home.css";
import PriceFilter from "./PriceFilter";
import Loading from "@/app/loading";
import SnackbarCart from "@/app/components/SnackbarCart/SnackbarCart";

// استخدام React.lazy لتحميل المكون ProductsList
const ProductsList = lazy(() => import("./ProductsList"));

// fetch Data Products
async function getProducts() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch("/api/products", {
    // cache: 'no-cache',
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

const HomePage = async () => {
  // ---- / Get products /-----
  const DataProduct = await getProducts();

  return (
    <>
      <SnackbarCart />
      <PriceFilter />
      <hr />

      <section className="products-list">
        <Suspense fallback={<Loading />}>
          <ProductsList DataProduct={DataProduct} />
        </Suspense>
      </section>
    </>
  );
};

export default HomePage;
