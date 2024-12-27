import axios from "axios";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export const fetchBooks = async (query: string) => {
  const { data } = await axios.get(BASE_URL, {
    params: {
      q: query,
      maxResults: 10, // Limita o número de resultados
      //   key: "SUA_CHAVE_API_GOOGLE", // Insira sua chave de API aqui
    },
  });
  console.log("livros", data);
  return data.items || [];
};
