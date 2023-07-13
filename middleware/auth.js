import authStore from "~/store/auth-store";
export default defineNuxtRouteMiddleware(async (to, from) => {
	const nuxtApp = useNuxtApp();
	await nuxtApp.callHook("page:start");

	const config = useRuntimeConfig();
	const headers = useRequestHeaders(["cookie"]);
	const auth = authStore();

	let hasError = false;
	const url = process.server
		? process.env.ENDPOINT_URL
		: config.public.ENDPOINT_URL;

	try {
		await auth.getCsrfToken(url, headers);
	} catch (error) {
		hasError = true;
	}

	console.log(auth.isLoggedIn);

	if (hasError) {
		await auth.logUserOut(url, headers);
	}

	if (hasError && to.meta.requiresAuth) {
		return await navigateTo("/?auth=false");
	}
});
