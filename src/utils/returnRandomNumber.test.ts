import { returnRandomNumber } from './returnRandomNumber'
import { expect } from '@jest/globals'

describe('returnRandomNumber', () => {
	it('should return a number between the specified min and max', () => {
		const min = 1
		const max = 30

		const randomNumber = returnRandomNumber(min, max)
		expect(randomNumber).toBeGreaterThanOrEqual(min)
		expect(randomNumber).toBeLessThanOrEqual(max)
	})
})
