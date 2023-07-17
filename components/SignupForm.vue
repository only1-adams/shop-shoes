<template>
	<form
		@submit.prevent="signupUser"
		v-show="currentTab === 'signup'"
		:class="isPending && 'opacity-5'"
		class="flex mt-12 flex-col gap-y-8 relative"
	>
		<LoadingOverlay v-if="isPending" />
		<div class="flex flex-col gap-y-6">
			<label for="signup_name" class="text-2xl font-medium text-customBlack"
				>Full Name</label
			>
			<div
				class="w-full border-[1.5px] bg-[#F6F2F3] border-[#F6F2F3] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
			>
				<input
					class="text-2xl border-none outline-none grow w-[90%] h-full bg-transparent"
					type="text"
					id="signup_name"
					placeholder="Full Name"
					v-model="signupData.name"
				/>
			</div>
			<div v-show="errors['name'].length > 0" class="flex flex-col gap-y-2">
				<span
					v-for="(error, index) in errors['name']"
					:key="index"
					class="text-red-500 text-xl"
					>{{ error }}</span
				>
			</div>
		</div>
		<div class="flex flex-col gap-y-6">
			<label for="signup_email" class="text-2xl font-medium text-customBlack"
				>Email Address</label
			>
			<div
				class="w-full border-[1.5px] bg-[#F6F2F3] border-[#F6F2F3] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
			>
				<input
					class="text-2xl border-none outline-none grow w-[90%] h-full bg-transparent"
					type="email"
					id="signup_email"
					placeholder="Email Address"
					v-model="signupData.email"
				/>
			</div>
			<div v-show="errors['email'].length > 0" class="flex flex-col gap-y-2">
				<span
					v-for="(error, index) in errors['email']"
					:key="index"
					class="text-red-500 text-xl"
					>{{ error }}</span
				>
			</div>
		</div>
		<div class="flex flex-col gap-y-6">
			<label for="signup_phone" class="text-2xl font-medium text-customBlack"
				>Phone number</label
			>
			<div
				class="w-full border-[1.5px] bg-[#F6F2F3] border-[#F6F2F3] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
			>
				<input
					class="text-2xl border-none outline-none grow w-[90%] h-full bg-transparent"
					type="phone"
					id="signup_phone"
					placeholder="Phone Number"
					v-model="signupData.phone"
				/>
			</div>
			<div v-show="errors['phone'].length > 0" class="flex flex-col gap-y-2">
				<span
					v-for="(error, index) in errors['phone']"
					:key="index"
					class="text-red-500 text-xl"
					>{{ error }}</span
				>
			</div>
		</div>
		<div class="flex flex-col gap-y-6">
			<label for="signup_password" class="text-2xl font-medium text-customBlack"
				>Password</label
			>
			<div
				class="w-full border-[1.5px] bg-[#F6F2F3] border-[#F6F2F3] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
			>
				<input
					class="text-2xl border-none outline-none grow w-[90%] h-full bg-transparent"
					type="password"
					id="signup_password"
					placeholder="Password"
					v-model="signupData.password"
				/>
			</div>
			<div v-show="errors['password'].length > 0" class="flex flex-col gap-y-2">
				<span
					v-for="(error, index) in errors['password']"
					:key="index"
					class="text-red-500 text-xl"
					>{{ error }}</span
				>
			</div>
		</div>
		<div>
			<button
				type="submit"
				class="w-full outline-none border-none flex items-center justify-center bg-primary text-white text-2xl font-medium py-6"
			>
				Create Account
			</button>
		</div>
	</form>
</template>

<script setup>
import authStore from "~/store/auth-store";
import rootStore from "~/store/root-store";
const props = defineProps(["currentTab"]);
const emit = defineEmits(["signedup"]);
const config = useRuntimeConfig();
const store = authStore();
const root = rootStore();
const isPending = ref(false);

const signupData = reactive({
	email: "",
	password: "",
	name: "",
	phone: "",
});

const errors = reactive({
	email: ref([]),
	password: ref([]),
	name: ref([]),
	phone: ref([]),
});

function showValidationErrors(errorsArray) {
	for (const key in errors) {
		errorsArray.forEach((error) => {
			if (error.path === key) {
				errors[key].push(error.msg);
			}
		});
	}
}

function clearValidationErrors() {
	for (const key in errors) {
		errors[key].length = 0;
	}
}

async function signupUser() {
	try {
		isPending.value = true;
		clearValidationErrors();

		const data = await $fetch(`${config.public.ENDPOINT_URL}auth/signup`, {
			method: "POST",
			body: signupData,
		});

		//Login the user after successful signup
		const loggedInData = await $fetch(
			`${config.public.ENDPOINT_URL}auth/signin`,
			{
				method: "POST",
				body: { email: signupData.email, password: signupData.password },
				credentials: "include",
			}
		);

		store.authenticateUser(loggedInData.csrfToken, loggedInData.role);
		isPending.value = false;
		emit("signedup");
		root.displayPopup(data.message, "success");
	} catch (error) {
		isPending.value = false;
		store.displayError(error.data.message || error.message);
		showValidationErrors(error.data.errors);
	}
}
</script>
