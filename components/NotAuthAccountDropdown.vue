<template>
	<div class="cursor-pointer relative">
		<span @click="toggle">
			<svg
				width="17"
				height="22"
				viewBox="0 0 17 22"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M11.9998 5C11.9998 7.07107 10.3209 8.75 8.24984 8.75C6.17877 8.75 4.49984 7.07107 4.49984 5C4.49984 2.92893 6.17877 1.25 8.24984 1.25C10.3209 1.25 11.9998 2.92893 11.9998 5Z"
					:stroke="props.iconStrokeColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M0.750977 19.1182C0.821282 15.0369 4.15171 11.75 8.24984 11.75C12.3481 11.75 15.6786 15.0371 15.7487 19.1185C13.4659 20.166 10.9262 20.75 8.25016 20.75C5.57384 20.75 3.03394 20.1659 0.750977 19.1182Z"
					:stroke="props.iconStrokeColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</span>
		<Teleport to="body">
			<div
				:class="{
					'opacity-100 pointer-events-auto': isOpen,
					'pointer-events-none opacity-0': !isOpen,
				}"
				@click="close"
				class="fixed z-[4] bg-overlayColor top-0 w-full h-full left-0"
			></div>
			<div
				:class="isOpen ? 'translate-x-0' : 'translate-x-[1000px]'"
				class="w-full md:w-[500px] md:border-l-[1.5px] md:border-l-primary top-0 md:right-0 h-full overflow-auto bg-white fixed z-[5] p-8 transition-all duration-300"
			>
				<TheAlertPopup
					:show="store.showError"
					:message="store.message"
					type="error"
				/>
				<div class="flex items-center justify-end">
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
				<div class="mt-12">
					<p
						class="text-[2rem] md:text-[2.5rem] font-extrabold text-customBlack"
					>
						SIGN IN OR CREATE AN ACCOUNT
					</p>
					<div
						class="mt-12 w-full h-[50px] flex items-center overflow-hidden rounded-lg bg-primaryLight"
					>
						<span
							@click="setCurrentTab('signin')"
							:class="{
								'bg-primary text-white': currentTab === 'signin',
							}"
							class="w-1/2 flex items-center justify-center h-full text-2xl font-medium cursor-pointer"
							>Sign In</span
						>
						<span
							@click="setCurrentTab('signup')"
							:class="{
								'bg-primary text-white': currentTab === 'signup',
							}"
							class="w-1/2 flex items-center justify-center h-full text-2xl font-medium cursor-pointer"
							>Create Account</span
						>
					</div>
					<LoginForm :currentTab="currentTab" @close="close" />
					<SignupForm :currentTab="currentTab" @signedup="close" />
				</div>
			</div>
		</Teleport>
	</div>
</template>

<script setup>
import authStore from "~/store/auth-store";
const store = authStore();
const { isOpen, toggle, close } = useToggler();
useBodyOverflow(isOpen);

const props = defineProps(["iconStrokeColor"]);

const currentTab = ref("signin");

function setCurrentTab(tab) {
	currentTab.value = tab;
}
</script>
