/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			container: {
				padding: '2rem',
				center: true,
			},
			transitionDuration: '0.6s',
			transitionTimingFunction: 'ease-in-out',
		},
	},
	plugins: [],
};
