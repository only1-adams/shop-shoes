<template>
	<div class="flex items-center gap-x-3">
		<template v-for="(_, index) in 5" :key="index">
			<svg
				width="28"
				height="27"
				@click="rateProduct(index + 1)"
				class="cursor-pointer stroke-primary"
				:class="index + 1 <= productRating ? 'fill-primary' : 'fill-none'"
				viewBox="0 0 21 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M9.63698 1.34648C9.82913 0.884506 10.4836 0.884506 10.6757 1.34648L12.8017 6.45794C12.8827 6.6527 13.0659 6.78577 13.2761 6.80262L18.7944 7.24502C19.2931 7.285 19.4953 7.90741 19.1153 8.23291L14.911 11.8344C14.7508 11.9716 14.6809 12.1869 14.7298 12.3921L16.0143 17.7769C16.1304 18.2636 15.6009 18.6483 15.1739 18.3875L10.4496 15.5019C10.2695 15.3919 10.0432 15.3919 9.86315 15.5019L5.13876 18.3875C4.71176 18.6483 4.18231 18.2636 4.2984 17.7769L5.58289 12.3921C5.63183 12.1869 5.56187 11.9716 5.40168 11.8344L1.19736 8.23292C0.817369 7.90741 1.0196 7.285 1.51834 7.24502L7.03659 6.80262C7.24685 6.78577 7.43 6.6527 7.51101 6.45794L9.63698 1.34648Z"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</template>
	</div>
</template>

<script setup>
const emit = defineEmits(["rated"]);
const productRating = ref(0);

async function rateProduct(rating) {
	if (rating === productRating.value) {
		this.productRating--;
		return;
	}
	productRating.value = Number(rating);
	emit("rated", productRating.value);
}
</script>
