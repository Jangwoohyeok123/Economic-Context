import { DateAndValue_Type } from '@/types/fred';
import * as d3 from 'd3';
import makeThrottledHandler from './makeThrottledHandler';

// 차트가 될 svg 태그를 만드는 함수입니다.
// svg 태그 내부에 x, y 축과 line 이 포함됩니다.
export default function renderChartSvg(svg: SVGElement, periodValues_List: DateAndValue_Type[], height: number, duration: number): SVGElement {
	const { x: svgX, y: svgY, bottom: svgBottom, top: svgTop, width: svgWidth, height: svgHeight } = svg.getBoundingClientRect();
	const [xAxisStartPosition, xAxisLastPosition] = [svgX, svgX + svgWidth];
	const [xAxisHeight, yAxisWidth] = [25, 50];
	const [rootSvgPadding, rootSvgPaddingTop] = [20, 30];

	const [xMin, xMax] = d3.extent(periodValues_List, (value: DateAndValue_Type) => value.date) as [Date, Date];
	const [yMin, yMax] = d3.extent(periodValues_List, (value: DateAndValue_Type) => Number(value.value)) as [number, number];

	const [xDomain, xRange] = [
		[xMin, xMax],
		[0, svgWidth - rootSvgPadding * 2 - yAxisWidth]
	];

	const [yDomain, yRange] = [
		[yMin, yMax],
		[svgHeight - 50 - xAxisHeight, 2]
	];

	// tick 사이의 간격을 고정시키고 동적으로 tick의 개수만들기 위한 변수집합
	const [xAxisLength, yAxisLength, xTickLength, yTickLength] = [
		svgWidth - rootSvgPadding * 2 - yAxisWidth, // xRange
		svgHeight - 50 - xAxisHeight + 20, // yRange
		150,
		50
	];

	// domain과 range의 관계를 설정하여, domain을 range로 변환하는 scale함수를 만들었습니다.
	const [utcScale, linearScale] = [d3.scaleUtc(xDomain, xRange), d3.scaleLinear(yDomain, yRange)];

	// 시계열 데이터를 SVG(path)에서 사용할 수 있는 형태로 가공하는 역할함수를 만든다.
	const makeDataForPath = d3
		.line<DateAndValue_Type>() // line 함수는 data를 path의 d속성값으로 사용될 문자열을 생성
		.x(utc => utcScale(utc.date))
		.y(linear => linearScale(Number(linear.value)));

	// chart가 그려질 도화지역할을 하는 svg 태그
	const rootSvg = d3
		.select(svg)
		.attr('style', `width: 100%; height: ${height}vh; padding: ${rootSvgPadding}px; padding-top: ${rootSvgPaddingTop}px;`);

	// x 축 (하단 축)을 추가합니다.
	// 'each' 함수를 사용하여 x 축에서 표시되지 않아야 하는 tick들을 제어합니다.
	// 특정 offset 이상으로 축 가장자리에 위치한 날짜(tick)가 나오지 않도록 조정합니다.
	rootSvg
		.append('g')
		.attr('style', `transform: translate(0, calc(100% - ${xAxisHeight}px)); opacity: 0.9`)
		.call(
			d3
				.axisBottom(utcScale)
				.ticks(xAxisLength / xTickLength)
				.tickSizeOuter(0)
		)
		.selectAll('.tick')
		.each(function (_, index, ticks) {
			const xOffset = 100;
			const node: Element = ticks[index] as Element;

			// 양 끝에 위치한 tick이 x축에서 잘려 보이지 않게 제거하는 로직입니다.
			if (Math.abs(node.getBoundingClientRect().x - xAxisStartPosition) < xOffset * 0.3) d3.select(this).remove();
			if (Math.abs(node.getBoundingClientRect().x - xAxisLastPosition) < xOffset) d3.select(this).remove();
		});

	// y 축 (우측 축)을 추가합니다.
	// y 축의 도메인을 숨기고, 틱 라인을 확장하여 시각적 가이드를 제공합니다.
	rootSvg
		.append('g')
		.attr('style', `transform: translateX(calc(100% - ${yAxisWidth}px)); opacity: 0.9;`)
		.call(d3.axisRight(linearScale).ticks(yAxisLength / yTickLength))
		.call(g => g.select('.domain').remove())
		.call(g =>
			g
				.selectAll('.tick line')
				.clone() // 틱 라인 확장
				.attr('x2', '-100%') // -100% 는 y 축 우측으로 이동시킨 것을 의미합니다.
				.attr('stroke-opacity', 0.15)
		)
		.selectAll('.tick')
		.each(function (_, index, ticks) {
			const yOffset = 100;
			const tick: Element = ticks[index] as Element;
			const curTickYPosition = tick.getBoundingClientRect().y;

			// y 축에서 너무 가까우거나 멀리 위치한 tick을 제거하는 로직입니다.
			if (Math.abs(curTickYPosition - svgBottom) < yOffset * 0.3) d3.select(this).remove();
			if (Math.abs(curTickYPosition - svgTop) < yOffset * 0.3) d3.select(this).remove();
		});

	rootSvg
		.append('path')
		.attr('fill', 'none')
		.attr('stroke', 'steelblue')
		.attr('stroke-width', 1)
		.attr('d', makeDataForPath(periodValues_List as DateAndValue_Type[]));

	const dataCount = periodValues_List.length;
	const lengthForTooltip = svgWidth / dataCount;

	const rootSvgElement = rootSvg.node() as SVGElement;
	const svgWrapper = rootSvgElement.parentNode;

	// 모든 .myTooltipStyle 요소 검색
	const tooltips = svgWrapper?.querySelectorAll('.myTooltipStyle');

	// 첫 번째 요소를 제외한 모든 툴팁 요소 제거
	tooltips?.forEach((tooltip, index) => {
		if (index > 0) tooltip.remove();
	});

	// 유효한 첫 번째 툴팁 요소 가져오기 (혹은 존재하지 않는 경우 null)
	let tooltipElement: HTMLDivElement | null = null;
	if (tooltips && tooltips.length > 0) tooltips.length > 0 ? (tooltips[0] as HTMLDivElement) : null;
	// let tooltipElement = tooltips.length > 0 ? (tooltips[0] as HTMLDivElement) : null;

	// 툴팁 요소가 없으면 새로 생성
	if (!tooltipElement && svgWrapper) {
		tooltipElement = document.createElement('div');
		tooltipElement.classList.add('myTooltipStyle');
		svgWrapper.appendChild(tooltipElement);
	}

	// 툴팁이 있는 경우 이벤트 핸들러 설정
	if (tooltipElement) {
		rootSvg
			.selectAll('rect')
			.data(periodValues_List) // 데이터 바인딩
			.enter()
			.append('rect')
			.attr('x', d => utcScale(d.date) - lengthForTooltip / 2) // 중심 x축 위치 설정
			.attr('y', 0)
			.attr('width', lengthForTooltip)
			.attr('height', svgHeight - 50 - xAxisHeight)
			.attr('opacity', 0)
			.on('mouseover', function (event, d) {
				tooltipElement.style.visibility = 'visible';
				updateTooltipContent(d);
			})
			.on('mousemove', function (event, d) {
				const tooltipX = utcScale(d.date);
				const tooltipY = linearScale(Number(d.value));

				tooltipElement.style.left = `${tooltipX - 10}px`;
				tooltipElement.style.top = `${tooltipY}px`;
				tooltipElement.style.transform = 'translate(-30%, -50%)';
			})
			.on('mouseout', function () {
				tooltipElement.style.visibility = 'hidden';
			});
	}

	function updateTooltipContent(data: DateAndValue_Type) {
		if (tooltipElement) tooltipElement.innerHTML = `Value: ${data.value}<br>Date: ${data.date.toISOString().split('T')[0]}`;
	}

	return svg;
}

// const relativeX = event.clientX - parentRect.left; // 부모 요소 내에서의 X 좌표
// const relativeY = event.clientY - parentRect.top; // 부모 요소 내에서의 Y 좌표
// tooltipElement.style.left = `${relativeX - tooltipLength / 2 + 10}px`;
// tooltipElement.style.top = `${relativeY - 30}px`;
