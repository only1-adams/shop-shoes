export default function useAuth() {
	return useState("isAuth", () => false);
}
