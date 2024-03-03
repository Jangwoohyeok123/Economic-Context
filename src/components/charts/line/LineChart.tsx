import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import clsx from 'clsx';
import styles from './LineChart.module.scss';

/* LineChart 에게 원하는 것 
	1. prop 으로 value, title 전달하기 (o)
	2. 비율은 scss 로 처리할 수 있게 만들기 (o)
	3. 컴포넌트에서 title 표기해주기 (o)
	4. LineChart의 width, height 제어권을 사용하는 컴포넌트의 scss에게 넘겨주기 (x)
	5. 마우스를 hover 했을 때 date 와 value 가 보이는 tooltop 연동해놓기 (x)
*/

interface Value {
	date: Date;
	value: number;
}

interface LineChartProps {
	title: string;
	values: Value[];
}
// width, height, marginTop, marginRight, marginBottom, marginLeft,
const LineChart = ({ title, values }: LineChartProps) => {
	const svgRef = useRef<SVGSVGElement>(null);
	const svgContainerRef = useRef<HTMLDivElement>(null);
	const compoenetRootDivRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const width = svgContainerRef.current?.offsetWidth;
		const height = svgContainerRef.current?.offsetHeight;
		const marginTop = 20;
		const marginRight = 40;
		const marginBottom = 40;
		const marginLeft = 40;
		const x = d3.scaleUtc(
			d3.extent(values, value => value.date),
			[marginLeft, width - marginRight]
		);

		const maxValue = d3.max(values, value => value.value);
		const y = d3.scaleLinear([0, maxValue * 1.3], [height - marginBottom, marginTop]);

		const line = d3
			.line()
			.x(d => x(d.date))
			.y(d => y(d.value));

		const svg = d3
			.select(svgRef.current)
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', [0, 0, width, height])
			.attr('style', 'max-width: 100%; height: 100%');

		// 중첩되는 chart 제거
		svg.selectAll('*').remove();

		// axis bottom 추가
		svg
			.append('g')
			.attr('transform', `translate(0,${height - marginBottom})`)
			.call(
				d3
					.axisBottom(x)
					.ticks(width / 200)
					.tickSizeOuter(10)
			);

		svg
			.append('g')
			.attr('transform', `translate(${marginLeft},0)`)
			.call(d3.axisLeft(y).ticks(height / 40))
			.call(g => g.select('.domain').remove())
			.call(g =>
				g
					.selectAll('.tick line')
					.clone()
					.attr('x2', width - marginLeft - marginRight)
					.attr('stroke-opacity', 0.1)
			);

		svg
			.append('path')
			.attr('fill', 'none')
			.attr('stroke', 'steelblue')
			.attr('stroke-width', 1.5)
			.attr('d', line(values));
	}, [svgContainerRef]);

	return (
		<div className={clsx(styles.LineChart)}>
			<h4 className={clsx(styles.header)}>{title}</h4>
			<div ref={svgContainerRef} className={clsx(styles.chartContainer)}>
				<svg ref={svgRef} />
			</div>
		</div>
	);
};

export default LineChart;
