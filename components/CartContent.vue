<template>
	<Teleport to="body">
		<div
			:class="isOpen ? 'translate-x-0' : 'translate-x-[1000px]'"
			class="w-full md:w-[500px] md:border-l-[1.5px] md:border-l-primary top-0 md:right-0 h-full overflow-auto bg-white fixed z-[5] transition-all duration-300"
		>
			<div class="flex items-center justify-between p-8">
				<span class="text-[3rem] font-semibold text-secondary">Your Bag</span>
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
			<template v-if="cartItems.length > 0">
				<div class="bg-primaryLight px-8">
					<div class="flex flex-col gap-y-8 py-8">
						<template v-for="(item, index) in cartItems" :key="index">
							<div
								class="flex gap-x-7 last:border-0 border-b border-b-secondary pb-5"
							>
								<img
									class="w-[100px] md:w-[148px] h-[88px] md:h-[136px] object-cover"
									:src="`http://localhost:8080/${item.product.image}`"
									alt=""
								/>
								<div>
									<span class="text-[1.7rem] font-semibold">{{
										item.product.title
									}}</span>
									<div class="mt-4 flex items-center gap-x-5">
										<span class="text-customBlack text-[1.7rem]"
											>${{ item.product.price.toLocaleString() }}</span
										>
										<span
											v-if="item.product.discount_price"
											class="text-red-500 text-[1.7rem] line-through"
											>${{ item.product.discount_price.toLocaleString() }}</span
										>
									</div>
									<div
										class="flex flex-col gap-y-6 md:flex-row md:items-center justify-between mt-6"
									>
										<div class="flex items-center gap-x-10">
											<span
												@click="decrementQuantity()"
												class="flex items-center justify-center w-[27px] h-[27px] bg-secondary cursor-pointer"
											>
												<svg
													width="14"
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
											<span class="text-[1.7rem] text-customBlack">{{
												item.quantity
											}}</span>
											<span
												@click="incrementQuantity()"
												class="flex items-center justify-center w-[27px] h-[27px] bg-secondary cursor-pointer"
											>
												<svg
													width="13"
													height="14"
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
										<a class="text-2xl text-[#817F81] underline" href=""
											>Remove from bag</a
										>
									</div>
								</div>
							</div>
						</template>
					</div>
				</div>
				<div
					class="border-y-[1.5px] bg-primaryLight border-y-primary py-8 px-8"
				>
					<ul class="w-full flex flex-col gap-y-5">
						<li class="flex items-center justify-between">
							<span class="text-customBlack text-2xl">Subtotal</span>
							<span class="text-customBlack text-[1.7rem]"
								>${{ totalAmount.toLocaleString() }}</span
							>
						</li>
						<li class="flex items-center justify-between">
							<span class="text-customBlack text-2xl">Shipping Fee</span>
							<span class="text-customBlack text-[1.7rem]"
								>${{ shippingFee }}</span
							>
						</li>
						<li class="flex items-center justify-between">
							<span class="text-customBlack text-2xl">VAT</span>
							<span class="text-customBlack text-[1.7rem]">${{ VAT }}</span>
						</li>
					</ul>
				</div>
				<div class="bg-[#FEF2F4] py-8 px-8">
					<p class="flex items-center justify-between">
						<span class="text-customBlack font-bold text-[1.7rem]"
							>Estimated Total</span
						>
						<span class="text-customBlack font-bold text-[1.7rem]"
							>${{ estimatedTotal }}</span
						>
					</p>
					<NuxtLink
						@click="$emit('close')"
						:to="{ path: '/checkout' }"
						class="mt-8 w-full flex items-center justify-center py-6 border-[1.5px] border-secondary bg-secondary text-[2rem] font-semibold text-white transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
					>
						Proceed to Checkout
					</NuxtLink>
				</div>
			</template>
			<template v-else>
				<div class="h-full flex flex-col items-center pt-12 gap-y-5 px-8">
					<img src="/images/empty-cart.svg" alt="" />
					<p class="text-4xl font-bold">Your Cart is Empty.</p>
					<p class="text-center text-2xl text-[#c3c3c3]">
						Looks like you haven't added anything to your cart
					</p>
				</div>
			</template>
		</div>
	</Teleport>
</template>

<script setup>
import cartStore from "~/store/cart-store";

const store = cartStore();
const props = defineProps(["isOpen"]);
const emit = defineEmits(["close"]);
const isOpen = computed(() => props.isOpen);
const { quantity, decrementQuantity, incrementQuantity } = useQuantity();

const VAT = ref(13.56);
const shippingFee = ref(3.56);

const cartItems = computed(() => store.userCart.items);
const totalAmount = computed(() => store.userCart.totalAmount);
const estimatedTotal = computed(() => store.estimatedTotal);

onMounted(() => {
	store.estimatedTotal = Math.round(
		totalAmount.value + VAT.value + shippingFee.value
	);
});
</script>
