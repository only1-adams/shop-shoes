import authStore from "~/store/auth-store";

export default defineNuxtRouteMiddleware(async (to, _) => {
	if (process.server) {
		const config = useRuntimeConfig();
		const headers = useRequestHeaders(["cookie"]);
		const auth = authStore();
		const authValue = useAuth();

		const url = process.server
			? process.env.ENDPOINT_URL
			: config.public.ENDPOINT_URL;

		try {
			await auth.getCsrfToken(url, headers);
			authValue.value = true;
		} catch (error) {
			await auth.logUserOut(url, headers);
			authValue.value = false;
		}
		console.log(headers);
		console.log(auth.isLoggedIn, authValue.value, "middleware");

		if (!auth.isLoggedIn && to.meta.requiresAuth) {
			return await navigateTo("/?auth=false");
		}
	}
});
