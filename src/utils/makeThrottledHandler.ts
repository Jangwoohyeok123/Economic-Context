export default function makeThrottledHandler(eventHandler: () => any, delay: number) {
	let timer: number | null = null;

	return () => {
		if (timer) return;

		timer = setTimeout(() => {
			timer = null;
			eventHandler();
		}, 200);
	};
}
