import axios from "axios";
const orderEndpoint = axios.create({
  baseURL: "http://localhost:8000/order",
});

export const getAllOrders = async () => {
  try {
    const allOrders = await orderEndpoint.get("/");

    return allOrders.data;
  } catch (err) {
    return err;
  }
};
