<template>
	<li ref="dropdownRef" class="cursor-pointer relative">
		<slot :title="props.title">
			<div @click="toggle" class="flex items-center gap-x-5">
				<span>{{ props.title }}</span>
			</div>
		</slot>
	</li>
</template>

<script setup>
const props = defineProps(["title"]);
</script>
