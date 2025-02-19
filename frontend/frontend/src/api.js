import axios from "axios";

const API_URL = "http://localhost:5000/transactions";

export const fetchTransactions = async (filters) => {
  try {
    const response = await axios.get(API_URL, { params: filters });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};
