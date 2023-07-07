<template>
	<FadeAnimation>
		<div
			v-show="show"
			class="w-[90%] md:w-[30%] text-center text-2xl font-medium text-white py-6 px-2 fixed top-[10%] left-0 right-0 m-auto z-[9999999]"
			:class="props.type === 'error' ? 'bg-red-400' : 'bg-primary'"
		>
			<p>{{ props.message }}</p>
		</div>
	</FadeAnimation>
</template>

<script setup>
const props = defineProps(["show", "message", "type"]);
const show = computed(() => props.show);
</script>
