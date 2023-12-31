<template>
	<div class="mt-7 bg-primaryLight p-8">
		<form @submit.prevent="addProduct" class="flex mt-12 flex-col gap-y-8">
			<div class="flex flex-col gap-y-6">
				<label for="login_email" class="text-2xl font-medium text-customBlack"
					>Product Category</label
				>
				<select
					class="w-full border-[1.5px] bg-transparent border-[#D2D1D1] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3 text-2xl font-medium text-customBlack"
					name=""
					id=""
					v-model="productData.category"
				>
					<option
						class="text-2xl font-medium text-customBlack"
						value=""
						selected
						disabled
					>
						Select Category
					</option>
					<option
						v-for="category in categories.categories"
						:value="category._id"
						:key="index"
						class="text-2xl font-medium text-customBlack"
					>
						{{ category.title }}
					</option>
				</select>
			</div>
			<div class="flex flex-col gap-y-6">
				<label for="login_email" class="text-2xl font-medium text-customBlack"
					>Product Title</label
				>
				<div
					class="w-full border-[1.5px] bg-transparent border-[#D2D1D1] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
				>
					<input
						class="text-2xl border-none outline-none grow w-[90%] h-full bg-transparent"
						type="text"
						placeholder="Product Name"
						name=""
						id="email"
						v-model="productData.title"
					/>
				</div>
			</div>
			<div class="flex flex-col gap-y-6">
				<label for="login_email" class="text-2xl font-medium text-customBlack"
					>Price</label
				>
				<div
					class="w-full border-[1.5px] bg-transparent border-[#D2D1D1] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
				>
					<input
						class="text-2xl border-none outline-none grow w-[90%] h-full bg-transparent"
						type="text"
						placeholder="Price"
						name=""
						id=""
						v-model="productData.price"
					/>
				</div>
			</div>
			<div class="flex flex-col gap-y-6">
				<label for="login_email" class="text-2xl font-medium text-customBlack"
					>Discount Price(optional)</label
				>
				<div
					class="w-full border-[1.5px] bg-transparent border-[#D2D1D1] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
				>
					<input
						class="text-2xl border-none outline-none grow w-[90%] h-full bg-transparent"
						type="text"
						placeholder="Discount Price"
						name=""
						id=""
						v-model="productData.discount_price"
					/>
				</div>
			</div>
			<div class="flex flex-col gap-y-6">
				<label for="login_email" class="text-2xl font-medium text-customBlack"
					>Description</label
				>
				<div
					class="w-full border-[1.5px] bg-transparent border-[#D2D1D1] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
				>
					<input
						class="text-2xl border-none outline-none grow w-[90%] h-full bg-transparent"
						type="text"
						placeholder="Description"
						name=""
						id=""
						v-model="productData.description"
					/>
				</div>
			</div>
			<div class="flex flex-col gap-y-6">
				<label for="login_email" class="text-2xl font-medium text-customBlack"
					>Product Image</label
				>
				<div
					class="w-full bg-transparent transition-all duration-300 h-[50px] flex items-center justify-center px-5 gap-x-3"
				>
					<input
						class="text-2xl border-none outline-none grow w-[90%] h-full bg-transparent"
						type="file"
						placeholder="Description"
						@change="getImage"
						name=""
						id=""
					/>
				</div>
			</div>
			<div>
				<button
					type="submit"
					class="w-full outline-none border-none flex items-center justify-center bg-secondary text-white text-2xl font-medium py-6"
				>
					Add Product
				</button>
			</div>
		</form>
	</div>
</template>

<script setup>
import rootStore from "~/store/root-store";
import authStore from "~/store/auth-store";

const config = useRuntimeConfig();
const root = rootStore();
const auth = authStore();
const emit = defineEmits(["isCreating"]);

const { data: categories } = await useFetch(
	`${config.public.ENDPOINT_URL}products/category`
);

const productData = reactive({
	category: "",
	title: "",
	description: "",
	price: "",
	discount_price: null,
	image: "",
});

const productImageData = ref(null);

function getImage(event) {
	const file = [...event.target.files][0];
	const blob = new Blob([file], { type: file.type });
	const fileTypeAndExtension = file.type.split("/");
	const fileType = fileTypeAndExtension[0];
	const fileExtension = fileTypeAndExtension[1];

	productImageData.blob = blob;
	productImageData.fileType = fileType;
	productImageData.fileExtension = fileExtension;
}

function generateProductData() {
	const newProductData = {};
	for (const key in productData) {
		if (productData[key] !== null) {
			newProductData[key] = productData[key];
		}
	}

	return newProductData;
}

async function getUploadPresignedUrl() {
	try {
		const data = await $fetch(
			`${config.public.ENDPOINT_URL}products/upload/${productImageData?.fileType}/${productImageData?.fileExtension}`,
			{
				credentials: "include",
				headers: {
					"x-csrf-token": auth.csrf,
				},
			}
		);
		return data;
	} catch (error) {
		throw Error(
			"An error occurred while creating the product, please try again"
		);
	}
}

async function uploadProductImage(url) {
	try {
		await $fetch(url, {
			method: "PUT",
			body: productImageData.blob,
		});
	} catch (error) {
		throw Error(
			"An error occurred while creating the product, please try again"
		);
	}
}

async function addProduct() {
	try {
		emit("isCreating", true);
		const { key, url } = await getUploadPresignedUrl();
		await uploadProductImage(url);
		const data = await $fetch(`${config.public.ENDPOINT_URL}products/new`, {
			method: "POST",
			body: { ...generateProductData(), image: key },
			credentials: "include",
			headers: {
				"x-csrf-token": auth.csrf,
			},
		});
		root.displayPopup(data.message, "success");
		emit("isCreating", false);
		return navigateTo("/mgr");
	} catch (error) {
		emit("isCreating", false);
		root.displayPopup(error.data.message || error.message, "error");
	}
}
</script>
