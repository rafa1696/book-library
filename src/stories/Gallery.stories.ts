import type { Meta, StoryObj } from '@storybook/react-vite'
import Gallery from '../components/Gallery/Gallery'
import BookCard from '../components/BookCard/BookCard'
import { GoogleBookVolumes } from '../types/GoogleBookVolumes.type'
import React from 'react'
import { withRouter } from './decorators/withRouter'

const mockBooks: GoogleBookVolumes[] = [
	{
		kind: 'books#volume',
		id: 'book-1',
		etag: 'etag-1',
		selfLink: 'https://www.googleapis.com/books/v1/volumes/book-1',
		volumeInfo: {
			title: 'Clean Code',
			authors: ['Robert C. Martin'],
			publisher: 'Prentice Hall',
			publishedDate: '2008-08-01',
			description: 'Learn how to write code that is readable and maintainable.',
			industryIdentifiers: [],
			readingModes: { text: true, image: true },
			pageCount: 464,
			printType: 'BOOK',
			categories: ['Computers'],
			maturityRating: 'NOT_MATURE',
			allowAnonLogging: true,
			contentVersion: '1.0.0.0.preview.2',
			panelizationSummary: {
				containsEpubBubbles: false,
				containsImageBubbles: false,
			},
			imageLinks: {
				smallThumbnail: 'https://covers.openlibrary.org/b/id/7995141-S.jpg',
				thumbnail: 'https://covers.openlibrary.org/b/id/7995141-M.jpg',
			},
			language: 'en',
			previewLink: 'http://books.google.com/books?id=book-1',
			infoLink: 'https://play.google.com/store/books/details?id=book-1',
			canonicalVolumeLink: 'https://play.google.com/store/books/details?id=book-1',
		},
		saleInfo: {
			country: 'BR',
			saleability: 'FOR_SALE',
			isEbook: true,
			listPrice: { amount: 50.0, currencyCode: 'BRL' },
			retailPrice: { amount: 40.0, currencyCode: 'BRL' },
			buyLink: 'https://play.google.com/store/books/details?id=book-1',
			offers: [],
		},
		accessInfo: {
			country: 'BR',
			viewability: 'PARTIAL',
			embeddable: true,
			publicDomain: false,
			textToSpeechPermission: 'ALLOWED',
			epub: { isAvailable: true, acsTokenLink: '' },
			pdf: { isAvailable: false },
			webReaderLink: 'http://play.google.com/books/reader?id=book-1',
			accessViewStatus: 'SAMPLE',
			quoteSharingAllowed: false,
		},
		searchInfo: { textSnippet: 'Learn how to write code...' },
	},
	{
		kind: 'books#volume',
		id: 'book-2',
		etag: 'etag-2',
		selfLink: 'https://www.googleapis.com/books/v1/volumes/book-2',
		volumeInfo: {
			title: 'Design Patterns',
			authors: ['Gang of Four'],
			publisher: 'Addison-Wesley',
			publishedDate: '1994-10-31',
			description: 'Elements of Reusable Object-Oriented Software',
			industryIdentifiers: [],
			readingModes: { text: true, image: true },
			pageCount: 395,
			printType: 'BOOK',
			categories: ['Computers'],
			maturityRating: 'NOT_MATURE',
			allowAnonLogging: true,
			contentVersion: '1.0.0.0.preview.2',
			panelizationSummary: {
				containsEpubBubbles: false,
				containsImageBubbles: false,
			},
			imageLinks: {
				smallThumbnail: 'https://covers.openlibrary.org/b/id/8236019-S.jpg',
				thumbnail: 'https://covers.openlibrary.org/b/id/8236019-M.jpg',
			},
			language: 'en',
			previewLink: 'http://books.google.com/books?id=book-2',
			infoLink: 'https://play.google.com/store/books/details?id=book-2',
			canonicalVolumeLink: 'https://play.google.com/store/books/details?id=book-2',
		},
		saleInfo: {
			country: 'BR',
			saleability: 'FOR_SALE',
			isEbook: true,
			listPrice: { amount: 60.0, currencyCode: 'BRL' },
			retailPrice: { amount: 48.0, currencyCode: 'BRL' },
			buyLink: 'https://play.google.com/store/books/details?id=book-2',
			offers: [],
		},
		accessInfo: {
			country: 'BR',
			viewability: 'PARTIAL',
			embeddable: true,
			publicDomain: false,
			textToSpeechPermission: 'ALLOWED',
			epub: { isAvailable: true, acsTokenLink: '' },
			pdf: { isAvailable: false },
			webReaderLink: 'http://play.google.com/books/reader?id=book-2',
			accessViewStatus: 'SAMPLE',
			quoteSharingAllowed: false,
		},
		searchInfo: { textSnippet: 'Elements of Reusable...' },
	},
]

const meta = {
	title: 'Components/Gallery',
	component: Gallery,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	decorators: [withRouter],
} satisfies Meta<typeof Gallery>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: { children: null },
	render: (args: any) =>
		React.createElement(
			Gallery,
			args,
			mockBooks.map((book) =>
				React.createElement('li', { key: book.id }, React.createElement(BookCard, { book })),
			),
		),
}

export const WithManyBooks: Story = {
	args: { children: null },
	render: (args: any) =>
		React.createElement(
			Gallery,
			args,
			[...mockBooks, ...mockBooks, ...mockBooks].map((book, index) =>
				React.createElement(
					'li',
					{ key: `${book.id}-${index}` },
					React.createElement(BookCard, { book }),
				),
			),
		),
}

export const Empty: Story = {
	args: { children: null },
	render: (args: any) => React.createElement(Gallery, args),
}
