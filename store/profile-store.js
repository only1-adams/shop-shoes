import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";

const profileStore = defineStore("profileStore", () => {
	const userDetails = reactive({
		name: null,
		email: null,
		phone: null,
	});

	const addressList = ref([]);

	const orders = ref([]);

	return { userDetails, addressList, orders };
});

export default profileStore;
