<template>
	<header class="top-0 fixed w-full z-[2]">
		<div
			class="h-[8.5rem] bg-secondary flex items-center justify-between px-8 md:px-[5rem]"
		>
			<NuxtLink :to="{ path: '/' }">
				<div class="flex items-center gap-x-5">
					<img src="/images/stayfabLogo.png" alt="stayfab logo" />
				</div>
			</NuxtLink>
			<ul class="flex items-center gap-x-12 list-none">
				<li>
					<NuxtLink href="/mgr" class="text-2xl font-medium text-white cursor-pointer"
						>Products</NuxtLink
					>
				</li>
				<li>
					<NuxtLink class="text-2xl font-medium text-white cursor-pointer"
						>Carts</NuxtLink
					>
				</li>
				<li>
					<NuxtLink class="text-2xl font-medium text-white cursor-pointer"
						>Orders</NuxtLink
					>
				</li>
				<li>
					<NuxtLink
						href="/mgr/create"
						class="w-full outline-none border-none flex items-center justify-center bg-primary text-white text-2xl font-medium py-6 px-10"
					>
						Add a new product
					</NuxtLink>
				</li>
			</ul>
		</div>
	</header>
</template>
