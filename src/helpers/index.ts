import { client } from "../api";

export const fetchAllProductsRequest = async () => {
  try {
    return await client.get("https://fakestoreapi.com/products");
  } catch (error) {
    return error;
  }
};

export const fetchSingleProductRequest = async (id: string | number) => {
  try {
    return await client.get(`https://fakestoreapi.com/products/${id}`);
  } catch (error) {
    return error;
  }
};
