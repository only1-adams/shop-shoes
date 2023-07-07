<template>
	<Transition name="fade">
		<slot></slot>
	</Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.fade-leave-from,
.fade-enter-to {
	opacity: 1;
}
</style>
