<template>
	<section
		class="relative px-4 md:px-0 py-12 bg-primaryLight lg:px-[3rem] xl:px-[5rem] flex flex-col items-center lg:items-start gap-10 lg:flex-row"
	>
		<LoadingOverlay v-if="isVerifying" />
		<div class="flex flex-col gap-y-10 md:w-[80%] lg:w-[55%]">
			<TheDeliveryInformation
				@delivery-info="(e) => (deliveryInformation = e)"
			/>
		</div>
		<div class="md:w-[80%] lg:w-[45%]">
			<TheOrderSummary @make-payment="makePayment" />
		</div>
	</section>
</template>
<script setup>
import cartStore from "~/store/cart-store";
import authStore from "~/store/auth-store";
import rootStore from "~/store/root-store";

definePageMeta({
	requiresAuth: true,
	middleware: ["auth"],
});

const config = useRuntimeConfig();
const cart = cartStore();
const auth = authStore();
const root = rootStore();
const deliveryInformation = ref({});
const isVerifying = ref(false);

async function verifyPayment(response) {
	try {
		const data = await $fetch(`${config.public.ENDPOINT_URL}order/verify`, {
			method: "POST",
			credentials: "include",
			body: {
				transactionRef: response.reference,
				estimatedTotal: cart.estimatedTotal,
			},
			headers: {
				"x-csrf-token": auth.csrf,
			},
		});

		isVerifying.value = false;
		//clear the user cart
		cart.$patch((state) => {
			state.userCart.items = [];
			state.userCart.totalAmount = 0;
		});

		await navigateTo("/account/orders");
		root.displayPopup(data.message, "success");
	} catch (error) {
		isVerifying.value = false;
		root.displayPopup(error.data.message || error.message, "error");
	}
}

function makePayment() {
	const handler = PaystackPop.setup({
		key: "pk_test_7bdae6525665b367982c4058c109e38f4e60b11f",
		email: deliveryInformation.value.email,
		amount: cart.estimatedTotal * 100,
		currency: "NGN",
		metadata: {
			orderItems: cart.userCart.items,
		},
		callback: function (response) {
			isVerifying.value = true;
			verifyPayment(response);
		},
		onClose: function () {
			root.displayPopup("Transaction could not be completed.", "error");
		},
	});
	handler.openIframe();
}
</script>
