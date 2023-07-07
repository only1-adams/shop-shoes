const cartStore = defineStore("user-cart", () => {
	const userCart = reactive({
		items: [],
		totalAmount: 0,
	});
	const cartWasUpdated = ref(false);
	const estimatedTotal = ref(0);

	async function addToCart(baseUrl, productId, action, csrfToken) {
		const response = await fetch(`${baseUrl}cart/add`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				"x-csrf-token": csrfToken,
			},
			body: JSON.stringify({ productId: productId, action }),
		});

		const responseData = await response.json();

		if (!response.ok) {
			throw new Error("An error occurred while adding the product");
		}

		return responseData.message;
	}

	return {
		addToCart,
		userCart,
		cartWasUpdated,
		estimatedTotal,
	};
});
export default cartStore;
