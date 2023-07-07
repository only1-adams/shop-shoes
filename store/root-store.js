const rootStore = defineStore("rootStore", () => {
	const hasError = {
		status: ref(false),
		type: ref(null),
		message: ref(""),
	};

	// const userIsActive = ref(true);
	// let timeoutId = null;

	function displayPopup(message, type) {
		hasError.status.value = true;
		hasError.message.value = message;
		hasError.type.value = type;
		setTimeout(() => {
			hasError.status.value = false;
		}, 5000);
	}

	// function deactivateAfterOneHour() {
	// 	clearTimeout(timeoutId);
	// 	timeoutId = setTimeout(() => {
	// 		userIsActive.value = false;
	// 	}, 3600 * 1000);
	// }

	// function keepUserActive() {
	// 	const events = ["keydown", "mousemove", "touchstart"];
	// 	events.forEach((event) => {
	// 		window.addEventListener(event, () => {
	// 			userIsActive.value = true;
	// 			deactivateAfterOneHour();
	// 		});
	// 	});
	// }

	return { hasError, displayPopup };
});

export default rootStore;
