<template>
	<div class="mt-12">
		<div
			v-if="addressList.length === 0"
			class="flex flex-col items-center justify-center h-[400px]"
		>
			<p
				class="text-[1.7rem] text-customBlack md:w-[60%] lg:w-[40%] text-center"
			>
				You have no saved addresses. Addresses used during checkout will be
				saved here.
			</p>
			<AddressModal :is-editing="false" />
		</div>
		<div
			v-if="addressList.length > 0"
			class="flex flex-col gap-y-7 items-center md:items-end lg:mx-28 xl:mx-64"
		>
			<AddressModal :is-editing="false" />
			<div class="bg-primaryLight w-full rounded-lg">
				<p class="text-[2.5rem] p-8 text-secondary border-b border-b-[#FFD6DF]">
					Saved Addresses
				</p>
				<div class="flex flex-col gap-y-8 px-8">
					<template v-for="address in addressList" :key="address._id">
						<div
							class="py-10 last:border-0 border-b border-b-primary flex flex-col gap-y-10 md:flex-row justify-between"
						>
							<div class="md:w-[40%]">
								<span
									v-if="address.default"
									class="text-[1.7rem] font-semibold text-customBlack"
									>Default Address</span
								>
								<div class="flex flex-col gap-y-3 mt-3">
									<span class="flex text-[1.7rem] text-customBlack">{{
										address.name
									}}</span>
									<span class="flex text-[1.7rem] text-customBlack">{{
										address.address
									}}</span>
									<span class="flex text-[1.7rem] text-customBlack"
										>{{ address.state }} {{ address.city }}</span
									>
									<span class="flex text-[1.7rem] text-customBlack">{{
										address.phone
									}}</span>
									<span class="flex text-[1.7rem] text-customBlack">{{
										address.email
									}}</span>
								</div>
							</div>
							<div class="flex gap-x-5 md:flex-col gap-y-5">
								<AddressModal :is-editing="true" :address-id="address._id" />
								<form @submit.prevent="deleteAddress(address._id)">
									<button
										type="submit"
										class="w-full flex items-center justify-center py-6 px-16 border-[1.5px] border-primary bg-transparent text-[1.7rem] text-primary transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
									>
										Delete
									</button>
								</form>
							</div>
						</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import profileStore from "~/store/profile-store";
import authStore from "~/store/auth-store";
import rootStore from "~/store/root-store";

const config = useRuntimeConfig();
const headers = useRequestHeaders(["cookie"]);
const store = profileStore();
const auth = authStore();
const root = rootStore();

const { data } = await useFetch(`${config.public.ENDPOINT_URL}auth/address`, {
	headers: headers,
	credentials: "include",
});

if (data.value.addressList) {
	store.addressList = data.value.addressList.addresses;
} else {
	store.addressList = [];
}

async function deleteAddress(addressId) {
	try {
		const data = await $fetch(
			`${config.public.ENDPOINT_URL}auth/address/${addressId}`,
			{
				method: "DELETE",
				credentials: "include",
				headers: {
					"x-csrf-token": auth.csrf,
				},
			}
		);
		store.addressList = data.addressList.addresses;
		root.displayPopup(data.message, "success");
	} catch (error) {
		root.displayPopup(error.data.message || error.message, "error");
	}
}

const addressList = computed(() => store.addressList);
</script>
