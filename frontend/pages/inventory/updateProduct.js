import React, { useEffect } from "react";
import AddProductForm from "../../components/AddProductForm";

const UpdateProduct = () => {
  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  return (
    <div className="flex flex-col align-middle">
      <AddProductForm>
        <h3 className="font-bold text-2xl text-gray-700">Update Item</h3>
      </AddProductForm>
    </div>
  );
};

export default UpdateProduct;
