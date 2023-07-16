<template>
	<section class="pt-12 px-12">
		<div class="text-4xl font-bold">All Products</div>
		<div class="mt-12 grid grid-cols-3 gap-10 w-full">
			<template v-for="(product, index) in products.products" :key="index">
				<ProductCard :product="product" :is-admin="true" />
			</template>
		</div>
	</section>
</template>

<script setup>
definePageMeta({
	layout: "admin",
	middleware: ["auth", "is-admin"],
	requiresAuth: true,
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
