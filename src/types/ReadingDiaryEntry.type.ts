export type ReadingDiaryEntry = {
  id: string | number;
  title: string;
  associatedBooks: string[];
  entry: string;
  timestamp: number;
};
