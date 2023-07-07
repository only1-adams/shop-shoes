export default function useToggler() {
	const open = ref(false);
	const isOpen = computed(() => open.value);
	function toggle() {
		open.value = !open.value;
	}

	function close() {
		open.value = false;
	}

	return { isOpen, toggle, close };
}
