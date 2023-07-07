<template>
	<div class="overflow-auto">
		<div
			class="mt-12 flex items-center gap-x-5 border-b border-b-primary w-max"
		>
			<NuxtLink
				to="/account/profile"
				class="bg-[#F6F4F5] text-[#9A999A] shrink-0 cursor-pointer text-[1.5rem] md:text-[1.7rem] px-9 py-6"
				exact-active-class="bg-primary text-white font-semibold"
				>My Profile</NuxtLink
			>
			<NuxtLink
				to="/account/address"
				class="bg-[#F6F4F5] text-[#9A999A] shrink-0 cursor-pointer text-[1.5rem] md:text-[1.7rem] px-9 py-6"
				exact-active-class="bg-primary text-white font-semibold"
				>Saved Addresses</NuxtLink
			>
			<NuxtLink
				to="/account/orders"
				class="bg-[#F6F4F5] text-[#9A999A] shrink-0 cursor-pointer text-[1.5rem] md:text-[1.7rem] px-9 py-6"
				exact-active-class="bg-primary text-white font-semibold"
				>Orders</NuxtLink
			>
		</div>
	</div>
</template>

<script setup></script>
