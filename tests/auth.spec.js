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

describe("getting csrf token", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it("should make a fetch request with the correct url and handle the succesful response", async () => {
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

	it("should throw an error if the response fails", async () => {
		fetch.mockResolvedValueOnce({
			ok: false,
			json: vi.fn(() => {
				return Promise.resolve({
					csrfToken: "rtyajsjs36454",
					role: "admin",
				});
			}),
		});

		//Arrange
		const auth = authStore();
		const baseUrl = "http:localhost:8080/";

		await expect(() => auth.getCsrfToken(baseUrl, {})).rejects.toThrow();
	});
});

describe("logging the user out", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it("should log the user out if the request succeeds", async () => {
		//Arrange
		const auth = authStore();
		const baseUrl = "http:localhost:8080/";
		const callback = vi.fn((message) => message);

		//Act
		auth.isLoggedIn = true;
		auth.csrf = "fhdhshahs";
		auth.role = "regular";
		await auth.logUserOut(baseUrl, {}, callback);

		//Assert
		expect(auth.isLoggedIn).toBeFalsy();
		expect(auth.csrf).toBeNull();
		expect(auth.role).toBeNull();
		expect(callback).toHaveBeenCalledWith("Logged out successfully");
	});
});
