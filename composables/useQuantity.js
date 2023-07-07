export default function useQuantity() {
	const quantity = ref(1);

	function decrementQuantity() {
		if (quantity.value === 1) {
			return;
		}

		quantity.value--;
	}

	function incrementQuantity() {
		quantity.value++;
	}

	function setQuantity(value) {
		quantity.value = value;
	}

	return { quantity, decrementQuantity, incrementQuantity, setQuantity };
}
