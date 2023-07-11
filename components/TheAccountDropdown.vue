<template>
	<div ref="dropdownContainerRef" class="cursor-pointer relative">
		<span @click="toggle">
			<svg
				width="17"
				height="22"
				viewBox="0 0 17 22"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M11.9998 5C11.9998 7.07107 10.3209 8.75 8.24984 8.75C6.17877 8.75 4.49984 7.07107 4.49984 5C4.49984 2.92893 6.17877 1.25 8.24984 1.25C10.3209 1.25 11.9998 2.92893 11.9998 5Z"
					:stroke="props.iconStrokeColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M0.750977 19.1182C0.821282 15.0369 4.15171 11.75 8.24984 11.75C12.3481 11.75 15.6786 15.0371 15.7487 19.1185C13.4659 20.166 10.9262 20.75 8.25016 20.75C5.57384 20.75 3.03394 20.1659 0.750977 19.1182Z"
					:stroke="props.iconStrokeColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</span>
		<FadeAnimation>
			<div
				v-show="isOpen"
				class="shadow-dropdown rounded-lg absolute w-[200px] right-0 top-[110%] bg-white p-5"
			>
				<ul class="flex flex-col gap-y-3">
					<li class="w-full">
						<NuxtLink
							@click="close()"
							class="flex items-center gap-x-3 py-3 px-3 transition-all hover:bg-primaryLight"
							:to="{ path: '/account/profile' }"
						>
							<i class="fa-solid fa-user text-2xl text-secondary"></i>
							<span class="text-[1.5rem] text-secondary">My Profile</span>
						</NuxtLink>
					</li>
					<li class="w-full">
						<NuxtLink
							@click="close()"
							class="flex items-center gap-x-3 py-3 px-3 transition-all hover:bg-primaryLight"
							:to="{ path: '/mgr' }"
						>
							<i class="fa-solid fa-user text-2xl text-secondary"></i>
							<span class="text-[1.5rem] text-secondary">Admin</span>
						</NuxtLink>
					</li>
					<li @click="logUserOut" class="w-full">
						<span
							class="flex items-center gap-x-3 py-3 px-3 transition-all hover:bg-primaryLight"
							href=""
						>
							<i
								class="fa-solid fa-right-from-bracket text-2xl text-secondary"
							></i>
							<span class="text-[1.5rem] text-secondary">Log out</span>
						</span>
					</li>
				</ul>
			</div>
		</FadeAnimation>
	</div>
</template>

<script setup>
import authStore from "~/store/auth-store";
import rootStore from "~/store/root-store";

const props = defineProps(["iconStrokeColor"]);

const config = useRuntimeConfig();
const { isOpen, toggle, close } = useToggler();
const dropdownContainerRef = ref(null);
onClickOutside(dropdownContainerRef, () => {
	close();
});


const store = authStore();
const root = rootStore();

function logUserOut() {
	store.logUserOut(config.public.ENDPOINT_URL, {}, async (message) => {
		close();
		await navigateTo("/");
		root.displayPopup(message, "success");
	});
}
</script>
