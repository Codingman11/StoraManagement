import React, { useEffect, useState } from "react";
import { getAllProducts } from "../pages/api/products/product";

// Components
import SearchBar from "./SearchBar";
import ProductNotFound from "./ProductNotFound";

// Imported Components
import RowProductsList from "./RowProductsList";

const ProductsList = () => {
  const [products, setProducts] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [userDetails, setUserDetails] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setUserDetails(JSON.parse(localStorage.getItem("UserDetails")));
    saveProducts();
  }, []);

  const saveProducts = async () => {
    const productsList = await getAllProducts();
    setProducts(productsList);
    setFilteredProducts(productsList);
    setLoaded(true);
  };

  const handleSearch = (value, reset = false) => {
    if (reset) {
      setFilteredProducts(products);
      return;
    }

    let result = products.filter((data) => {
      return (
        data.name.toLowerCase().search(value.toLowerCase()) != -1 ||
        data.SKU.toLowerCase().search(value.toLowerCase()) != -1
      );
    });
    setFilteredProducts(result);
  };

  if (!loaded) {
    return;
  }

  return (
    <>
      <bold>
        <h1 className="m-2 py-4 text-lg uppercase w-full h-30 text-center text-gray-600 tracking-widest mb-5">
          Inventory
        </h1>
      </bold>
      <SearchBar handleSearch={handleSearch} />
      {filteredProducts.length ? (
        <div className="m-2 overflow-x-auto shadow-md sm:rounded-lg max-w-full">
          <table className="w-full text-md text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-center grow ">
                  Product
                </th>
                <th scope="col" className="px-6 py-4 text-center">
                  Identifier
                </th>
                <th scope="col" className="py-4 px-6 text-center shrink">
                  Units
                </th>
                <th scope="col" className="py-4 px-6 text-center shrink"></th>
                <th scope="col" className="py-4 px-6 text-center shrink"></th>
              </tr>
            </thead>
            <tbody className="text-center">
              {filteredProducts &&
                filteredProducts.map((e) => (
                  <RowProductsList product={e} key={e.id} />
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <ProductNotFound />
      )}
    </>
  );
};

export default ProductsList;
