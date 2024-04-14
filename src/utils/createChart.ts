import { DateAndValue_Type } from '@/types/fred';
import setPeriodValues_List from './setPeriodValues_List';
import * as d3 from 'd3';

// 차트가 될 svg 태그를 만드는 함수입니다.
// svg 태그 내부에 x, y 축과 line 이 포함됩니다.
export default function createChart(
	svg: SVGElement,
	values_List: DateAndValue_Type[],
	duration: number,
	setDuration: React.Dispatch<number>,
	height: number
): SVGElement {
	const lastDate = values_List[values_List.length - 1].date;
	let periodValues_List: DateAndValue_Type[] = setPeriodValues_List(duration, values_List, lastDate);
	const { x: svgX, bottom: svgBottom, top: svgTop, width: svgWidth, height: svgHeight } = svg.getBoundingClientRect();
	const [xAxisStartPosition, xAxisLastPosition] = [svgX, svgX + svgWidth];
	const [xAxisHeight, yAxisWidth] = [25, 50];
	const [rootSvgPadding, rootSvgPaddingTop] = [20, 30];

	const [xMin, xMax] = d3.extent(periodValues_List, (value: DateAndValue_Type) => value.date) as [Date, Date];
	const [yMin, yMax] = d3.extent(periodValues_List, (value: DateAndValue_Type) => Number(value.value)) as [number, number];

	const [xDomain, xRange] = [
		[xMin, xMax],
		[0, svgWidth - rootSvgPadding * 2 - yAxisWidth]
	];

	// domain을 조절해서 화면에서 차트가 벗어나지 않도록 한다. domain의 최소, 최대를 10% 확장하여 domain이 range안에 있게만듦
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

	const [utcScale, linearScale] = [d3.scaleUtc(xDomain, xRange), d3.scaleLinear(yDomain, yRange)];
	const line = d3
		.line<DateAndValue_Type>()
		.x(utc => utcScale(utc.date))
		.y(linear => linearScale(Number(linear.value)));

	// chart가 그려질 도화지역할을 하는 svg 태그
	const rootSvg = d3
		.select(svg)
		.attr('style', `width: 100%; height: ${height}vh; padding: ${rootSvgPadding}px; padding-top: ${rootSvgPaddingTop}px;`);

	// x(axis bottom) 축
	// each 함수는 x 축에 벗어나는 tick을 제어한다. offset 이 커질수록 축의 가장자리에 날짜(tick)가 나오지 않는다.
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

			// 양 끝에 tick이 x축에서 잘려서 보이는 현상을 제어하는 로직으로 this는 tick을 의미한다.
			if (Math.abs(node.getBoundingClientRect().x - xAxisStartPosition) < xOffset * 0.3) d3.select(this).remove();
			else if (Math.abs(node.getBoundingClientRect().x - xAxisLastPosition) < xOffset) d3.select(this).remove();
		});

	// axisRight y축
	rootSvg
		.append('g')
		.attr('style', `transform: translate(calc(100% - ${yAxisWidth}px), ${-xAxisHeight}px); opacity: 0.9;`)
		.call(d3.axisRight(linearScale).ticks(yAxisLength / yTickLength))
		.call(g => g.select('.domain').remove())
		.call(g =>
			g
				.selectAll('.tick line')
				.clone() // 틱 라인 확장
				.attr('x2', '-100%') // -100% 는 y 축 우측으로 이동시키기
				.attr('stroke-opacity', 0.15)
		)
		.selectAll('.tick')
		.each(function (_, index, ticks) {
			const yOffset = 100;
			const tick: Element = ticks[index] as Element;
			const curTickYPosition = tick.getBoundingClientRect().y;

			// y 축에서 tick 이 잘려서 보이는 현상 또는 너무 x 축에 가까운 것을 제거하는 로직svgBottom - tick.getBoundingClientRect().y < yOffset * 0.7
			if (Math.abs(curTickYPosition - svgBottom) < yOffset * 0.3) d3.select(this).remove();
			else if (Math.abs(curTickYPosition - svgTop) < yOffset * 0.3) d3.select(this).remove();
		});

	rootSvg
		.append('path')
		.attr('fill', 'none')
		.attr('stroke', 'steelblue')
		.attr('stroke-width', 1.5)
		.attr('d', line(periodValues_List as DateAndValue_Type[]));

	return svg;
}
