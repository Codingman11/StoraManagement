import axios from "axios";
import { purchaseApi } from "../sale-bulk";
import { orderApi } from "../order-bulk";
const productEndpoint = axios.create({
  baseURL: "http://localhost:8000/product",
});

export const getAllProducts = async () => {
  try {
    const allProducts = await productEndpoint.get("/");
    return allProducts.data;
  } catch (err) {
    return err;
  }
};

const shouldGenerateNProducts = true;

export const addProduct = async (product) => {
  try {
    const productAdded = await productEndpoint.post("/", product, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (shouldGenerateNProducts) {
      shouldGenerateNProducts = false;
      // generate Products
      await generateNProducts(20);
      // generate order-bulk for new products
      generateBulkOrders(newlyAddedProducts, false);
      // generate sale-bulk for new products
      generateBulkOrders(newlyAddedProducts, true);
    }

    return productAdded;
  } catch (err) {
    return err;
  }
};

export const deleteProduct = async (id) => {
  try {
    const product = await productEndpoint.delete(`/${id}/`);
    return product;
  } catch (err) {
    return err;
  }
};

export const updateProduct = async (id, product) => {
  try {
    const productUpdated = await productEndpoint.put(`/${id}/`, product, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return productUpdated;
  } catch (err) {
    return err;
  }
};

export const getProductById = async (id) => {
  try {
    const product = await productEndpoint.get(`/${id}/`);
    return product.data;
  } catch (err) {
    return err;
  }
};

const create_UUID = () => {
  var dt = new Date().getTime();
  var uuid = "xxxx-xyxx-y".replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

const newlyAddedProducts = [];
const generateNProducts = async (n) => {
  let increaseManufacturerAfter = 10;
  let indexForManufacturer = 0;
  let increaseBrandNameAfter = 5;
  let indexForBrandName = 0;
  let startIndex = 10;
  for (
    let index = startIndex;
    index < n + startIndex;
    index++, indexForBrandName++, indexForManufacturer++
  ) {
    if (indexForBrandName == increaseBrandNameAfter) {
      indexForBrandName = 0;
    }
    if (indexForManufacturer == increaseManufacturerAfter) {
      indexForManufacturer = 0;
    }
    const product = {
      name: "P" + index,
      SKU: create_UUID(),
      ISBN: create_UUID(),
      available_units: 2 * index,
      minimum_units: 2 * index - 10,
      manufacturer: "M" + indexForManufacturer,
      brand: "B" + indexForBrandName,
      dimensions: "13 X 14 X 15",
      weight: 25 * indexForBrandName,
      sell_price: 100 + 2 * index + ((100 + 2 * index) * 10) / 100,
      cost_price: 100 + 2 * index,
      tax_percentage: 1,
    };

    newlyAddedProducts.push((await addProduct(product)).data);
  }
};

const generateBulkOrders = async (itemsToOrder, isSaleBulk) => {
  const listPurchase = [];
  itemsToOrder.forEach((element) => {
    listPurchase.push({
      NumberOfProducts: 5,
      product: element.id,
      user: 1,
    });
  });
  console.log(listPurchase);
  if (isSaleBulk) return purchaseApi(listPurchase);
  else return orderApi(listPurchase);
};
