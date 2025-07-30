import { BookInfo } from '../../types/BookInfo.type'

export function getMockBookLibraryContext(savedBooks: BookInfo[] = []) {
	return {
		savedBooks,
		readingDiary: [],
		toastMessagePipeline: [],
		seenToastMessage: null,
		saveBook: cy.stub(),
		removeBook: cy.stub(),
		saveReadingDiary: cy.stub(),
		removeReadingDiaryEntry: cy.stub(),
		reorderEntries: cy.stub(),
		toastMessageDefinition: cy.stub(),
	}
}
