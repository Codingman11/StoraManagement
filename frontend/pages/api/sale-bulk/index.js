import axios from "axios";
const salesBulkEndpoint = axios.create({
  baseURL: "http://localhost:8000/sale-bulk",
});

export const purchaseApi = async (sale) => {
  try {
    const purchase = await salesBulkEndpoint.post("/", sale);
    console.log(purchase);
    return purchase;
  } catch (err) {
    return err;
  }
};
