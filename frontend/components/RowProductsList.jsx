import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const RowProductsList = ({ product }) => {
  const router = useRouter();
  const [addedToBasket, setAddedToBasket] = useState(false);
  const [addedToOrder, setAddedToOrder] = useState(false);
  const [available, setAvailable] = useState(true);
  // const [image, setImage] = useState(undefined);
  const [userDetails, setUserDetails] = useState("");

  useEffect(() => {
    basketButton();
    orderButton();
    setAvailable(product.available_units > 0);
    autoOrder();
    setUserDetails(JSON.parse(localStorage.getItem("UserDetails")));
  }, []);

  const autoOrder = () => {
    if (product.available_units < product.minimum_units) {
      addToOrder();
    }
  };

  const addToBasket = () => {
    const basket = JSON.parse(localStorage.getItem("basket"));
    const newBasket = [];

    if (basket) {
      if (typeof basket == "number") {
        newBasket.push(basket);
        newBasket.push(product.id);
      } else {
        newBasket = basket;
        newBasket.push(product.id);
      }
      newBasket = [...new Set(newBasket)];
      localStorage.setItem("basket", JSON.stringify(newBasket));
      basketButton();
      return;
    }

    newBasket.push(product.id);
    localStorage.setItem("basket", JSON.stringify(newBasket));
    basketButton();
    return;
  };

  const removeFromBasket = () => {
    const basket = JSON.parse(localStorage.getItem("basket"));
    const newBasket = [];

    if (basket) {
      if (typeof basket == "number") {
        localStorage.removeItem("basket");
        basketButton();
        return;
      } else {
        const index = basket.indexOf(product.id);
        if (index > -1) {
          basket.splice(index, 1); // 2nd parameter means remove one item only
        }
        newBasket = basket;
      }
      localStorage.setItem("basket", JSON.stringify(newBasket));
      basketButton();
      return;
    }

    basketButton();
    return;
  };

  const basketButton = () => {
    const basket = JSON.parse(localStorage.getItem("basket"));

    if (basket) {
      if (typeof basket == "number") {
        setAddedToBasket(product.id === basket);
        return;
      }
      setAddedToBasket([...basket].find((e) => e == product.id));
      return;
    }
    setAddedToBasket(false);
    return;
  };

  const addToOrder = () => {
    const order = JSON.parse(localStorage.getItem("order"));
    const newOrder = [];

    if (order) {
      if (typeof order == "number") {
        newOrder.push(order);
        newOrder.push(product.id);
      } else {
        newOrder = order;
        newOrder.push(product.id);
      }
      newOrder = [...new Set(newOrder)];
      localStorage.setItem("order", JSON.stringify(newOrder));
      orderButton();
      return;
    }

    newOrder.push(product.id);
    localStorage.setItem("order", JSON.stringify(newOrder));
    orderButton();
    return;
  };

  const removeFromOrder = () => {
    const order = JSON.parse(localStorage.getItem("order"));
    const newOrder = [];

    if (order) {
      if (typeof order == "number") {
        localStorage.removeItem("order");
        orderButton();
        return;
      } else {
        const index = order.indexOf(product.id);
        if (index > -1) {
          order.splice(index, 1); // 2nd parameter means remove one item only
        }
        newOrder = order;
      }
      localStorage.setItem("order", JSON.stringify(newOrder));
      orderButton();
      return;
    }

    orderButton();
    return;
  };

  const orderButton = () => {
    const order = JSON.parse(localStorage.getItem("order"));

    if (order) {
      if (typeof order == "number") {
        setAddedToOrder(product.id === order);
        return;
      }
      setAddedToOrder([...order].find((e) => e == product.id));
      return;
    }
    setAddedToOrder(false);
    return;
  };

  const redirectWithBody = () => {
    router.push(
      {
        pathname: "/inventory/updateProduct",
        query: {
          product: JSON.stringify(product),
        },
      },
      "/inventory/updateProduct"
    );
  };

  return (
    <tr className="bg-white border-b" key={product.id}>
      <td scope="row" className="text-center px-6 grow py-4 font-medium">
        <a
          onClick={redirectWithBody}
          className="text-blue-800 underline cursor-pointer"
        >
          {product.name}
        </a>
      </td>
      <td className="text-center px-6 py-4">{product.SKU}</td>
      <td className="text-center px-6 py-4 shrink">
        {product.available_units}
      </td>

      <td>
        {addedToBasket ? (
          <button
            className="bg-purple-300 text-black hover:bg-purple-200 py-2 px-3 rounded-xl"
            onClick={removeFromBasket}
            disabled={!available}
          >
            Remove from Basket
          </button>
        ) : (
          <button
            className={`bg-purple-500 text-white hover:bg-purple-700 py-2 px-3 rounded-xl ${
              !available && "hidden"
            }`}
            onClick={addToBasket}
            disabled={!available}
          >
            Add to Basket
          </button>
        )}
      </td>

      {(userDetails.role == 1 || userDetails.role == 3) && (
        <td>
          {addedToOrder ? (
            <button
              className="bg-indigo-300 text-black hover:bg-indigo-200 py-2 px-3 rounded-xl"
              onClick={removeFromOrder}
            >
              Remove from Order
            </button>
          ) : (
            <button
              className="bg-indigo-500 text-white hover:bg-indigo-700 py-2 px-3 rounded-xl"
              onClick={addToOrder}
            >
              Add to Order
            </button>
          )}
        </td>
      )}
    </tr>
  );
};

export default RowProductsList;
