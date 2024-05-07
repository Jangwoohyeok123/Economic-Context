export default function moveViewPort(height: number = 800) {
	if (!document.getElementById('scrollTarget')) return;
	height = document.getElementById('#scrollTarget')?.offsetHeight ?? 500 + 300;
	window.scrollTo({
		top: height,
		left: 0,
		behavior: 'smooth'
	});
}
