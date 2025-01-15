import React, { useEffect, useState } from "react";

// Api
import { getProductById } from "../pages/api/products/product";

const RowOrderList = ({ productId, setQuantity }) => {
  const [product, setProduct] = useState();
  const [finalUnits, setFinalUnits] = useState(1);

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
        {product.available_units + parseInt(finalUnits)}
      </td>
    </tr>
  );
};

export default RowOrderList;
