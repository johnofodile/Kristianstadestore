import { ProductCard } from "../../components";
import { FilterBar } from "./components/FilterBar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFilter } from "../../context";

export const ProductsList = () => {
  //the line of code below connects to the context
  //use filter connects to a global state
  const { products, initialProductList } = useFilter();

  const [show, setShow] = useState(false);
  //  const[products, setProducts]=useState([]);
  //this line of code will help to get the item we are trying to search
  const search = useLocation().search;
  const searchTerm = new URLSearchParams(search).get("q");
  console.log(search);

  const handleFilterClose = () => {
    setShow(false);
  };

  useEffect(() => {
    console.log("yes");
    async function fetchProducts() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_HOST}/products?name_like=${
            searchTerm ? searchTerm : ""
          }`
        );

        if (!response.ok) {
          // Handle the case where the request was not successful
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        initialProductList(data);
        //  setProducts(data);
      } catch (error) {
        // Handle the error here, you can log it or perform any specific actions
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, [searchTerm]); //eslint-disable-line
  return (
    <main>
      <section className="my-5">
        <div className="my-5 flex justify-between">
          <span className="text-2xl font-semibold dark:text-slate-100 mb-5">
            All eBooks ({products.length})
          </span>
          <span>
            <button
              onClick={() => setShow(!show)}
              id="dropdownMenuIconButton"
              data-dropdown-toggle="dropdownDots"
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700"
              type="button"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
              </svg>
            </button>
          </span>
        </div>

        <div className="flex flex-wrap justify-center lg:flex-row">
          {/* product list is from the line of code slighly below the product List function */}
          {products.map((product) => (
            <ProductCard
              id={product.id}
              key={product.id}
              poster={product.poster}
              name={product.name}
              price={product.price}
              overview={product.overview}
              rating={product.rating}
              in_stock={product.in_stock}
            />
          ))}
        </div>
      </section>
      {show && <FilterBar onClose={handleFilterClose} />}
    </main>
  );
};
