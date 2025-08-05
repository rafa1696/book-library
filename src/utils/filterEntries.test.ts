/// <reference types="jest"/>

import { FilterTypes } from '../enums/FilterTypes.enum'
import { mockedBookInfo } from '../mocks/mockedBooksInfo'
import filterEntries from './filterEntries'

describe('filterEntries', () => {
	const mockedEntries = mockedBookInfo

	it('should return undefined it there are no entries', () => {
		filterEntries([], FilterTypes.Alphabetical)
	})

	it('should return undefined it the entries are undefined or null', () => {
		filterEntries(undefined, FilterTypes.Alphabetical)
		filterEntries(null, FilterTypes.Alphabetical)
	})

	it('should sort entries alphabetically', () => {
		expect(filterEntries(mockedEntries.reverse(), FilterTypes.Alphabetical)).toEqual(mockedBookInfo)
	})

	it('should sort entries from the oldest to newest', () => {
		expect(filterEntries(mockedEntries, FilterTypes.Oldest)).toEqual(
			mockedEntries.sort((a, b) => a.bookAddDate - b.bookAddDate)
		)
	})

	it('should sort entries from the newest to oldest', () => {
		expect(filterEntries(mockedEntries, FilterTypes.Newest)).toEqual(
			mockedEntries.sort((a, b) => b.bookAddDate - a.bookAddDate)
		)
	})
})
