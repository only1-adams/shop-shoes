<template>
	<section
		class="py-12 px-8 md:px-[2rem] lg:px-[3rem] xl:px-[5rem] overflow-hidden"
	>
		<div class="flex items-center justify-between">
			<span
				class="text-[1.7rem] md:text-[2.5rem] lg:text-[3rem] font-semibold text-secondary"
				>Featured Products</span
			>
			<a
				href="blog-details.html"
				class="rounded-lg px-12 py-5 border-[1.5px] border-secondary text-secondary text-2xl md:text-[1.7rem] transition-all duration-200 hover:border-primary hover:text-primary"
				>View all</a
			>
		</div>
		<div class="overflow-auto w-full">
			<div class="mt-12 h-full grid grid-cols-3 gap-10 w-max lg:w-full">
				<template v-for="(product, index) in props.products" :key="index">
					<ProductCard :product="product" />
				</template>
			</div>
		</div>
	</section>
</template>

<script setup>
const props = defineProps(["products"]);
</script>
