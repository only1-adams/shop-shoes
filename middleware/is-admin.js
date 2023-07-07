import authStore from "~/store/auth-store";
export default defineNuxtRouteMiddleware(() => {
	const auth = authStore();
	if (auth.role !== "admin") {
		return navigateTo("/?notallowed=false");
	}
});
