import baseApi from "./baseApi";

export const fetchBookCover = async (bookId: string) => {
  const { data } = await baseApi.get(`/volumes/${bookId}`);
  console.log("fetchBookCover", data);
  return data.items || [];
};
