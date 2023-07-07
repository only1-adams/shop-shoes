<template>
	<section class="py-10">
		<div
			class="py-8 bg-secondary px-8 md:px-[2rem] lg:px-[3rem] xl:px-[5rem] flex items-center justify-between"
		>
			<span
				class="text-[1.7rem] md:text-[2.5rem] lg:text-[3rem] font-semibold text-white"
				>For You or Ya Boo</span
			>
			<a
				href=""
				class="px-12 py-5 border-[1.5px] border-white text-white text-[1.7rem] transition-all duration-200 hover:border-primaryLight hover:primaryLight"
				>View all</a
			>
		</div>
		<div class="px-8 md:px-[2rem] lg:px-[3rem] xl:px-[5rem] pb-10">
			<div class="overflow-auto">
				<div class="mt-12 grid grid-cols-3 gap-10 w-max lg:w-full">
					<template v-for="(product, index) in products" :key="index">
						<ProductCard />
					</template>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
const products = ref([
	{
		productName: "Glow Powder Cleanser",
		price: 30_000,
		discountPrice: 0,
		avgRating: 4.2,
	},
	{
		productName: "Glow Powder Cleanser",
		price: 30_000,
		discountPrice: 0,
		avgRating: 5,
	},
	{
		productName: "Glow Powder Cleanser",
		price: 30_000,
		discountPrice: 0,
		avgRating: 4.3,
	},
]);
</script>
