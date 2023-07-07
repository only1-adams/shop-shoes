<template>
	<div class="w-full flex flex-col gap-y-7">
		<p class="text-[2rem] font-semibold text-secondary">Delivery Information</p>
		<form class="w-full bg-white p-8">
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
						<option class="text-2xl font-medium" disabled selected value="">
							Select State
						</option>
						<option class="text-2xl font-medium" value="Texas">Texas</option>
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
						<option class="text-2xl font-medium" disabled selected value="">
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
			<div v-if="!addressData.default" class="mb-10 last:mb-0 w-full">
				<label
					class="w-full flex justify-start items-center gap-x-3"
					for="isDefault"
				>
					<input type="checkbox" v-model="addressData.default" id="isDefault" />
					<span class="text-2xl">Make default</span>
				</label>
			</div>
		</form>
	</div>
</template>
<script setup>
import profileStore from "~/store/profile-store";

const emit = defineEmits(["deliveryInfo"]);
const profile = profileStore();
const config = useRuntimeConfig();
const headers = useRequestHeaders(["cookie"]);
const addressList = computed(() => profile.addressList);
const defaultAddress = computed(() => {
	return addressList.value.find((address) => address.default === true);
});

let addressData = reactive({
	name: "",
	email: "",
	phone: "",
	state: "",
	city: "",
	address: "",
	default: false,
});

if (addressList.value.length === 0) {
	const { data } = await useFetch(`${config.public.ENDPOINT_URL}auth/address`, {
		headers: headers,
		credentials: "include",
	});

	if (data.value.addressList) {
		profile.addressList = data.value.addressList.addresses;
	}
}

watch(
	defaultAddress,
	(newvalue) => {
		if (newvalue !== undefined) {
			addressData = reactive({ ...newvalue });
		}
	},
	{ immediate: true }
);

watch(
	addressData,
	async (newvalue) => {
		await nextTick();
		emit("deliveryInfo", newvalue);
	},
	{ immediate: true }
);
</script>
