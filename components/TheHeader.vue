<template>
	<header class="top-0 fixed w-full z-[2]">
		<!-- <TheCountdown /> -->
		<div
			class="h-[8.5rem] bg-secondary flex items-center justify-between px-8 md:px-[5rem]"
		>
			<NuxtLink :to="{ path: '/' }">
				<div class="flex items-center gap-x-5">
					<img src="/images/stayfabLogo.png" alt="stayfab logo" />
				</div>
			</NuxtLink>
			<TheSideMenu />
			<div class="hidden lg:flex items-center gap-x-16">
				<SearchInputForm v-if="isLoggedIn" />
				<TheCart @click="logValue" icon-stroke-color="white" />
				<TheAccountDropdown v-if="isLoggedIn" icon-stroke-color="white" />
				<NotAuthAccountDropdown v-if="!isLoggedIn" icon-stroke-color="white" />
			</div>
		</div>
	</header>
</template>

<script setup>
import authStore from "~/store/auth-store";
const store = authStore();
const isLoggedIn = ref(false);

const storeIsLoggedIn = computed(() => store.isLoggedIn);

function logValue() {
	console.log(isLoggedIn.value);
}

watch(
	storeIsLoggedIn,
	(newValue) => {
		if (newValue) {
			isLoggedIn.value = newValue;
		}
	},
	{ immediate: true }
);
</script>
