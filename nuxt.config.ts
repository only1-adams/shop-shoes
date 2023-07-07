// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		"@nuxtjs/tailwindcss",
		"@vueuse/nuxt",
		"@nuxt/image-edge",
		"@pinia/nuxt",
	],

	app: {
		head: {
			meta: [
				{ charset: "utf-8" },
				{
					name: "viewport",
					content:
						"width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0",
				},
				{ "http-equiv": "X-UA-Compatible", content: "IE=edge" },
			],
			script: [{ defer: true, src: "https://js.paystack.co/v1/inline.js" }],
		},
	},

	tailwindcss: {
		cssPath: "~/assets/tailwind.css",
		configPath: "~/tailwind.config.js",
	},

	runtimeConfig: {
		public: {
			ENDPOINT_URL: process.env.ENDPOINT_URL,
		},
	},

	image: {
		domains: ["localhost"],
	},

	pinia: {
		autoImports: [
			// automatically imports `defineStore`
			"defineStore", // import { defineStore } from 'pinia'
		],
	},
});
