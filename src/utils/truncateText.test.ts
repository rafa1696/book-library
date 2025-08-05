/// <reference types="jest" />

import { truncateText } from './truncateText'

describe('truncateText', () => {
	it('should return the original text if it is shorter than the limit', () => {
		const text = 'Hello, World!'
		const limit = 20
		expect(truncateText(text, limit)).toBe(text)
	})

	it('should return truncated text if it exceed the limit', () => {
		const text = 'This is a very long text that should be truncated.'
		const limit = 20
		expect(truncateText(text, limit)).toBe('This is a very long ...')
	})
})
