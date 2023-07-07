<template>
	<li ref="dropdownRef" class="cursor-pointer relative">
		<div @click="toggle" class="flex items-center gap-x-5">
			<span>{{ props.title }}</span>
		</div>
	</li>
</template>

<script setup>
const props = defineProps(["title"]);
</script>
