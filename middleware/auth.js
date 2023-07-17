import authStore from "~/store/auth-store";

export default defineNuxtRouteMiddleware(async (to, _) => {
	const config = useRuntimeConfig();
	const headers = useRequestHeaders(["cookie"]);
	const auth = authStore();

	const url = process.server
		? process.env.ENDPOINT_URL
		: config.public.ENDPOINT_URL;

	try {
		await auth.getCsrfToken(url, headers);
		console.log(auth.isLoggedIn, "middleware");
	} catch (error) {
		await auth.logUserOut(url, headers);
	}

	if (!auth.isLoggedIn && to.meta.requiresAuth) {
		return await navigateTo("/?auth=false");
	}
});
