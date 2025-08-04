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
})
