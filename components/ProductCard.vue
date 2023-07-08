<template>
	<div
		class="h-full w-[300px] md:w-[380px] lg:w-full min-[1440px]:w-full flex flex-col justify-between"
	>
		<NuxtLink :to="{ path: `/products/${product?.slug}` }">
			<NuxtImg
				class="h-[300px] lg:h-[300px] xl:h-[348px] object-cover w-full min-[1440px]:w-full"
				:src="`http://localhost:8080/${product?.image}`"
				:alt="product?.title"
				loading="lazy"
			/>
		</NuxtLink>
		<div class="py-6 flex flex-col gap-y-6">
			<NuxtLink :to="{ path: `/products/${product?.slug}` }">
				<p class="text-customBlack text-[2rem] font-semibold">
					{{ product?.title }}
				</p>
			</NuxtLink>
			<div class="flex items-center gap-x-3">
				<Rating />
			</div>
			<p class="text-[2rem] text-customBlack flex items-center gap-x-4">
				<span>&#8358;{{ product?.price }}</span>
				<span v-if="product?.discount_price" class="text-red-500 line-through"
					>&#8358;{{ product?.discount_price }}</span
				>
			</p>
			<form class="w-full" @submit.prevent="addProductToCart">
				<button
					v-if="!isAdmin && !productInCart"
					type="submit"
					class="w-full flex items-center justify-center py-6 border-[1.5px] border-customBlack text-[2rem] font-semibold text-customBlack transition-all duration-200 hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-80"
					:disabled="isAddingToCart"
					id="add-to-cart-btn"
				>
					{{ isAddingToCart ? "Adding to cart" : "Add to bag" }}
				</button>
				<button
					v-if="!isAdmin && productInCart"
					id="added-to-bag-display"
					type="button"
					class="w-full flex items-center justify-center py-6 border-[1.5px] border-customBlack text-[2rem] bg-customBlack font-semibold text-white transition-all duration-200 pointer-events-none"
				>
					Added to bag
				</button>
				<button
					v-if="isAdmin"
					type="button"
					class="w-full flex items-center justify-center py-6 border-[1.5px] text-customBlack border-customBlack text-[2rem] hover:bg-customBlack font-semibold hover:text-white transition-all duration-200"
				>
					Edit Product
				</button>
			</form>
		</div>
	</div>
</template>

<script setup>
import rootStore from "~/store/root-store";
import cartStore from "~/store/cart-store";
import authStore from "~/store/auth-store";

const config = useRuntimeConfig();
const root = rootStore();
const auth = authStore();
const cart = cartStore();

const props = defineProps(["product", "isAdmin"]);
const product = computed(() => props.product);
const isAdmin = computed(() => props.isAdmin);

const isAddingToCart = ref(false);

async function addProductToCart() {
	try {
		if (auth.isLoggedIn) {
			isAddingToCart.value = true;
			const successMessage = await cart.addToCart(
				`${config.public.ENDPOINT_URL}`,
				product.value._id,
				"add",
				auth.csrf
			);
			root.displayPopup(successMessage, "success");
			isAddingToCart.value = false;
			cart.cartWasUpdated = true;
		}
	} catch (error) {
		root.displayPopup(error.message, "error");
	}
}

const productInCart = computed(() => {
	const isInCart = cart.userCart.items.find((item) => {
		return item.product._id === product.value._id;
	});

	return isInCart !== undefined;
});
</script>
