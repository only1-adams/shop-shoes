<template>
	<FeaturedProducts :products="products?.products" />
	<BestSelling />
	<!-- <CustomSection /> -->
</template>

<script setup>
import authStore from "~/store/auth-store";

definePageMeta({
	middleware: ["auth"],
});

const config = useRuntimeConfig();
const store = authStore();
const isLoggedIn = ref(false);

const storeIsLoggedIn = computed(() => store.isLoggedIn);

const { data: products, error } = await useFetch(
	`${config.public.ENDPOINT_URL}products`
);

if (error.value) {
	throw createError({
		statusMessage: "An error occurred",
		statusCode: error.value.statusCode,
		fatal: true,
	});
}

watchEffect(() => {
	console.log(store.testMessage);
	isLoggedIn.value = storeIsLoggedIn.value;
});
</script>
