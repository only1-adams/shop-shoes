<template>
	<form
		v-show="props.currentTab === 'signin'"
		@submit.prevent="loginUser"
		class="flex mt-12 flex-col gap-y-8 relative"
	>
		<LoadingOverlay v-if="isPending" />
		<div class="flex flex-col gap-y-6">
			<label for="login_email" class="text-2xl font-medium text-customBlack"
				>Email Address</label
			>
			<div
				class="w-full border-[1.5px] bg-[#F6F2F3] border-[#F6F2F3] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
			>
				<input
					class="text-2xl border-none outline-none grow w-[90%] h-full bg-transparent"
					type="email"
					placeholder="Email Address"
					v-model="signinData.email"
					name="login_email"
					id="login_email"
				/>
			</div>
		</div>
		<div class="flex flex-col gap-y-6">
			<label for="login_password" class="text-2xl font-medium text-customBlack"
				>Password</label
			>
			<div
				class="w-full border-[1.5px] bg-[#F6F2F3] border-[#F6F2F3] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
			>
				<input
					class="text-2xl border-none outline-none grow w-[90%] h-full bg-transparent"
					type="password"
					placeholder="Password"
					v-model="signinData.password"
					name="login_password"
					id="login_password"
				/>
			</div>
		</div>
		<div>
			<button
				type="submit"
				class="w-full outline-none border-none flex items-center justify-center bg-primary text-white text-2xl font-medium py-6"
			>
				Sign In
			</button>
		</div>
	</form>
</template>

<script setup>
import authStore from "~/store/auth-store";
import rootStore from "~/store/root-store";
import cartStore from "~/store/cart-store";

const emit = defineEmits(["close"]);
const props = defineProps(["currentTab"]);
const config = useRuntimeConfig();
const store = authStore();
const root = rootStore();
const cart = cartStore();

const isPending = ref(false);

const signinData = reactive({
	email: "",
	password: "",
});

async function loginUser() {
	try {
		isPending.value = true;

		const response = await fetch(`${config.public.ENDPOINT_URL}auth/signin`, {
			method: "POST",
			credentials: "include",
			body: JSON.stringify({
				email: signinData.email,
				password: signinData.password,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message);
		}

		store.authenticateUser(data.csrfToken, data.role);

		isPending.value = false;
		root.displayPopup("You are now logged in", "success");
		emit("close");

		// if (data.role !== "admin") {

		// } else {
		// 	await navigateTo("/mgr");
		// }

		cart.cartWasUpdated = true;
	} catch (error) {
		isPending.value = false;
		const message = error.message;
		store.displayError(message);
	}
}
</script>
