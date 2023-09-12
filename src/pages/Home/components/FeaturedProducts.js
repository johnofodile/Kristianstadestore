import { useState, useEffect } from "react";
import { ProductCard } from "../../../components";


export const FeaturedProducts = () => {
 

  const [products, setProducts] = useState([]);
  //We apply useeffect so that once the page loads we see the products
  useEffect(() => {
    //when using the useeffect first define the function then call it later
    async function fetchProducts() {
      const response = await fetch(`${process.env.REACT_APP_HOST}/featured_products`);
      const data = await response.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);
  return (
    <section className="my-20">
      <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8">
        Featured eBooks
      </h1>
      <div className="flex flex-wrap justify-center lg:flex-row">
        {products.map((product) => (
          <ProductCard
            id={product.id}
            key={product.id}
            poster={product.poster}
            name={product.name}
            price={product.price}
            overview={product.overview}
            in_stock={product.in_stock}
          />
        ))}
      </div>
    </section>
  );
};
