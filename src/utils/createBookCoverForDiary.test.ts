/// <reference types="jest"/>

import { createBookPictureForDiary } from './createBookCoverForDiary'

describe('createBookCoverForDiary', () => {
	it("should convert a book's thumbnail URL to a formatted string", () => {
		const thumbnail = 'http://example.com/thumbnail.jpg'
		const expected = '?bookPicture=http%3A%2F%2Fexample.com%2Fthumbnail.jpg'
		expect(createBookPictureForDiary(thumbnail)).toBe(expected)
	})
})
