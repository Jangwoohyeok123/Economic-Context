export default function makeDebouncedHandler(eventHandler: () => any, delay: number) {
	let timer: number | null = null;

	return () => {
		if (timer !== null) clearTimeout(timer);
		setTimeout(eventHandler, delay);
	};
}
