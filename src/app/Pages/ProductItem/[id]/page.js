import Image from "next/image";
import ActionsProduct from "../ActionsProduct";
import "../productItem.css";

async function getProductsItems(url) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch(url, {
    // cache: 'no-cache',
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

const ProductItem = async ({ params }) => {
  // ---- / Get User /-----
  const data = await getProductsItems(
    `/api/products/${params.id}`
  );

  if (data) {
    return (
      <section className="productItem">
        <article>
          <figure>
            <Image src={data.image} alt={data.title} width={500} height={300} />
          </figure>

          <div className="productItemDetel">
            <div>
              <h3>{data.title}</h3>
              <h5> ${data.price}</h5>

              <div className="ratings">
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star-half"></i>
              </div>
              <p>Course • Mindful Mike</p>
              <p>{data.description}</p>
            </div>

            <ActionsProduct data={data} />
          </div>
        </article>
      </section>
    );
  }
};

export default ProductItem;
