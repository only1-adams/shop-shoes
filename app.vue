<template>
	<NuxtLayout>
		<template #loader>
			<NuxtLoadingIndicator :height="4" />
		</template>
		<template #alert>
			<TheAlertPopup :show="status" :message="message" :type="type" />
		</template>
		<NuxtPage></NuxtPage>
	</NuxtLayout>
</template>
<script setup>
import rootStore from "~/store/root-store";
import authStore from "~/store/auth-store";

const route = useRoute();
const store = rootStore();
const auth = authStore();
const config = useRuntimeConfig();

const query = computed(() => route.query);

const status = computed(() => {
	return store.hasError.status;
});

const message = computed(() => {
	return store.hasError.message;
});

const type = computed(() => {
	return store.hasError.type;
});

const isLoggedIn = computed(() => auth.isLoggedIn);

watch(
	query,
	(newValue) => {
		if (newValue.auth) {
			store.displayPopup(
				"Looks like your session expired. Please log in again.",
				"error"
			);
		}

		if (newValue.notallowed) {
			store.displayPopup(
				"You do not have permission to access the page.",
				"error"
			);
		}
	},
	{ immediate: true }
);

// watch(isLoggedIn, (newValue) => {
// 	if (!newValue) {
// 		auth.logUserOut(config.public.ENDPOINT_URL);
// 		return navigateTo("/");
// 	}
// });
</script>
