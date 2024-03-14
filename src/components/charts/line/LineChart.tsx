import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import clsx from 'clsx';
import styles from './LineChart.module.scss';
import { Seriess_Type } from '@/types/fredType';

interface Value {
	date: Date;
	value: number;
}

interface LineChartProps {
	indicators: Seriess_Type;
	values: Value[];
	className?: string;
}

// width, height, marginTop, marginRight, marginBottom, marginLeft,
// 예약어를 안쓰기

/* 
	Line chart 컴포넌트는 아래의 정보를 담고 있어야 한다. 
	1. chart 정보 
	2. chart 에 관련한 텍스트 정보
	3. 현재 풀스크린만 대비하고 반응형은 나중에 작업한다.
*/
const LineChart = ({ indicators, values, className }: LineChartProps) => {
	const svgRef = useRef<SVGSVGElement>(null);
	const svgContainerRef = useRef<HTMLDivElement>(null);
	const compoenetRootDivRef = useRef<HTMLDivElement>(null);

	// chart 를 세팅하는 라이브러리 로직입니다.
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
		<div className={clsx(styles.LineChart, className)}>
			<div className={clsx(styles.featuresWrap)}>
				<h3>{indicators.title}</h3>
				<div className={clsx(styles.chartFeatures)}>
					Period: {indicators.observation_start} ~ {indicators.observation_end}
					{/* <span>기능1</span>
					<span>기능2</span>
					<span>기능3</span>
					<span>기능4</span>
					<span>기능5</span> */}
				</div>
			</div>
			<div ref={svgContainerRef} className={clsx(styles.chartContainer)}>
				<div className={clsx(styles.svgWrap)}>
					<svg ref={svgRef} />
				</div>
			</div>
			<div className={clsx(styles.chartDescription)}>
				<h3>{indicators.title}</h3>
				<p className={clsx(styles.notes)}>{indicators.notes}</p>
				<div className={clsx(styles.additional)}>
					<div>
						<div>
							<span>Frequency</span> : {indicators.frequency ? indicators.frequency : 'hello'}
						</div>
						<div>
							<span>Continued</span> :
							{indicators.observation_end === indicators.realtime_end ? ' continued' : ' discontinued'}
						</div>
						<div>
							<span>Period</span> : {indicators.observation_start} ~ {indicators.observation_end}
						</div>
					</div>
					<button>save</button>
				</div>
			</div>
		</div>
	);
};

export default LineChart;
