import { defineConfig } from 'cypress'

export default defineConfig({
	component: {
		devServer: {
			framework: 'react',
			bundler: 'vite',
		},
		video: true,
		reporter: 'mochawesome',
		reporterOptions: {
			reportDir: 'cypress/results',
			overwrite: false,
			html: true,
			json: false,
			timestamp: 'mmddyyyy_HHMMss',
		},
	},

	e2e: {
		video: true,
		reporter: 'mochawesome',
		reporterOptions: {
			reportDir: 'cypress/results',
			overwrite: false,
			html: true,
			json: false,
			timestamp: 'mmddyyyy_HHMMss',
		},
	},
})
