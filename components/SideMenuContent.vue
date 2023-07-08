<template>
	<div
		:class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
		class="w-full md:w-[500px] h-full block lg:hidden overflow-auto bg-white fixed top-[8.5rem] md:right-0 z-[3] p-8 pb-[8.5rem] duration-300 transition-all"
	>
		<div v-show="isSearching" class="w-full flex items-center">
			<SearchInputForm />
			<span
				@click="isSearching = false"
				class="flex items-center justify-center w-[35px] h-[35px] rounded-full"
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
		<div v-show="!isSearching" class="flex items-center gap-x-24 justify-end">
			<span
				@click="isSearching = true"
				class="flex items-center justify-center w-[35px] h-[35px] rounded-full cursor-pointer"
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M8.25 1.5C4.52208 1.5 1.5 4.52208 1.5 8.25C1.5 11.9779 4.52208 15 8.25 15C10.1142 15 11.8006 14.2453 13.023 13.023C14.2453 11.8006 15 10.1142 15 8.25C15 4.52208 11.9779 1.5 8.25 1.5ZM0 8.25C0 3.69365 3.69365 0 8.25 0C12.8063 0 16.5 3.69365 16.5 8.25C16.5 10.2578 15.782 12.0991 14.5899 13.5293L19.2803 18.2197C19.5732 18.5126 19.5732 18.9874 19.2803 19.2803C18.9874 19.5732 18.5126 19.5732 18.2197 19.2803L13.5293 14.5899C12.0991 15.782 10.2578 16.5 8.25 16.5C3.69365 16.5 0 12.8063 0 8.25Z"
						class="fill-black"
					/>
				</svg>
			</span>
			<TheCart icon-stroke-color="black" />
			<TheAccountDropdown v-if="isLoggedIn" icon-stroke-color="black" />
			<NotAuthAccountDropdown v-if="!isLoggedIn" icon-stroke-color="black" />
		</div>
		<div class="mt-16">
			<ul class="w-full flex flex-col items-center justify-center gap-y-6">
				<template
					v-for="(category, index) in categories.categories"
					:key="category.title"
				>
					<li class="w-full border-b border-b-primary py-4">
						<div class="flex items-center justify-between">
							<span class="text-2xl font-medium text-customBlack">{{
								category.title
							}}</span>
							<span>
								<svg
									width="14"
									height="8"
									viewBox="0 0 14 8"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M0.230169 0.209376C0.528748 -0.0777189 1.00353 -0.0684095 1.29063 0.230169L7 6.16792L12.7094 0.230169C12.9965 -0.0684095 13.4713 -0.0777189 13.7698 0.209376C14.0684 0.496471 14.0777 0.971254 13.7906 1.26983L7.54063 7.76983C7.39922 7.91689 7.20401 8 7 8C6.79599 8 6.60078 7.91689 6.45938 7.76983L0.209376 1.26983C-0.0777189 0.971254 -0.0684095 0.496471 0.230169 0.209376Z"
										class="fill-customBlack"
									/>
								</svg>
							</span>
						</div>
					</li>
				</template>
			</ul>
		</div>
		<div v-if="isLoggedIn" class="mt-12">
			<button
				class="text-[1.7rem] font-bold px-8 py-4 rounded-full bg-red-500 text-white"
				@click="logUserOut"
			>
				Log out
			</button>
		</div>
	</div>
</template>

<script setup>
import authStore from "~/store/auth-store";
import rootStore from "~/store/root-store";

const props = defineProps(["isOpen"]);
const emit = defineEmits(["close"]);
const isSearching = ref(false);
const isOpen = computed(() => props.isOpen);

const config = useRuntimeConfig();
const store = authStore();
const root = rootStore();

const { data: categories } = await useFetch(
	`${config.public.ENDPOINT_URL}products/category`
);

const isLoggedIn = computed(() => store.isLoggedIn);

function logUserOut() {
	store.logUserOut(config.public.ENDPOINT_URL, {}, async (message) => {
		emit("close");
		await navigateTo("/");
		root.displayPopup(message, "success");
	});
}
</script>
