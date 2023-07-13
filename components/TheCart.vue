<template>
	<div class="flex relative">
		<span
			class="absolute text-[0.9rem] text-white items-center justify-center flex w-[15px] h-[15px] bg-primary rounded-full right-[-5px] pointer-events-none"
		>
			{{ totalItemsInCart }}
		</span>
		<button @click="toggle">
			<svg
				width="20"
				height="22"
				viewBox="0 0 20 22"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M13.6255 9.5V5C13.6255 2.92893 11.9466 1.25 9.87548 1.25C7.80442 1.25 6.12548 2.92893 6.12548 5V9.5M17.4815 7.50723L18.7447 19.5072C18.8146 20.1715 18.2938 20.75 17.6258 20.75H2.12512C1.45721 20.75 0.936382 20.1715 1.0063 19.5072L2.26946 7.50723C2.32973 6.93466 2.81255 6.5 3.38828 6.5H16.3627C16.9384 6.5 17.4212 6.93466 17.4815 7.50723ZM6.50048 9.5C6.50048 9.70711 6.33259 9.875 6.12548 9.875C5.91838 9.875 5.75048 9.70711 5.75048 9.5C5.75048 9.29289 5.91838 9.125 6.12548 9.125C6.33259 9.125 6.50048 9.29289 6.50048 9.5ZM14.0005 9.5C14.0005 9.70711 13.8326 9.875 13.6255 9.875C13.4184 9.875 13.2505 9.70711 13.2505 9.5C13.2505 9.29289 13.4184 9.125 13.6255 9.125C13.8326 9.125 14.0005 9.29289 14.0005 9.5Z"
					:stroke="props.iconStrokeColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
		<Teleport to="#__nuxt">
			<div
				@click="close"
				:class="{
					'opacity-100 pointer-events-auto': isOpen,
					'pointer-events-none opacity-0': !isOpen,
				}"
				class="fixed z-[4] bg-overlayColor top-0 w-full h-full left-0"
			>
				<Teleport to="#__nuxt">
					<CartContent @close="close" :isOpen="isOpen" />
				</Teleport>
			</div>
		</Teleport>
	</div>
</template>

<script setup>
import cartStore from "~/store/cart-store";
import authStore from "~/store/auth-store";

const headers = useRequestHeaders(["cookie"]);

const props = defineProps(["iconStrokeColor"]);

const store = cartStore();
const auth = authStore();
const config = useRuntimeConfig();

const { isOpen, toggle, close } = useToggler();
useBodyOverflow(isOpen);

const { data, refresh } = await useFetch(
	`${config.public.ENDPOINT_URL}cart/user-cart`,
	{
		credentials: "include",
		headers: headers,
		onResponse: ({ response }) => {
			store.$patch((state) => {
				state.userCart.items = response._data.userCart.items;
				state.userCart.totalAmount = response._data.userCart.totalAmount;
			});
			store.cartWasUpdated = false;
		},
		server: false,
	}
);

const totalItemsInCart = computed(() => {
	return store.userCart.items.length;
});

const wasUpdated = computed(() => store.cartWasUpdated);
const isLoggedIn = computed(() => auth.isLoggedIn);

watch(wasUpdated, async (newValue) => {
	if (newValue) {
		await refresh();
	}
});

watch(isLoggedIn, (newValue) => {
	if (!newValue) {
		store.$patch((state) => {
			state.userCart.items = [];
			state.userCart.totalAmount = 0;
		});
	}
});
</script>
