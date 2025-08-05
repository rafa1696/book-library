import useDeviceWidth from './useDeviceWidth'
import { expect, it, describe, beforeEach, afterEach, jest } from '@jest/globals'
import { renderHook, act } from '@testing-library/react'

// Ensure window is available in the test environment (JSDOM is used by Jest by default)
describe('useDeviceWidth', () => {
	let originalInnerWidth: number

	beforeEach(() => {
		originalInnerWidth = window.innerWidth
	})

	afterEach(() => {
		window.innerWidth = originalInnerWidth
	})

	it('should return the initial width of the window', () => {
		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: 1024,
		})
		const { result } = renderHook(() => useDeviceWidth())
		expect(result.current).toBe(1024)
	})

	it('should update width when window is resized', () => {
		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: 800,
		})
		const { result } = renderHook(() => useDeviceWidth())
		expect(result.current).toBe(800)

		act(() => {
			window.innerWidth = 600
			window.dispatchEvent(new Event('resize'))
		})

		expect(result.current).toBe(600)
	})

	// it('should clean up event listener on unmount', () => {
	// 	const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
	// 	const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
	// 	const { unmount } = renderHook(() => useDeviceWidth())
	// 	expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
	// 	unmount()
	// 	expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
	// 	addEventListenerSpy.mockRestore()
	// 	removeEventListenerSpy.mockRestore()
	// })
})
