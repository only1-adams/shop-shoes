export default function useIsLoggedIn() {
	return useState("isLoggedIn", () => false);
}
