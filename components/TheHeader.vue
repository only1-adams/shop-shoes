<template>
	<ClientOnly>
		<template #fallback>
			<header class="top-0 fixed w-full z-[2] h-[8.5rem] bg-secondary"></header>
		</template>
		<header class="top-0 fixed w-full z-[2]">
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
					<TheCart icon-stroke-color="white" />
					<TheAccountDropdown v-show="isLoggedIn" icon-stroke-color="white" />
					<NotAuthAccountDropdown
						v-show="!isLoggedIn"
						icon-stroke-color="white"
					/>
				</div>
			</div>
		</header>
	</ClientOnly>
</template>

<script setup>
import authStore from "~/store/auth-store";
const store = authStore();
const auth = useAuth();

const isLoggedIn = computed(() => store.isLoggedIn);
const authValue = computed(() => auth.value);

onMounted(() => {
	console.log(isLoggedIn.value);
	console.log(authValue.value);
});
</script>
