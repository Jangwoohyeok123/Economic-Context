export default function makeThrottledHandler(eventHandler: () => any, delay: number) {
	let timer: NodeJS.Timeout | null = null;

	return () => {
		if (timer) return;

		timer = setTimeout(() => {
			timer = null;
			eventHandler();
		}, 200);
	};
}
