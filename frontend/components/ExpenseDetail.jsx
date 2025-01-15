import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
const categories = ["Product Name", "Units", "Unit Cost", "Total Cost"];
import { getAllProducts } from "../pages/api/products/product";

const ExpenseDetail = () => {
  const router = useRouter();
  const data = JSON.parse(router.query.order);
  const [products, setProducts] = useState({});

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const value = await getAllProducts();
    setProducts(value);
  };

  if (!data || !products) {
    return null;
  }

  console.log("Products", products);
  return (
    <div className="m-2 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-md text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        
          <tr>
            {categories.map((e) => (
              <th scope="col" className="px-6 py-3 text-center" key={e}>
                {e}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length &&
            data.map((item) => {
              return (
                <tr className="bg-white border-b" key={item.id}>
                  <td className="px-6 py-4 text-center">
                    {products.length &&
                      products.filter((e) => e.id === item.product)[0].name}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {item.NumberOfProducts}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-center text-gray-900"
                  >
                    {item.TotalExpense}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {item.NumberOfProducts * item.TotalExpense}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseDetail;
