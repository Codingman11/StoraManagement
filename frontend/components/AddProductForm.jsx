import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Api
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../pages/api/products/product";

// Components
import PopUpMessage from "./PopUpMessage";

// Helper
import { sanitizeObject } from "../helper";

const AddProductForm = ({ children }) => {
  const router = useRouter();

  // Product already existent from the database
  const [existentProduct, setExistentProduct] = useState("");
  const [loaded, setLoaded] = useState(false);

  const [name, setName] = useState("");
  const [SKU, setSKU] = useState("");
  const [available_units, setAvailableUnits] = useState("");
  const [minimum_units, setMinimumUnits] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [weight, setWeight] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [brand, setBrand] = useState("");
  const [UPC, setUPC] = useState("");
  const [MPN, setMPN] = useState("");
  const [EAN, setEAN] = useState("");
  const [ISBN, setISBN] = useState("");
  const [sell_price, setSellPrice] = useState("");
  const [cost_price, setCostPrice] = useState("");
  const [tax_percentage, setTax] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (router.query.product) {
      const existentProduct = JSON.parse(router.query.product);
      setExistentProduct(existentProduct);
      initializeInputs(existentProduct);
    }
    setLoaded(true);
  }, []);

  const initializeInputs = (existent) => {
    setName(existent.name);
    setSKU(existent.SKU);
    setAvailableUnits(existent.available_units);
    setMinimumUnits(existent.minimum_units);
    setDimensions(existent.dimensions);
    setWeight(existent.weight);
    setManufacturer(existent.manufacturer);
    setBrand(existent.brand);
    setUPC(existent.UPC);
    setMPN(existent.MPN);
    setEAN(existent.EAN);
    setISBN(existent.ISBN);
    setSellPrice(existent.sell_price);
    setCostPrice(existent.cost_price);
    setTax(existent.tax_percentage);
    setImage(existent.image);
  };

  const objectSanitizer = () => {
    return sanitizeObject({
      name,
      SKU,
      UPC,
      EAN,
      ISBN,
      MPN,
      available_units,
      brand,
      dimensions,
      image,
      manufacturer,
      minimum_units,
      weight,
      sell_price,
      cost_price,
      tax_percentage,
    });
  };

  const onSubmit = async (e) => {
    setError("");
    setWarning("");
    e.preventDefault();

    if (existentProduct) {
      const result = await updateProduct(existentProduct.id, objectSanitizer());
      console.log(result);
      if (result.name !== "AxiosError") {
        router.push(
          {
            pathname: "/inventory",
            query: {
              message: `The product ${name} with SKU ${SKU} has been successfully updated.`,
            },
          },
          "/inventory"
        );
        return;
      }

      setError(
        "There has been an error in the system while updating the product, please try again later."
      );
      return;
    }

    const result = await addProduct(objectSanitizer());

    if (result.name !== "AxiosError") {
      router.push(
        {
          pathname: "/inventory",
          query: {
            message: `The new product ${name} with SKU ${SKU} has been successfully stored in the system.`,
          },
        },
        "/inventory"
      );
      return;
    }
    // If the product already exists in the database (check SKU) show alert
    // setWarning("This product already exists, please update the existent one.");

    // If error in the server show error
    setError(
      "There has been an error in the system, please try again later or check if this product already exists"
    );
    window.scrollTo(0, 0);
  };

  const onConfirmDelete = async () => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      const result = await deleteProduct(existentProduct.id);
      router.back();
    }
  };

  if (!loaded) {
    return;
  }

  return (
    <>
      {error && (
        <div className="m-2">
          <PopUpMessage type={"error"} content={error} />
        </div>
      )}
      {warning && (
        <div className="m-2">
          <PopUpMessage type={"warning"} content={warning} />
        </div>
      )}
      <div className="flex flex-col m-2 bg-slate-200 overflow-x-auto shadow-md sm:rounded-lg">
        <form action="#" method="POST" onSubmit={(e) => onSubmit(e)}>
          <div className="px-4 py-5 sm:p-6">
            {children}
            <hr className="border border-slate-300 my-4" />
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label className="flex block text-sm font-medium text-gray-800">
                  Name
                  <p className="text-red-600 pl-1"> * </p>
                </label>
                <input
                  required
                  maxLength={200}
                  type="text"
                  value={name}
                  readOnly={existentProduct ? true : false}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 pl-2 block h-8 w-full sm:text-sm rounded-md focus:outline-none"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="flex block text-sm font-medium text-gray-800">
                  SKU
                  <p className="text-red-600 pl-1"> * </p>
                </label>
                <input
                  required
                  maxLength={12}
                  type="text"
                  value={SKU}
                  readOnly={existentProduct ? true : false}
                  onChange={(e) => setSKU(e.target.value)}
                  className="mt-1 pl-2 focus:border-indigo-500 block h-8 w-full sm:text-sm rounded-md focus:outline-none"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="flex block text-sm font-medium text-gray-800">
                  Units
                  <p className="text-red-600 pl-1"> * </p>
                </label>
                <input
                  required
                  type="number"
                  value={available_units}
                  readOnly={existentProduct ? true : false}
                  onChange={(e) => setAvailableUnits(e.target.value)}
                  className="mt-1 pl-2 focus:border-indigo-500 block h-8 w-full sm:text-sm rounded-md"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="flex block text-sm font-medium text-gray-800">
                  Minimum quantity for alert
                  <p className="text-red-600 pl-1"> * </p>
                  <img
                    src="/help.png"
                    className="w-4 h-4 ml-1 mt-0.5 hover:cursor-pointer"
                  />
                </label>
                <input
                  required
                  type="number"
                  value={minimum_units}
                  onChange={(e) => setMinimumUnits(e.target.value)}
                  className="mt-1 pl-2 focus:border-indigo-500 block h-8 w-full sm:text-sm rounded-md"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="flex block text-sm font-medium text-gray-800">
                  Dimensions
                  <p className="text-gray-400 pl-1">
                    (Length x Width x Height (cm))
                  </p>
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  className="mt-1 pl-2 focus:border-indigo-500 block h-8 w-full sm:text-sm rounded-md"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="flex block text-sm font-medium text-gray-800">
                  Weight
                  <p className="text-gray-400 pl-1"> Kg </p>
                </label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="mt-1 pl-2 focus:border-indigo-500 block h-8 w-full sm:text-sm rounded-md"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="flex block text-sm font-medium text-gray-800">
                  Manufacturer
                </label>
                <input
                  type="text"
                  maxLength={100}
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  className="mt-1 pl-2 focus:border-indigo-500 block h-8 w-full sm:text-sm rounded-md"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="flex block text-sm font-medium text-gray-800">
                  Brand
                </label>
                <input
                  maxLength={200}
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="mt-1 pl-2 focus:border-indigo-500 block h-8 w-full sm:text-sm rounded-md"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="flex block text-sm font-medium text-gray-800">
                  UPC
                  <img
                    src="/help.png"
                    className="w-4 h-4 ml-1 mt-0.5 hover:cursor-pointer"
                  />
                </label>
                <input
                  maxLength={12}
                  type="text"
                  value={UPC}
                  onChange={(e) => setUPC(e.target.value)}
                  className="mt-1 pl-2 focus:border-indigo-500 block h-8 w-full sm:text-sm rounded-md"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="flex block text-sm font-medium text-gray-800">
                  MPN
                  <img
                    src="/help.png"
                    className="w-4 h-4 ml-1 mt-0.5 hover:cursor-pointer"
                  />
                </label>
                <input
                  type="text"
                  maxLength={12}
                  value={MPN}
                  onChange={(e) => setMPN(e.target.value)}
                  className="mt-1 pl-2 focus:border-indigo-500 block h-8 w-full sm:text-sm rounded-md"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="flex block text-sm font-medium text-gray-800">
                  EAN
                  <img
                    src="/help.png"
                    className="w-4 h-4 ml-1 mt-0.5 hover:cursor-pointer"
                  />
                </label>
                <input
                  maxLength={13}
                  type="text"
                  value={EAN}
                  onChange={(e) => setEAN(e.target.value)}
                  className="mt-1 pl-2 focus:border-indigo-500 block h-8 w-full sm:text-sm rounded-md"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="flex block text-sm font-medium text-gray-800">
                  ISBN
                  <img
                    src="/help.png"
                    className="w-4 h-4 ml-1 mt-0.5 hover:cursor-pointer"
                  />
                </label>
                <input
                  maxLength={18}
                  type="text"
                  value={ISBN}
                  onChange={(e) => setISBN(e.target.value)}
                  className="mt-1 pl-2 focus:border-indigo-500 block h-8 w-full sm:text-sm rounded-md"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="flex block text-sm font-medium text-gray-800">
                  Selling Price
                  <p className="text-red-600 pl-1"> * </p>
                </label>
                <input
                  required
                  type="number"
                  value={sell_price}
                  onChange={(e) => setSellPrice(e.target.value)}
                  className="mt-1 pl-2 focus:border-indigo-500 block h-8 w-full sm:text-sm rounded-md"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="flex block text-sm font-medium text-gray-800">
                  Cost Price
                  <p className="text-red-600 pl-1"> * </p>
                </label>
                <input
                  required
                  type="number"
                  value={cost_price}
                  onChange={(e) => setCostPrice(e.target.value)}
                  className="mt-1 pl-2 focus:border-indigo-500 block h-8 w-full sm:text-sm rounded-md"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="flex block text-sm font-medium text-gray-800">
                  Tax
                  <p className="text-red-600 pl-1"> * </p>
                </label>
                <input
                  required
                  type="number"
                  value={tax_percentage}
                  onChange={(e) => setTax(e.target.value)}
                  className="mt-1 pl-2 focus:border-red-500 block h-8 w-full sm:text-sm rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="flex px-4 py-3">
            <div className="w-1/2">
              <button
                type="submit"
                className="inline-flex justify-center py-2 mx-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {existentProduct ? "Update Product" : "Add Product"}
              </button>
              <button
                type="button"
                className="inline-flex justify-center mx-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-gray-600 bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                onClick={() => router.back()}
              >
                Cancel
              </button>
            </div>
            <div className="w-1/2 flex justify-end">
              {existentProduct && (
                <button
                  onClick={() => onConfirmDelete()}
                  type="button"
                  className="inline-flex justify-right mx-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-300 bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                >
                  Delete Product
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProductForm;
