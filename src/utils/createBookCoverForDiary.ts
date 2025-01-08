export const createBookPictureForDiary = (bookThumbnail: string) => {
  if (bookThumbnail) {
    return `?bookPicture=${encodeURIComponent(bookThumbnail)}`;
  } else return "";
};
