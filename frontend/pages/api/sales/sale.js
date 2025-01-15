import axios from "axios";
const saleEndpoint = axios.create({
  baseURL: "http://localhost:8000/sale",
});

export const getAllSales = async () => {
  try {
    const allSales = await saleEndpoint.get("/");

    return allSales.data;
  } catch (err) {
    return err;
  }
};
