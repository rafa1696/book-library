import { useQuery } from "react-query";
import { fetchBooks } from "../api/googleBooks";

export const useBooks = (query: string) => {
  return useQuery(["books", query], () => fetchBooks(query), {
    enabled: !!query, // Só busca quando há um termo válido
    staleTime: 1000 * 60 * 5, // Cache por 5 minutos,
    refetchOnWindowFocus: false, // Não recarrega ao focar na janela,
  });
};
