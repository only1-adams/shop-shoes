<template>
	<div class="cursor-pointer relative">
		<button
			@click="toggle"
			v-if="!props.isEditing"
			class="mt-8 w-max flex items-center justify-center px-24 py-6 border-[1.5px] border-secondary bg-secondary text-[2rem] font-semibold text-white transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
		>
			Add a new address
		</button>
		<button
			@click="toggle"
			v-if="props.isEditing"
			class="w-full flex items-center justify-center py-6 px-16 border-[1.5px] border-primary bg-transparent text-[1.7rem] text-primary transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
		>
			Edit
		</button>
		<Teleport to="body">
			<div
				v-show="isOpen"
				@click="close"
				class="fixed z-[4] bg-overlayColor top-0 w-full h-full left-0"
			>
				<Teleport to="body">
					<div
						v-if="isOpen"
						class="fixed top-0 md:top-[5%] left-0 right-0 m-auto z-[5] w-full h-full md:w-[612px] md:h-[500px] bg-white rounded-lg p-8 overflow-auto"
					>
						<LoadingOverlay v-if="isAdding" />
						<div class="flex items-center justify-between">
							<span class="text-[2rem] font-semibold text-secondary"
								>Add a new address</span
							>
							<span
								@click="close"
								class="cursor-pointer flex items-center justify-center w-[35px] h-[35px] rounded-full"
							>
								<svg
									width="22"
									height="22"
									viewBox="0 0 22 22"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1 21L21 1M1 1L21 21"
										stroke="#0F172A"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</span>
						</div>
						<form @submit.prevent="addAddress" class="w-full mt-8" action="">
							<div class="flex justify-between gap-x-8 mb-10 last:mb-0">
								<div class="flex grow flex-col gap-y-6">
									<label
										for="address_name"
										class="text-2xl font-medium text-customBlack"
										>Name</label
									>
									<div
										class="w-full border-[1.5px] border-[#D2D1D1] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
									>
										<input
											class="text-2xl border-none outline-none grow w-[90%] h-full bg-transparent"
											type="text"
											placeholder="Name"
											name="address_name"
											id="address_name"
											v-model="addressData.name"
										/>
									</div>
								</div>
								<div class="flex grow flex-col gap-y-6">
									<label
										for="address_phone"
										class="text-2xl font-medium text-customBlack"
										>Phone Number</label
									>
									<div
										class="w-full border-[1.5px] border-[#D2D1D1] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
									>
										<input
											class="text-2xl border-none outline-none grow w-[90%] h-full bg-transparent"
											type="text"
											placeholder="Phone Number"
											name="address_phone"
											id="address_phone"
											v-model="addressData.phone"
										/>
									</div>
								</div>
							</div>
							<div class="mb-10 last:mb-0">
								<div class="flex grow flex-col gap-y-6">
									<label
										for="address_email"
										class="text-2xl font-medium text-customBlack"
										>Email</label
									>
									<div
										class="w-full border-[1.5px] border-[#D2D1D1] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
									>
										<input
											class="text-2xl border-none outline-none grow w-[90%] h-full bg-transparent"
											type="email"
											placeholder="Email"
											name="address_email"
											id="address_email"
											v-model="addressData.email"
										/>
									</div>
								</div>
							</div>
							<div class="flex justify-between gap-x-8 mb-10 last:mb-0">
								<div class="flex grow flex-col gap-y-6">
									<label
										for="address_state"
										class="text-2xl font-medium text-customBlack"
										>State</label
									>
									<select
										class="text-2xl font-medium w-full outline-none border-[1.5px] border-[#D2D1D1] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
										name="address_state"
										id="address_state"
										v-model="addressData.state"
									>
										<option
											class="text-2xl font-medium"
											disabled
											selected
											value=""
										>
											Select State
										</option>
										<option class="text-2xl font-medium" value="Texas">
											Texas
										</option>
									</select>
								</div>
								<div class="flex grow flex-col gap-y-6">
									<label
										for="address_city"
										class="text-2xl font-medium text-customBlack"
										>City</label
									>
									<select
										class="text-2xl font-medium w-full outline-none border-[1.5px] border-[#D2D1D1] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
										name="address_city"
										id="address_city"
										v-model="addressData.city"
									>
										<option
											class="text-2xl font-medium"
											disabled
											selected
											value=""
										>
											Select City
										</option>
										<option class="text-2xl font-medium" value="Houston">
											Houston
										</option>
									</select>
								</div>
							</div>
							<div class="mb-10 last:mb-0">
								<div class="flex grow flex-col gap-y-6">
									<label
										for="address_address"
										class="text-2xl font-medium text-customBlack"
										>Address</label
									>
									<div
										class="w-full border-[1.5px] border-[#D2D1D1] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
									>
										<input
											class="text-2xl border-none outline-none grow w-[90%] h-full bg-transparent"
											type="address"
											placeholder="Address"
											name="address_address"
											id="address_address"
											v-model="addressData.address"
										/>
									</div>
								</div>
							</div>
							<div class="mb-10 last:mb-0 w-full">
								<label
									class="w-full flex justify-start items-center gap-x-3"
									for="isDefault"
								>
									<input
										type="checkbox"
										v-model="addressData.default"
										id="isDefault"
									/>
									<span class="text-2xl">Make default</span>
								</label>
							</div>
							<div :class="isAdding && 'pointer-event-none'">
								<button
									type="submit"
									class="mt-8 w-full flex items-center justify-center py-6 border-[1.5px] border-secondary bg-secondary text-[1.7rem] font-semibold text-white transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white disabled:opacity-60 disabled:hover:bg-secondary"
									:disabled="isAdding"
								>
									Save Address
								</button>
							</div>
						</form>
					</div>
				</Teleport>
			</div>
		</Teleport>
	</div>
</template>

<script setup>
import authStore from "~/store/auth-store";
import rootStore from "~/store/root-store";
import profileStore from "~/store/profile-store";

const props = defineProps(["isEditing", "addressId"]);
const { isOpen, toggle, close } = useToggler();
const isAdding = ref(false);
const config = useRuntimeConfig();
const auth = authStore();
const root = rootStore();
const profile = profileStore();

let addressData = reactive({
	name: "",
	email: "",
	phone: "",
	state: "",
	city: "",
	address: "",
	default: false,
});

onMounted(() => {
	if (props.isEditing) {
		const foundAddress = profile.addressList.find(
			(address) => address._id === props.addressId
		);

		addressData = reactive({ ...foundAddress });
	}
});

async function addAddress() {
	const url = props.isEditing
		? `${config.public.ENDPOINT_URL}auth/address/${props.addressId}`
		: `${config.public.ENDPOINT_URL}auth/address`;

	try {
		isAdding.value = true;
		const data = await $fetch(url, {
			method: props.isEditing ? "PUT" : "POST",
			credentials: "include",
			body: addressData,
			headers: {
				"x-csrf-token": auth.csrf,
			},
		});

		profile.addressList = data.addressList.addresses;
		isAdding.value = false;
		close();
		root.displayPopup(data.message, "success");
	} catch (error) {
		root.displayPopup(error?.data?.message || error?.message, "error");
		isAdding.value = false;
	}
}
</script>
