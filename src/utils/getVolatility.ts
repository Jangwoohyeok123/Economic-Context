// 최신변화율을 만드는 과정이다. 정수로 만든 후 다시 소수로 전환하는 과정을 거친다.
function roundTo(num: number, decimalPlaces: number) {
	const factor = 10 ** decimalPlaces;
	return Math.round(num * factor) / factor;
}

export default function getVolatility(prev: number, cur: number): number {
	return roundTo(cur - prev, 2);
}
