<template>
	<div>
		<span
			@click="toggle"
			class="flex mt-10 text-customBlack font-medium underline text-2xl cursor-pointer"
			>Submit Review</span
		>
		<Teleport to="body">
			<div
				@click="close"
				v-if="isOpen"
				class="fixed z-[4] bg-overlayColor top-0 w-full h-full left-0"
			></div>
		</Teleport>
		<Teleport to="body">
			<div
				v-if="isOpen"
				id="review"
				class="fixed top-0 md:top-[5%] left-0 right-0 m-auto z-[5] w-full h-full md:w-[512px] md:h-[450px] overflow-auto bg-white rounded-lg p-8"
			>
				<LoadingOverlay v-show="isSubmitting" />
				<div class="flex items-center justify-between">
					<span class="text-[2rem] font-semibold text-secondary"
						>Submit a review</span
					>
					<span
						@click="close"
						class="cursor-pointer flex items-center justify-center w-[35px] h-[35px] rounded-full"
					>
						<svg
							width="22"
							height="22"
							viewBox="0 0 22 22"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1 21L21 1M1 1L21 21"
								stroke="#0F172A"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</span>
				</div>
				<div class="mt-8 flex items-center justify-center">
					<RatingStars
						@rated="(productRating) => (reviewData.rating = productRating)"
					/>
				</div>
				<form @submit.prevent="submitReview" class="mt-8">
					<div class="flex flex-col gap-y-8">
						<div class="flex grow flex-col gap-y-6">
							<label
								for="login_email"
								class="text-2xl font-medium text-customBlack"
								>Your Review</label
							>
							<div
								class="w-full border-[1.5px] border-[#D2D1D1] focus-within:border-secondary transition-all duration-300 h-max flex items-center p-5 gap-x-3"
							>
								<textarea
									class="text-2xl border-none outline-none grow w-[90%] h-[200px] bg-transparent resize-none"
									type="address"
									placeholder="Your Review"
									name=""
									id=""
									v-model="reviewData.review"
								></textarea>
							</div>
						</div>
						<div>
							<button
								type="submit"
								class="mt-8 w-full flex items-center justify-center py-6 border-[1.5px] border-secondary bg-secondary text-[1.7rem] font-semibold text-white transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
							>
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		</Teleport>
	</div>
</template>

<script setup>
import rootStore from "~/store/root-store";
import authStore from "~/store/auth-store";

const props = defineProps(["productId"]);
const config = useRuntimeConfig();
const root = rootStore();
const auth = authStore();

const { isOpen, close, toggle } = useToggler();
const isSubmitting = ref(false);

const product = computed(() => props.productId);

const reviewData = reactive({
	review: "",
	rating: 0,
	product: product.value,
});

function clearReview() {
	reviewData = reactive({
		review: "",
		rating: 0,
		product: product.value,
	});
}

async function submitReview() {
	try {
		isSubmitting.value = true;
		const response = await $fetch(
			`${config.public.ENDPOINT_URL}products/review`,
			{
				method: "POST",
				body: reviewData,
				credentials: "include",
				headers: {
					"x-csrf-token": auth.csrf,
				},
			}
		);
		root.displayPopup(response.message, "success");
		isSubmitting.value = false;
		clearReview();
		close();
	} catch (error) {
		root.displayPopup(error.data.message || error.message, "error");
		isSubmitting.value = false;
	}
}
</script>
