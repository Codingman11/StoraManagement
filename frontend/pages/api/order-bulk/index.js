import axios from "axios";
const ordersBulkEndpoint = axios.create({
  baseURL: "http://localhost:8000/order-bulk",
});

export const orderApi = async (items) => {
  try {
    const order = await ordersBulkEndpoint.post("/", items);
    console.log("My order", order);
    return order;
  } catch (err) {
    return err;
  }
};
