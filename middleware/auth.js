import authStore from "~/store/auth-store";

export default defineNuxtRouteMiddleware(async (to, _) => {
	const nuxtApp = useNuxtApp();
	await nuxtApp.callHook("page:start");

	await useAsyncData("authMiddleware", async () => {
		const config = useRuntimeConfig();
		const headers = useRequestHeaders(["cookie"]);

		const auth = authStore();

		const url = process.server
			? process.env.ENDPOINT_URL
			: config.public.ENDPOINT_URL;

		try {
			await auth.getCsrfToken(url, headers);
			console.log(auth.isLoggedIn);
			auth.testMessage = "working";
		} catch (error) {
			await auth.logUserOut(url, headers);
			if (to.meta.requiresAuth) {
				return await navigateTo("/?auth=false");
			}
		}
	});
});
