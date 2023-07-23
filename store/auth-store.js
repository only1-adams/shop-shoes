import { defineStore } from "pinia";
import { ref, computed } from "vue";

const authStore = defineStore("authStore", () => {
	const isLoggedIn = ref(true);
	const expiresIn = ref(null);
	const role = ref(null);
	const csrf = ref(null);
	const error = {
		show: ref(false),
		message: ref(""),
	};

	const testMessage = ref("");

	const showError = computed(() => {
		return error.show.value;
	});

	const message = computed(() => {
		return error.message.value;
	});

	function displayError(message) {
		error.show.value = true;
		error.message.value = message;
		setTimeout(() => {
			error.show.value = false;
		}, 5000);
	}

	function authenticateUser(csrfToken, userRole) {
		csrf.value = String(csrfToken);
		role.value = userRole;
		isLoggedIn.value = true;
	}

	async function getCsrfToken(baseUrl, headers = {}) {
		const response = await fetch(`${baseUrl}get-csrf`, {
			credentials: "include",
			headers: { ...headers },
		});

		if (!response.ok) {
			throw new Error();
		}

		const data = await response.json();

		csrf.value = String(data.csrfToken);
		role.value = data.role;
		isLoggedIn.value = true;
	}

	async function logUserOut(baseUrl, headers = {}, callback = () => {}) {
		const response = await fetch(`${baseUrl}auth/signout`, {
			method: "POST",
			credentials: "include",
			headers: { ...headers },
		});

		if (response.ok) {
			isLoggedIn.value = false;
			csrf.value = null;
			role.value = null;
			callback("Logged out successfully");
		}
	}

	return {
		isLoggedIn,
		expiresIn,
		showError,
		message,
		error,
		displayError,
		authenticateUser,
		csrf,
		getCsrfToken,
		logUserOut,
		role,
		testMessage,
	};
});

export default authStore;
