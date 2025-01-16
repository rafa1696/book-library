import { FilterTypes } from "../enums/FilterTypes.enum";
import { BookInfo } from "../types/BookInfo.type";
import { ReadingDiaryEntry } from "../types/ReadingDiaryEntry.type";

const filterEntries = (
  entries: BookInfo[] | ReadingDiaryEntry[] | undefined,
  howToReorder: FilterTypes
) => {
  if (!entries) {
    return [];
  }

  const isBook = (
    entries: BookInfo[] | ReadingDiaryEntry[]
  ): entries is BookInfo[] => {
    return (entries as BookInfo[])[0].bookName !== undefined;
  };

  const getProperty = (
    entry: BookInfo | ReadingDiaryEntry,
    property: string
  ) => {
    // TODO - Consertar any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (entry as any)[property];
  };

  const property = isBook(entries) ? "bookName" : "title";
  const dateProperty = isBook(entries) ? "bookAddDate" : "timestamp";

  switch (howToReorder) {
    case FilterTypes.Alphabetical:
      return entries.sort((a, b) =>
        getProperty(a, property).localeCompare(getProperty(b, property))
      );
    case FilterTypes.Oldest:
      return entries.sort(
        (a, b) => getProperty(a, dateProperty) - getProperty(b, dateProperty)
      );
    case FilterTypes.Newest:
      return entries.sort(
        (a, b) => getProperty(b, dateProperty) - getProperty(a, dateProperty)
      );
    default:
      return entries;
  }
};

export default filterEntries;
