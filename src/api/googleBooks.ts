import baseApi from "./baseApi";

export const fetchBooks = async (query: string) => {
  const { data } = await baseApi.get("/volumes", {
    params: {
      q: query,
      maxResults: 10, // Limita o número de resultados
      //   key: "SUA_CHAVE_API_GOOGLE", // Insira sua chave de API aqui,
    },
  });
  console.log("livros", data);
  return data.items || [];
};
