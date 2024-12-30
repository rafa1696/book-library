import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://www.googleapis.com/books/v1", // Base da API
});

export default baseApi;
