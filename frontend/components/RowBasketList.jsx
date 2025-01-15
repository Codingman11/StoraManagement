import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Api
import { getProductById } from "../pages/api/products/product";

const RowBasketList = ({ productId, setQuantity }) => {
  const [product, setProduct] = useState();
  const [finalUnits, setFinalUnits] = useState(1);
  const router = useRouter();

  useEffect(() => {
    getProduct();
    setQuantity({ name: productId, value: 1 });
  }, []);

  const getProduct = async () => {
    const retrievedProduct = await getProductById(productId);
    setProduct(retrievedProduct);
  };

  const handleChangeQuantity = (e) => {
    setQuantity({ name: e.target.name, value: parseInt(e.target.value) });
  };

  const removeFromBasket = () => {
    const basket = JSON.parse(localStorage.getItem("basket"));
    const newBasket = [];

    if (basket) {
      if (typeof basket == "number") {
        localStorage.removeItem("basket");
        router.reload();
        return;
      } else {
        const index = basket.indexOf(productId);
        if (index > -1) {
          basket.splice(index, 1); // 2nd parameter means remove one item only
        }
        newBasket = basket;
      }
      localStorage.setItem("basket", JSON.stringify(newBasket));
      router.reload();
      return;
    }

    router.reload();
    return;
  };

  if (!product) {
    return null;
  }

  return (
    <tr className="bg-white border-b" key={product.id}>
      <td scope="row" className="px-6 grow py-4 font-medium">
        {product.name}
      </td>
      <td className="px-6 py-4">{product.SKU}</td>
      <td className="px-6 py-4 w-1/6">
        <div className="mb-3">
          <input
            type="number"
            min={1}
            max={product.available_units}
            name={productId}
            defaultValue={1}
            onChange={(e) => {
              handleChangeQuantity(e);
              setFinalUnits(e.target.value);
            }}
            className="
              form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
            placeholder="Quantity"
          />
        </div>
      </td>
      <td className="px-6 py-4 shrink">
        {product.available_units - parseInt(finalUnits)}
      </td>
      <button
        onClick={removeFromBasket}
        //className="m-2 button bg-green-500 py-4 px-2 text-slate-100 hover:bg-green-700 text-center rounded-xl "
        className="button bg-gray-500 py-2 px-2 cursor-pointer text-slate-100 hover:bg-red-700 text-white text-center rounded-md"
      >
        Delete
      </button>
    </tr>
  );
};

export default RowBasketList;
