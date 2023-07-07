export default function useBodyOverflow(dependency) {
	watch(dependency, (value) => {
		if (value) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	});
}
