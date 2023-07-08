<template>
	<div class="block lg:hidden">
		<span
			@click="toggle"
			class="flex w-[35px] h-[35px] items-center justify-center rounded-full"
		>
			<svg
				v-show="!open"
				width="24"
				height="18"
				viewBox="0 0 19 13"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1 1H17.5M1 6.25H17.5M9.25 11.5H17.5"
					class="stroke-white"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<svg
				v-show="open"
				width="22"
				height="22"
				viewBox="0 0 22 22"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1 21L21 1M1 1L21 21"
					class="stroke-white"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</span>
		<Teleport to="body">
			<SideMenuContent @close="close" :isOpen="open" />
		</Teleport>
	</div>
</template>

<script setup>
const { isOpen: open, toggle, close } = useToggler();
</script>
