/// <reference types="jest"/>

import { locationCheck } from './locationCheck'

describe('locationCheck', () => {
	it('should return -1 if it is not Home or MyBooks', () => {
		window.location.hash = '#/some-other-route'
		expect(locationCheck()).toBe(-1)
	})

	it('should return 0 for Home route', () => {
		window.location.hash = '/'
		expect(locationCheck()).toBe(0)
	})

	it('should return 1 for MyBooks route', () => {
		window.location.hash = '#/my-books'
		expect(locationCheck()).toBe(1)
	})
})
