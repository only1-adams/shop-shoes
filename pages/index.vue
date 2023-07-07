<template>
	<FeaturedProducts :products="products?.products" />
	<BestSelling />
	<!-- <CustomSection /> -->
</template>

<script setup>
definePageMeta({
	middleware: ["auth"],
});

const config = useRuntimeConfig();
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
</script>
