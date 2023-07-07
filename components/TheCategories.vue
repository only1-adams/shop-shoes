<template>
	<section class="py-3 bg-primary hidden md:block">
		<ul
			class="flex items-center justify-center gap-x-10 text-[1.7rem] font-semibold text-white"
		>
			<template
				v-for="(category, index) in categories.categories"
				:key="category.title"
			>
				<TheCategoryItem :title="category.title" />
			</template>
		</ul>
	</section>
</template>

<script setup>
const config = useRuntimeConfig();

const { data: categories } = await useFetch(
	`${config.public.ENDPOINT_URL}products/category`
);
</script>
