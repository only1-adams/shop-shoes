<template>
	<div>
		<section class="py-12 px-8 md:px-[2rem] lg:px-[3rem] xl:px-[5rem]">
			<p class="text-2xl font-semibold text-[#817F80]">
				{{ product?.category.title }}
			</p>
			<div
				class="mt-8 md:mt-12 gap-y-8 flex items-center justify-center flex-col lg:items-start lg:justify-start lg:flex-row gap-x-10"
			>
				<div class="w-full md:w-[80%] lg:w-1/2">
					<NuxtImg
						class="h-[300px] md:h-[466px] w-full object-cover"
						:src="`https://s3.amazonaws.com/myklefblog-bucket/${product?.image}`"
						loading="lazy"
					/>
				</div>
				<div class="w-full md:w-[80%] lg:w-1/2">
					<p
						class="text-[2.5rem] md:text-[3rem] font-semibold text-customBlack"
					>
						{{ product.title }}
					</p>
					<p
						class="mt-7 text-customBlack font-bold text-[2rem] flex items-center gap-x-5"
					>
						<span>
							&#8358;
							{{ product.price.toLocaleString() }}
						</span>
						<span
							v-if="product.discount_price"
							class="text-red-500 font-medium line-through"
						>
							&#8358;{{ product.discount_price.toLocaleString() }}
						</span>
					</p>
					<p class="mt-7 text-2xl text-customBlack">
						{{ product.description }}
					</p>
					<div class="flex items-center gap-x-3 mt-12">
						<Rating />
					</div>
					<div
						class="mt-10 flex flex-col gap-y-10 items-start md:flex-row md:items-center gap-x-24"
					>
						<div v-if="productInCart" class="flex items-center gap-x-16">
							<span
								@click="
									productInCart ? updateCart('remove') : decrementQuantity()
								"
								class="flex items-center justify-center w-[40px] h-[40px] bg-secondary cursor-pointer"
							>
								<svg
									width="20"
									height="2"
									viewBox="0 0 20 2"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<line
										x1="0.75"
										y1="1.25"
										x2="19.25"
										y2="1.25"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
									/>
								</svg>
							</span>
							<span class="w-[40px] h-[40px] flex items-center justify-center">
								<span
									v-if="!isUpdatingCart"
									class="text-[3rem] text-customBlack"
									>{{
										productQuantity !== null ? productQuantity : quantity
									}}</span
								>
								<LoadingSpinner
									v-if="isUpdatingCart"
									width="30px"
									height="30px"
								/>
							</span>
							<span
								@click="productInCart ? updateCart('add') : incrementQuantity()"
								class="flex items-center justify-center w-[40px] h-[40px] bg-secondary cursor-pointer"
							>
								<svg
									width="20"
									height="21"
									viewBox="0 0 20 21"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M10 1V19.9474M19 10.4737L1 10.4737"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</span>
						</div>
						<form
							class="grow w-full md:w-[80%]"
							@submit.prevent="updateCart('add')"
						>
							<input type="hidden" name="quantity" v-model="quantity" />
							<button
								v-if="!productInCart"
								type="submit"
								class="rounded-lg w-full flex items-center justify-center py-6 border-[1.5px] border-customBlack bg-customBlack text-[2rem] font-semibold text-white transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
							>
								Add to bag
							</button>
						</form>
					</div>
					<ReviewModal :product-id="product._id" />
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
import cartStore from "~/store/cart-store";
import authStore from "~/store/auth-store";
import rootStore from "~/store/root-store";
import LoadingSpinner from "~/components/LoadingSpinner.vue";

definePageMeta({
	middleware: ["auth"],
});

const route = useRoute();
const config = useRuntimeConfig();
const cart = cartStore();
const auth = authStore();
const root = rootStore();

const slug = route.params.productSlug;
const productInCart = ref(true);
const isUpdatingCart = ref(false);

const { data: productData, error } = await useFetch(
	`${config.public.ENDPOINT_URL}products/${slug}`
);

if (error.value) {
	throw createError({
		statusMessage: error.value.message,
		statusCode: error.value.statusCode,
		fatal: true,
	});
}

const product = computed(() => productData.value.product);
const { quantity, decrementQuantity, incrementQuantity, setQuantity } =
	useQuantity();

const productQuantity = computed(() => {
	const isInCart = cart.userCart.items.find((item) => {
		return item.product._id === product.value._id;
	});
	return isInCart !== undefined ? isInCart.quantity : null;
});

onMounted(() => {
	const isInCart = cart.userCart.items.find((item) => {
		return item.product._id === product.value._id;
	});

	if (!isInCart) {
		productInCart.value = false;
	}
});

watch(cart.userCart, (newValue) => {
	const isInCart = newValue.items.find((item) => {
		return item.product._id === product.value._id;
	});

	productInCart.value = isInCart !== undefined;
});

async function updateCart(action) {
	try {
		if (auth.isLoggedIn) {
			isUpdatingCart.value = true;
			const response = await cart.addToCart(
				`${config.public.ENDPOINT_URL}`,
				product.value._id,
				action,
				auth.csrf
			);
			root.displayPopup(response.message, "success");
			isUpdatingCart.value = false;
			cart.cartWasUpdated = true;
		}
	} catch (error) {
		root.displayPopup(error.message, "error");
		isUpdatingCart.value = false;
	}
}
</script>
