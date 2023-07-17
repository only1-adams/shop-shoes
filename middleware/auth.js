import authStore from "~/store/auth-store";
import { callWithNuxt } from "nuxt/app";

export default defineNuxtRouteMiddleware(async (to, _) => {
	const config = useRuntimeConfig();
	const headers = useRequestHeaders(["cookie"]);
	const auth = authStore();
	const isLoggedIn = useState("isLoggedIn", () => false);

	const url = process.server
		? process.env.ENDPOINT_URL
		: config.public.ENDPOINT_URL;

	try {
		await auth.getCsrfToken(url, headers);
		isLoggedIn.value = true;
	} catch (error) {
		await auth.logUserOut(url, headers);
		isLoggedIn.value = false;
	}

	if (!isLoggedIn.value && to.meta.requiresAuth) {
		return navigateTo("/?auth=false");
	}
});
