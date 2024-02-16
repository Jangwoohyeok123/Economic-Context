import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// x 축은 연도를 의미한다.
// y 축은 value 를 의미한다.

interface Value {
	date: Date;
	value: number;
}

interface LineChartProps {
	width: number;
	height: number;
	marginTop: number;
	marginRight: number;
	marginBottom: number;
	marginLeft: number;
	values: Value[];
}

const LineChart = ({ width, height, marginTop, marginRight, marginBottom, marginLeft, values }: LineChartProps) => {
	const svgRef = useRef<SVGSVGElement>(null);
	useEffect(() => {
		const x = d3.scaleUtc(
			d3.extent(values, value => value.date),
			[marginLeft, width - marginRight]
		);

		const y = d3.scaleLinear([0, d3.max(values, value => value.value)], [height - marginBottom, marginTop]);

		// x 와 y 가 어떻게 values 에 접근해서 iteration 하는지는 모르겠음
		const line = d3
			.line()
			.x(d => x(d.date))
			.y(d => y(d.value));

		// react 태그로 svg 를 선언하는 것과 d3 의 create('svg') 는 차이가 있는 것인가?
		// d3.create('svg')는 d3.select(svgRef.current)로 대체한다.
		const svg = d3
			.select(svgRef.current)
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', [0, 0, width, height])
			.attr('style', 'max-width: 100%; height: auto; height: instrinsic;');

		// axis bottom 추가
		svg
			.append('g')
			.attr('transform', `translate(0,${height - marginBottom})`)
			.call(
				d3
					.axisBottom(x)
					.ticks(width / 200)
					.tickSizeOuter(10) // 제한이 있는 것 확인 => 마진과 연관돼보임
			);

		// axis left 추가
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
			)
			.call(g =>
				g
					.append('text')
					.attr('x', -marginLeft)
					.attr('y', 10)
					.attr('fill', 'currentColor')
					.attr('text-anchor', 'start')
					.text('Index')
			);

		svg
			.append('path')
			.attr('fill', 'none')
			.attr('stroke', 'steelblue')
			.attr('stroke-width', 1.5)
			.attr('d', line(values));
	}, [height, marginBottom, marginLeft, marginRight, marginTop, values, width]);

	return <svg ref={svgRef} width={600} height={400} />;
};

export default LineChart;
