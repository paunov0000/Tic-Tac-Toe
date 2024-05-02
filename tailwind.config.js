/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css}'],
	theme: {
		extend: {
			width: {
				site: '1200px',
			},
		},
	},
	plugins: [],
};
