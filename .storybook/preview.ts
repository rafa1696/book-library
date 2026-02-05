import type { Preview } from '@storybook/react-vite'
import '../src/styles/import-all.css'
import React from 'react'

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	// decorators: [
	//   (Story, context) => {
	//     React.useEffect(() => {
	//       document.body.style.backgroundColor = '#f5f5f5';
	//       document.documentElement.style.backgroundColor = '#f5f5f5';
	//       const root = document.getElementById('storybook-root');
	//       if (root) {
	//         root.style.backgroundColor = '#f5f5f5';
	//       }
	//     }, []);

	//     return React.createElement(
	//       'div',
	//       { style: { backgroundColor: '#f5f5f5', minHeight: '100vh' } },
	//       React.createElement(Story, context)
	//     );
	//   },
	// ],
}

export default preview
