<template>
	<div
		:class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
		class="w-full md:w-[500px] h-full block lg:hidden overflow-auto bg-white fixed top-[13.5rem] md:right-0 z-[3] p-8 pb-[8.5rem] duration-300 transition-all"
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
			<div class="flex relative">
				<span
					class="absolute text-[0.9rem] text-white items-center justify-center flex w-[15px] h-[15px] bg-primary rounded-full right-[-5px] pointer-events-none"
				>
					2
				</span>
				<button>
					<svg
						width="20"
						height="22"
						viewBox="0 0 20 22"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M13.6255 9.5V5C13.6255 2.92893 11.9466 1.25 9.87548 1.25C7.80442 1.25 6.12548 2.92893 6.12548 5V9.5M17.4815 7.50723L18.7447 19.5072C18.8146 20.1715 18.2938 20.75 17.6258 20.75H2.12512C1.45721 20.75 0.936382 20.1715 1.0063 19.5072L2.26946 7.50723C2.32973 6.93466 2.81255 6.5 3.38828 6.5H16.3627C16.9384 6.5 17.4212 6.93466 17.4815 7.50723ZM6.50048 9.5C6.50048 9.70711 6.33259 9.875 6.12548 9.875C5.91838 9.875 5.75048 9.70711 5.75048 9.5C5.75048 9.29289 5.91838 9.125 6.12548 9.125C6.33259 9.125 6.50048 9.29289 6.50048 9.5ZM14.0005 9.5C14.0005 9.70711 13.8326 9.875 13.6255 9.875C13.4184 9.875 13.2505 9.70711 13.2505 9.5C13.2505 9.29289 13.4184 9.125 13.6255 9.125C13.8326 9.125 14.0005 9.29289 14.0005 9.5Z"
							stroke="black"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			</div>
			<div class="cursor-pointer relative">
				<svg
					width="17"
					height="22"
					viewBox="0 0 17 22"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M11.9998 5C11.9998 7.07107 10.3209 8.75 8.24984 8.75C6.17877 8.75 4.49984 7.07107 4.49984 5C4.49984 2.92893 6.17877 1.25 8.24984 1.25C10.3209 1.25 11.9998 2.92893 11.9998 5Z"
						stroke="black"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M0.750977 19.1182C0.821282 15.0369 4.15171 11.75 8.24984 11.75C12.3481 11.75 15.6786 15.0371 15.7487 19.1185C13.4659 20.166 10.9262 20.75 8.25016 20.75C5.57384 20.75 3.03394 20.1659 0.750977 19.1182Z"
						stroke="black"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
		</div>
		<div class="mt-16">
			<ul class="w-full flex flex-col items-center justify-center gap-y-6">
				<li class="w-full border-b border-b-primary py-4">
					<div class="flex items-center justify-between">
						<span class="text-2xl font-medium text-customBlack">New In</span>
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
				<li class="w-full border-b border-b-primary py-4">
					<div class="flex items-center justify-between">
						<span class="text-2xl font-medium text-customBlack">Women</span>
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
				<li class="w-full border-b border-b-primary py-4">
					<div class="flex items-center justify-between">
						<span class="text-2xl font-medium text-customBlack">Men</span>
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
				<li class="w-full border-b border-b-primary py-4">
					<div class="flex items-center justify-between">
						<span class="text-2xl font-medium text-customBlack">Beauty</span>
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
				<li class="w-full border-b border-b-primary py-4">
					<a href="">
						<span class="text-2xl font-medium text-customBlack">Wellness</span>
					</a>
				</li>
				<li class="w-full border-b border-b-primary py-4">
					<a href="">
						<span class="text-2xl font-medium text-customBlack">Sales</span>
					</a>
				</li>
			</ul>
		</div>
		<div class="mt-12">
			<a
				class="text-[1.7rem] font-bold px-8 py-4 rounded-full bg-red-500 text-white"
				href=""
				>Log out</a
			>
		</div>
	</div>
</template>

<script setup>
const props = defineProps(["isOpen"]);
const isSearching = ref(false);
const isOpen = computed(() => props.isOpen);
</script>
