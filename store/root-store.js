import { defineStore } from "pinia";
import { ref, computed } from "vue";

const rootStore = defineStore("rootStore", () => {
	const hasError = {
		status: ref(false),
		type: ref(null),
		message: ref(""),
	};

	function displayPopup(message, type) {
		hasError.status.value = true;
		hasError.message.value = message;
		hasError.type.value = type;
		setTimeout(() => {
			hasError.status.value = false;
		}, 5000);
	}

	return { hasError, displayPopup };
});

export default rootStore;
