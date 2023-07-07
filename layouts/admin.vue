<template>
	<div>
		<slot name="loader"></slot>
		<slot name="alert"></slot>
		<AdminHeader />
		<main class="pt-[8.5rem]">
			<slot></slot>
		</main>
	</div>
</template>
