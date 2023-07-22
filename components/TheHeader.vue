<template>
	<ClientOnly>
		<template #fallback>
			<header class="top-0 fixed w-full z-[2] h-[8.5rem] bg-secondary">
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
						<TheCart icon-stroke-color="white" />
						<span>
							<svg
								width="17"
								height="22"
								viewBox="0 0 17 22"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M11.9998 5C11.9998 7.07107 10.3209 8.75 8.24984 8.75C6.17877 8.75 4.49984 7.07107 4.49984 5C4.49984 2.92893 6.17877 1.25 8.24984 1.25C10.3209 1.25 11.9998 2.92893 11.9998 5Z"
									stroke="white"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M0.750977 19.1182C0.821282 15.0369 4.15171 11.75 8.24984 11.75C12.3481 11.75 15.6786 15.0371 15.7487 19.1185C13.4659 20.166 10.9262 20.75 8.25016 20.75C5.57384 20.75 3.03394 20.1659 0.750977 19.1182Z"
									stroke="white"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</span>
					</div>
				</div>
			</header>
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
					<!-- <SearchInputForm v-if="isLoggedIn" /> -->
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

const isLoggedIn = computed(() => store.isLoggedIn);
</script>
