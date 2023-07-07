<template>
	<div class="w-full flex flex-col gap-y-7">
		<p class="text-[2rem] font-semibold text-secondary">Payment Method</p>
		<div class="flex items-center justify-between h-[68px]">
			<div
				class="cursor-pointer grow flex items-center justify-center h-full bg-primary text-white text-[1.5rem] p-3 md:p-0 text-center md:text-[1.7rem]"
			>
				<span>Online Payment</span>
			</div>
			<div
				class="cursor-pointer grow flex items-center justify-center h-full bg-white text-customBlack text-[1.5rem] p-3 md:p-0 text-center md:text-[1.7rem]"
			>
				<span>Cash on Delivery</span>
			</div>
			<div
				class="cursor-pointer grow flex items-center justify-center h-full bg-white text-customBlack text-[1.5rem] p-3 md:p-0 text-center md:text-[1.7rem]"
			>
				<span>POS on Delivery</span>
			</div>
		</div>
		<form class="w-full bg-white p-8" action="">
			<div class="mb-10 last:mb-0">
				<div class="flex grow flex-col gap-y-6">
					<label for="login_email" class="text-2xl font-medium text-customBlack"
						>Cardholder's Name</label
					>
					<div
						class="w-full border-[1.5px] border-[#D2D1D1] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
					>
						<input
							class="text-2xl border-none outline-none grow w-[90%] h-full bg-transparent"
							type="email"
							placeholder="Cardholder's Name"
							name=""
							id=""
						/>
					</div>
				</div>
			</div>
			<div class="mb-10 last:mb-0">
				<div class="flex grow flex-col gap-y-6">
					<label for="login_email" class="text-2xl font-medium text-customBlack"
						>Card Number</label
					>
					<div
						class="w-full border-[1.5px] border-[#D2D1D1] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
					>
						<input
							class="text-2xl border-none outline-none grow w-[90%] h-full bg-transparent"
							type="address"
							placeholder="Card Number"
							name=""
							id=""
						/>
					</div>
				</div>
			</div>
			<div class="flex justify-between gap-x-8 mb-10 last:mb-0">
				<div class="flex grow flex-col gap-y-6">
					<label for="login_email" class="text-2xl font-medium text-customBlack"
						>MM/YY</label
					>
					<div
						class="w-full border-[1.5px] border-[#D2D1D1] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
					>
						<input
							class="text-2xl border-none outline-none grow w-[90%] h-full bg-transparent"
							type="text"
							placeholder="MM/YY"
							name=""
							id=""
						/>
					</div>
				</div>
				<div class="flex grow flex-col gap-y-6">
					<label for="login_email" class="text-2xl font-medium text-customBlack"
						>CVV</label
					>
					<div
						class="w-full border-[1.5px] border-[#D2D1D1] focus-within:border-secondary transition-all duration-300 h-[50px] flex items-center px-5 gap-x-3"
					>
						<input
							class="text-2xl border-none outline-none grow w-[90%] h-full bg-transparent"
							type="text"
							placeholder="CVV"
							name=""
							id=""
						/>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>
