import React from 'react';
import { BookLibraryContext } from '../../context/BookLibraryContext';

const mockContextValue = {
  savedBooks: [],
  readingDiary: [],
  toastMessagePipeline: [],
  seenToastMessage: null,
  saveBook: () => {},
  removeBook: () => {},
  saveReadingDiary: () => {},
  removeReadingDiaryEntry: () => {},
  reorderEntries: () => {},
  toastMessageDefinition: () => {},
};

/**
 * Decorator para envolver componentes que usam BookLibraryContext
 */
export const withContext = (Story: any) =>
  React.createElement(
    BookLibraryContext.Provider,
    { value: mockContextValue as any },
    React.createElement(Story)
  );
