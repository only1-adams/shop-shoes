<template>
	<div class="mt-12">
		<div
			v-if="orders.length <= 0"
			class="flex flex-col items-center justify-center h-[300px]"
		>
			<p
				class="text-[1.7rem] text-customBlack md:w-[60%] lg:w-[40%] text-center"
			>
				You have no order records for this account.
			</p>
			<NuxtLink
				to="/"
				class="mt-8 w-max flex items-center justify-center px-24 py-6 border-[1.5px] border-secondary bg-secondary text-[2rem] font-semibold text-white transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
			>
				Start Shopping
			</NuxtLink>
		</div>
		<div
			v-else
			x-data="orders"
			class="lg:mx-28 xl:mx-64 bg-primaryLight rounded-lg overflow-hidden"
		>
			<div class="w-full flex items-center border-b-[#E3E1E1] border-b">
				<button
					@click="setCurrentOrderTab('completed')"
					:class="
						isCompleted
							? 'bg-secondary font-semibold text-white'
							: 'bg-transparent text-customBlack '
					"
					class="px-12 py-7 text-2xl md:text-[1.7rem]"
				>
					Completed Orders
				</button>
				<button
					@click="setCurrentOrderTab('pending')"
					:class="
						isPending
							? 'bg-secondary font-semibold text-white'
							: 'bg-transparent text-customBlack'
					"
					class="px-12 py-7 text-2xl md:text-[1.7rem]"
				>
					Pending Orders
				</button>
			</div>
			<div v-show="isCompleted" class="mt-12 mb-8 flex flex-col gap-y-8 px-8">
				<template v-for="(order, index) in completedOrders" :key="index">
					<span class="text-3xl font-bold"
						>Order {{ order.transactionRef }}</span
					>
					<template v-for="(product, index) in order.products">
						<div
							class="flex md:items-center flex-col gap-y-5 md:flex-row justify-between"
						>
							<div class="flex gap-x-7 md:max-w-[65%]">
								<img
									class="w-[91px] h-[84px] object-cover"
									:src="`http://localhost:8080/${product.product?.image}`"
									alt=""
								/>
								<div>
									<span class="text-[1.7rem] font-semibold">{{
										product.product.title
									}}</span>
									<div class="mt-4 flex items-center gap-x-5">
										<span class="text-customBlack text-[1.7rem]">$23.45</span>
										<span class="text-red-500 text-[1.7rem] line-through"
											>$23.45</span
										>
									</div>
								</div>
							</div>
							<span
								class="flex items-center justify-center py-6 px-16 border-[1.5px] border-successGreen bg-successGreen text-[1.7rem] text-white transition-all duration-200"
							>
								Completed
							</span>
						</div>
					</template>
				</template>
			</div>
			<div v-show="isPending" class="mt-12 mb-8 flex flex-col gap-y-8 px-8">
				<template v-for="(order, index) in pendingOrders">
					<span class="text-3xl font-bold"
						>Order {{ order.transactionRef }}</span
					>
					<template v-for="(product, index) in order.products" :key="index">
						<div
							class="flex md:items-center flex-col gap-y-5 md:flex-row justify-between"
						>
							<div class="flex gap-x-7 md:max-w-[65%]">
								<img
									class="w-[91px] h-[84px] object-cover"
									:src="`http://localhost:8080/${product.product?.image}`"
									alt=""
								/>
								<div>
									<span class="text-[1.7rem] font-semibold">{{
										product.product.title
									}}</span>
									<div class="mt-4 flex items-center gap-x-5">
										<span class="text-customBlack text-[1.7rem]">&#8358;{{
											product.price.toLocaleString()
										}}</span>
									</div>
								</div>
							</div>
							<span
								class="flex items-center justify-center py-6 px-16 border-[1.5px] border-primary bg-primary text-[1.7rem] text-white transition-all duration-200"
							>
								Pending
							</span>
						</div>
					</template>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup>
import profileStore from "~/store/profile-store";

const config = useRuntimeConfig();
const headers = useRequestHeaders(["cookie"]);
const profile = profileStore();
const currentOrderTab = ref("completed");

const { data } = await useFetch(`${config.public.ENDPOINT_URL}order`, {
	headers: headers,
	credentials: "include",
});

if (data.value.orders) {
	profile.orders = data.value.orders;
}

const isCompleted = computed(() => currentOrderTab.value == "completed");
const isPending = computed(() => currentOrderTab.value == "pending");
const orders = computed(() => profile.orders);
const completedOrders = computed(() =>
	orders.value.filter((order) => order.status === "completed")
);
const pendingOrders = computed(() =>
	orders.value.filter((order) => order.status === "pending")
);

function setCurrentOrderTab(tab) {
	currentOrderTab.value = tab;
}
</script>
