import { vi, describe, expect } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import authStore from "../store/auth-store";

const fetch = vi.fn((url, options) => {
	const response = {
		ok: true,
		json: vi.fn(() => {
			return Promise.resolve({
				csrfToken: "rtyajsjs36454",
				role: "admin",
			});
		}),
	};
	return Promise.resolve(response);
});

vi.stubGlobal("fetch", fetch);

describe("tests for getting csrf token", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it("should make a fetch request with the correct url and handle the succesfull response", async () => {
		//Arrange
		const auth = authStore();
		const baseUrl = "http:localhost:8080/";

		//Act
		await auth.getCsrfToken(baseUrl, {});

		//Assert
		expect(fetch).toHaveBeenCalledWith("http:localhost:8080/get-csrf", {
			credentials: "include",
			headers: {},
		});

		expect(auth.csrf).toBe("rtyajsjs36454");
		expect(auth.role).toBe("admin");
		expect(auth.isLoggedIn).toBe(true);
	});
});
