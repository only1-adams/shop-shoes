<template>
	<div class="w-full flex flex-col gap-y-7">
		<p class="text-[2rem] font-semibold text-secondary">Order Summary</p>
		<div class="bg-white p-8 flex flex-col gap-y-7">
			<div class="flex flex-col gap-y-7">
				<template v-for="(item, index) in cartItems" :key="index">
					<div class="flex gap-x-7 pb-5">
						<img
							class="w-[91px] h-[84px] object-cover"
							src="images/cart-image.png"
							alt=""
						/>
						<div>
							<span class="text-[1.7rem] font-semibold">{{
								item.product.title
							}}</span>
							<div class="mt-4 flex items-center gap-x-5">
								<span class="text-customBlack text-[1.7rem]"
									>${{ item.product.price }}</span
								>
								<span class="text-customBlack text-[1.7rem] font-bold"
									>x{{ item.quantity }}</span
								>
							</div>
						</div>
					</div>
				</template>
			</div>
			<div class="border-t-[1.5px] border-t-primary py-8">
				<p class="flex items-center justify-between">
					<span class="text-customBlack font-bold text-[1.7rem]"
						>Estimated Total</span
					>
					<span class="text-customBlack font-bold text-[1.7rem]"
						>${{ estimatedTotal }}</span
					>
				</p>
				<button
					@click="$emit('make-payment')"
					class="mt-8 w-full flex items-center justify-center py-6 border-[1.5px] border-secondary bg-secondary text-[2rem] font-semibold text-white transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
				>
					Confirm Order
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import cartStore from "~/store/cart-store";

const cart = cartStore();
const emit = defineEmits(["make-payment"]);

const cartItems = computed(() => cart.userCart.items);
const estimatedTotal = computed(() => cart.estimatedTotal);
</script>
