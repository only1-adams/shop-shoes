<template>
	<div>
		<slot name="loader"></slot>
		<slot name="alert"></slot>
		<TheHeader />
		<main class="pt-[8.5rem]">
			<TheCategories />
			<slot></slot>
		</main>
	</div>
</template>

<script setup>
import rootStore from "~/store/root-store";
</script>
