import React, { useEffect, useState, useReducer } from "react";
import { useRouter } from "next/router";

// Imported Components
import RowOrderList from "./RowOrderList";
import EmptyOrder from "./EmptyOrder";
import PopUpMessage from "./PopUpMessage";

// API
import { orderApi } from "../pages/api/order-bulk";

const OrderList = () => {
  const [listProducts, setListProducts] = useState();
  const [error, setError] = useState("");

  const initDict = (state, event) => {
    return {
      ...state,
      [event.name]: event.value,
    };
  };

  const [dictQuantities, setDictQuantities] = useReducer(initDict, {});

  const router = useRouter();

  useEffect(() => {
    getListProducts();
  }, []);

  const getListProducts = async () => {
    const productsList = JSON.parse(localStorage.getItem("order"));
    setListProducts(productsList);
  };

  const deleteBasket = () => {
    localStorage.removeItem("order");
    router.reload();
  };

  const submitOrder = async () => {
    const userRole = JSON.parse(localStorage.getItem("UserDetails")).role;
    const listOrder = [];
    listProducts.forEach((element) => {
      listOrder.push({
        NumberOfProducts: dictQuantities[element],
        product: element,
        user: userRole,
      });
    });

    console.log(listOrder);

    const result = await orderApi(listOrder);

    if (result.name !== "AxiosError") {
      localStorage.removeItem("order");
      router.push(
        {
          pathname: "/inventory",
          query: {
            message: `The order has been successful`,
          },
        },
        "/inventory"
      );
      return;
    }

    setError("There has been an error in the system, please try again later");
    return;
  };

  if (!listProducts) {
    return <EmptyOrder />;
  }

  if (listProducts) {
    if (!listProducts.length) {
      return <EmptyOrder />;
    }
  }

  return (
    <>
      {error && (
        <div className="m-2">
          <PopUpMessage type={"error"} content={error} />
        </div>
      )}
      <div className="m-2 overflow-x-auto shadow-md sm:rounded-lg max-w-full">
        <bold>
          <h1 className="py-4 text-lg uppercase w-full h-30 text-center text-gray-600 tracking-widest mb-5">
            Inventory Order
          </h1>
        </bold>
        <table className="w-full text-md text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 grow text-center">
                Product
              </th>
              <th scope="col" className="px-6 py-4 text-center">
                Identifier
              </th>
              <th scope="col" className="py-4 px-6 shrink text-center">
                Quantity
              </th>
              <th scope="col" className="py-4 px-6 shrink text-center">
                Stock After Order
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {listProducts &&
              listProducts.map((e) => (
                <RowOrderList
                  setQuantity={setDictQuantities}
                  productId={e}
                  key={e}
                />
              ))}
          </tbody>
        </table>
      </div>
      &nbsp;
      <button
        onClick={deleteBasket}
        className="m-2 button bg-red-500 py-4 px-2 text-slate-100 hover:bg-red-700 text-center rounded-md"
      >
        Delete Order
      </button>
      <button
        onClick={submitOrder}
        className="m-2 button bg-green-500 py-4 px-2 text-slate-100 hover:bg-green-700 text-center rounded-md"
      >
        Submit Order
      </button>
    </>
  );
};

export default OrderList;
