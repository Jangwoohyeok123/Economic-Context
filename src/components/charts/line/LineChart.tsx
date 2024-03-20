import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import clsx from 'clsx';
import styles from './LineChart.module.scss';
import { SeriessType } from '@/types/fredType';
import ChartDescription from '@/components/chartDescription/ChartDescription';

/**
 * @param date - Date
 * @param value - number
 */
export interface Value {
	date: Date;
	value: number;
}

export interface LineChartProps {
	indicator: SeriessType;
	children?: React.ReactElement;
	values: Value[];
	className?: string;
}

/* 
	Line chart 컴포넌트는 아래의 정보를 담고 있어야 한다. 
	1. chart 정보 
	2. chart 에 관련한 텍스트 정보
	3. 현재 풀스크린만 대비하고 반응형은 나중에 작업한다.

	이슈사항 
	ButtonComponent 는 favorite 정보와 동기화 시켜야 하기 때문에 categoryId 가 필요하다 
*/
const LineChart = ({ indicator, values, children, className }: LineChartProps) => {
	const svgRef = useRef<SVGSVGElement>(null);
	const svgContainerRef = useRef<HTMLDivElement>(null);
	const compoenetRootDivRef = useRef<HTMLDivElement>(null);

	// chart 를 세팅하는 라이브러리 로직입니다.
	useEffect(() => {
		const width = svgContainerRef.current?.offsetWidth as number;
		const height = svgContainerRef.current?.offsetHeight as number;
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
				<h3>{indicator.title}</h3>
				<div className={clsx(styles.chartFeatures)}>
					Period: {indicator.observation_start} ~ {indicator.observation_end}
				</div>
			</div>
			<div ref={svgContainerRef} className={clsx(styles.chartContainer)}>
				<div className={clsx(styles.svgWrap)}>
					<svg ref={svgRef} />
				</div>
			</div>
		</div>
	);
};

export default LineChart;
