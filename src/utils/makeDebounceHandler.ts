export default function makeDebouncedHandler(eventHandler: () => any, delay: number) {
	let timer = null;

	return () => {
		if (timer) clearTimeout(timer);
		setTimeout(eventHandler, delay);
	};
}
