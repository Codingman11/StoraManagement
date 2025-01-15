import React from "react";
import AddProductForm from "../../components/AddProductForm";

const AddProduct = () => {
  return (
    <div className="flex flex-col align-middle">
      <AddProductForm>
        <h3 className="font-bold text-2xl text-gray-700">New Product</h3>
      </AddProductForm>
    </div>
  );
};

export default AddProduct;
