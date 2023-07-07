<template>
	<span
		class="loader"
		:style="{
			width: width,
			height: height,
		}"
	></span>
</template>
<script setup>
const props = defineProps(["width", "height"]);

const width = computed(() => props.width);
const height = computed(() => props.height);
</script>
