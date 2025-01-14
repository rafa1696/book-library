import { FilterTypes } from "../enums/FilterTypes.enum";
import { BookInfo } from "../types/BookInfo.type";

const filterEntries = (
  entries: BookInfo[] | undefined,
  howToReorder: FilterTypes
) => {
  if (!entries) {
    return [];
  }

  switch (howToReorder) {
    case FilterTypes.Alphabetical:
      return entries.sort((a, b) =>
        (a.bookName ?? "").localeCompare(b.bookName ?? "")
      );
    case FilterTypes.Oldest:
      return entries.sort((a, b) => a.bookAddDate - b.bookAddDate);
    case FilterTypes.Newest:
      return entries.sort((a, b) => b.bookAddDate - a.bookAddDate);
    default:
      return entries;
  }
};

export default filterEntries;
