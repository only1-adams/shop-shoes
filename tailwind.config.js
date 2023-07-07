/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{html,js,vue}",
		"./components/**/*.{html,js,vue}",
		"./layouts/**/*.{html,js,vue}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#D3B261",
				primaryLight: "#FFF8E5",
				secondary: "#201E1F",
				customBlack: "#353435",
				discountYellow: "#F0FF07",
				successGreen: "#0A9317",
				overlayColor: "#D3B26166",
			},
			fontFamily: {
				custom: " 'Sora', sans-serif",
			},
			boxShadow: {
				dropdown: "0px 3px 30px 3px rgba(0, 0, 0, 0.15)",
			},
		},
	},
	plugins: [],
};
