import { useQueries } from "react-query";
import baseApi from "./baseApi";
import { GoogleBookVolumes } from "../types/GoogleBookVolumes.type";

type UseFetchBooksProps = {
  ids: string[];
};

export const useFetchBooks = ({ ids }: UseFetchBooksProps) => {
  const queries = ids.map((id) => ({
    queryKey: ["book", id],

    queryFn: async () => {
      const response = await baseApi.get<GoogleBookVolumes>(`/volumes/${id}`);
      return response.data;
    },
  }));

  return useQueries(queries);
};
