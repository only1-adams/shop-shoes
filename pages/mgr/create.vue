<template>
	<section class="flex items-center justify-center">
		<div class="w-full md:w-1/2">
			<div class="text-4xl font-bold text-center py-10">Add a new Product</div>
			<AddProduct />
		</div>
	</section>
</template>
<script setup>
definePageMeta({
	layout: "admin",
	middleware: ["auth","is-admin"],
	requiresAuth: true,
});
</script>
