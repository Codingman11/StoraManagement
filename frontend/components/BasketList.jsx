import React, { useEffect, useState, useReducer } from "react";
import { useRouter } from "next/router";

// Imported Components
import RowBasketList from "./RowBasketList";
import EmptyBasket from "./EmptyBasket";
import PopUpMessage from "./PopUpMessage";

// API
import { purchaseApi } from "../pages/api/sale-bulk";

const BasketList = () => {
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
    const productsList = JSON.parse(localStorage.getItem("basket"));
    setListProducts(productsList);
  };

  const deleteBasket = () => {
    localStorage.removeItem("basket");
    router.reload();
  };

  const submitPurchase = async () => {
    const userRole = JSON.parse(localStorage.getItem("UserDetails")).role;
    const listPurchase = [];
    listProducts.forEach((element) => {
      listPurchase.push({
        NumberOfProducts: dictQuantities[element],
        product: element,
        user: userRole,
      });
    });

    const result = await purchaseApi(listPurchase);

    if (result.name !== "AxiosError") {
      localStorage.removeItem("basket");
      router.push(
        {
          pathname: "/inventory",
          query: {
            message: `The sale has been successful`,
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
    return <EmptyBasket />;
  }

  if (listProducts) {
    if (!listProducts.length) {
      return <EmptyBasket />;
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
            Basket List
          </h1>
        </bold>

        <table className="w-full text-md text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 grow text-center ">
                Product
              </th>
              <th scope="col" className="px-6 py-4 text-center">
                Identifier
              </th>
              <th scope="col" className="py-4 px-6 shrink text-center">
                Quantity
              </th>
              <th scope="col" className="py-4 px-6 shrink text-center">
                Stock After Purchase
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-center">
            {listProducts &&
              listProducts.map((e) => (
                <RowBasketList
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
        Delete basket
      </button>
      <button
        onClick={submitPurchase}
        className="m-2 button bg-green-500 py-4 px-2 text-slate-100 hover:bg-green-700 text-center rounded-md"
      >
        Submit purchase
      </button>
    </>
  );
};

export default BasketList;
