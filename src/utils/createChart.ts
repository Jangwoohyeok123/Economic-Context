import { DateAndValue_Type } from '@/types/fred';
import setPeriodValues_List from './setPeriodValues_List';
import * as d3 from 'd3';

// 차트가 될 svg 태그를 만드는 함수입니다.
// svg 태그 내부에 x, y 축과 line 이 포함됩니다.
export default function createChart(svg: SVGElement, periodValues_List: DateAndValue_Type[], height: number): SVGElement {
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

	// 확장된 도메인을 설정하여 그래프의 데이터가 위아래 범위를 벗어나지 않도록 합니다.
	// 도메인의 최소와 최대 값을 각각 15% 확장하여, 도메인 값이 레인지 안에 포함되도록 합니다.
	const expansion = 0.15;
	const [yDomain, yRange] = [
		[yMin * (1 - expansion), yMax * (1 + expansion)],
		[svgHeight - 50 - xAxisHeight, -20]
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
	const makeLineDataForPath = d3
		.line<DateAndValue_Type>() // 각 데이터 항목의 date와 value 필드를 읽어서 선으로 변화시킨다.
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
			else if (Math.abs(node.getBoundingClientRect().x - xAxisLastPosition) < xOffset) d3.select(this).remove();
		});

	// y 축 (우측 축)을 추가합니다.
	// y 축의 도메인을 숨기고, 틱 라인을 확장하여 시각적 가이드를 제공합니다.
	rootSvg
		.append('g')
		.attr('style', `transform: translate(calc(100% - ${yAxisWidth}px), ${-xAxisHeight}px); opacity: 0.9;`)
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
			else if (Math.abs(curTickYPosition - svgTop) < yOffset * 0.3) d3.select(this).remove();
		});

	rootSvg
		.append('path')
		.attr('fill', 'none')
		.attr('stroke', 'steelblue')
		.attr('stroke-width', 1.5)
		.attr('d', makeLineDataForPath(periodValues_List as DateAndValue_Type[]));

	rootSvg
		.append('line')
		.attr('x1', 200)
		.attr('y1', 0)
		.attr('x2', 200)
		.attr('y2', svgHeight - xAxisHeight - rootSvgPadding - rootSvgPaddingTop)
		.attr('stroke', '#111')
		.attr('opacity', '0.25');

	// 데이터 포인트에 대한 원을 추가
	// const points = rootSvg
	// 	.selectAll('.point')
	// 	.data(periodValues_List)
	// 	.enter()
	// 	.append('circle')
	// 	.attr('class', 'point')
	// 	.attr('cx', d => utcScale(d.date))
	// 	.attr('cy', d => linearScale(Number(d.value)))
	// 	.attr('r', 5)
	// 	.attr('fill', 'red');

	// // 툴팁을 위한 div 요소 추가
	// const tooltip = d3
	// 	.select('body')
	// 	.append('div')
	// 	.attr('class', 'tooltip')
	// 	.style('position', 'absolute')
	// 	.style('visibility', 'hidden')
	// 	.style('background', 'white')
	// 	.style('border', '1px solid black')
	// 	.style('padding', '5px');

	// // 각 원에 마우스 이벤트 리스너 추가
	// points
	// 	.on('mouseover', (event, d) => {
	// 		tooltip
	// 			.html(`Date: ${d.date}<br>Value: ${d.value}`)
	// 			.style('top', event.pageY - 10 + 'px')
	// 			.style('left', event.pageX + 10 + 'px')
	// 			.style('visibility', 'visible');
	// 	})
	// 	.on('mouseout', () => {
	// 		tooltip.style('visibility', 'hidden');
	// 	});

	return svg;
}
