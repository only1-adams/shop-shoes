<template>
	<div
		class="mt-12 flex flex-col items-center lg:items-start lg:flex-row gap-x-10 gap-y-10"
	>
		<div class="w-full md:w-[80%] lg:w-1/2">
			<p class="text-[2rem] font-semibold text-customBlack">Sign In Info</p>
			<div class="mt-7 bg-primaryLight p-8">
				<form action="" class="flex mt-12 flex-col gap-y-8">
					<div class="flex flex-col gap-y-6">
						<label
							for="profile_email"
							class="text-2xl font-medium text-customBlack"
							>Email Address</label
						>
						<div
							class="w-full border-[1.5px] bg-transparent border-[#D2D1D1] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
						>
							<input
								class="text-2xl border-none outline-none grow w-[90%] h-full bg-transparent"
								type="email"
								placeholder="Email Address"
								name="profile-email"
								v-model="email"
								id="profile_email"
								readonly
							/>
						</div>
					</div>
					<div class="flex flex-col gap-y-6">
						<label
							for="profile-password"
							class="text-2xl font-medium text-customBlack"
							>Password</label
						>
						<div
							class="w-full border-[1.5px] bg-transparent border-[#D2D1D1] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
						>
							<input
								class="text-2xl border-none outline-none grow w-[90%] h-full bg-transparent"
								type="password"
								value="random-password-gotcha-haha"
								placeholder="Password"
								name="profile-password"
								id="profile-password"
								readonly
							/>
						</div>
					</div>
					<div>
						<button
							class="w-full outline-none border-none flex items-center justify-center bg-secondary text-white text-2xl font-medium py-6"
						>
							Edit
						</button>
					</div>
				</form>
			</div>
		</div>
		<div class="w-full md:w-[80%] lg:w-1/2">
			<p class="text-[2rem] font-semibold text-customBlack">Personal Info</p>
			<div class="mt-7 bg-primaryLight p-8">
				<form action="" class="flex mt-12 flex-col gap-y-8">
					<div class="flex flex-col gap-y-6">
						<label
							for="profile_name"
							class="text-2xl font-medium text-customBlack"
							>Name</label
						>
						<div
							class="w-full border-[1.5px] bg-transparent border-[#D2D1D1] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
						>
							<input
								class="text-2xl border-none outline-none grow w-[90%] h-full bg-transparent"
								type="text"
								placeholder="Name"
								v-model="name"
								name="profile_name"
								id="profile_name"
								readonly
							/>
						</div>
					</div>
					<div class="flex flex-col gap-y-6">
						<label
							for="profile_phone"
							class="text-2xl font-medium text-customBlack"
							>Phone Number</label
						>
						<div
							class="w-full border-[1.5px] bg-transparent border-[#D2D1D1] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
						>
							<input
								class="text-2xl border-none outline-none grow w-[90%] h-full bg-transparent"
								type="phone"
								placeholder="Phone Number"
								v-model="phone"
								name="profile_name"
								idprofile_name
								readonly
							/>
						</div>
					</div>
					<div>
						<button
							class="w-full outline-none border-none flex items-center justify-center bg-secondary text-white text-2xl font-medium py-6"
						>
							Edit
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
<script setup>
import profileStore from "~/store/profile-store";
import authStore from "~/store/auth-store";
const config = useRuntimeConfig();
const headers = useRequestHeaders(["cookie"]);
const store = profileStore();

const { data, error } = await useFetch(
	`${config.public.ENDPOINT_URL}auth/profile`,
	{
		headers: headers,
		credentials: "include",
		method: "POST",
	}
);

if (data.value) {
	store.userDetails = data.value.user;
}

const email = computed(() => store.userDetails.email);
const phone = computed(() => store.userDetails.phone);
const name = computed(() => store.userDetails.name);
</script>
