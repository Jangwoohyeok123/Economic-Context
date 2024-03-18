import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import clsx from 'clsx';
import styles from './LineChart.module.scss';
import { SeriessType } from '@/types/fredType';
import ChartDescription from '@/components/chartDescription/ChartDescription';

type Value = {
	date: Date;
	value: number;
};

interface LineChartProps {
	indicator: SeriessType;
	children?: React.ReactElement;
	values: Value[];
	width?: number;
	height?: number;
	className?: string;
}

/* 
	LineChart 요구사항 

	1. chart 부분과 description 분리

	이슈사항 
	ButtonComponent 는 favorite 정보와 동기화 시켜야 하기 때문에 categoryId 가 필요하다 
*/

/**
 * @param indicator SeriessType
 * @param values - { date: Date, value: number }
 * @param children
 * @param className
 * @param width - default 100% 입니다. 값을 전달하면 % 가 변경되기에 wrapping 해서 사용해주세요.
 * @param height - default 설정은 없습니다. 값을 전달하면 % 가 변경됩니다.
 * @returns
 */
const LineChart = ({ indicator, values, children, width, height }: LineChartProps) => {
	const {
		id,
		title,
		frequency,
		frequency_short,
		group_popularity,
		popularity,
		last_updated,
		notes,
		observation_end,
		observation_start,
		realtime_end,
		realtime_start,
		seasonal_adjustment,
		seasonal_adjustment_short,
		units,
		units_short
	} = indicator;

	// % 는 말을 안들어..
	const lineChartStyle = {
		width: width ? `${width}%` : '100%',
		height: height ? `${height}vh` : undefined
	};

	const svgRef = useRef<SVGSVGElement>(null);
	const svgContainerRef = useRef<HTMLDivElement>(null);

	// chart 를 세팅하는 라이브러리 로직입니다.
	useEffect(() => {
		const width = svgContainerRef.current?.offsetWidth as number;
		const height = svgContainerRef.current?.offsetHeight as number;
		const marginTop = 20;
		const marginRight = 40;
		const marginBottom = 40;
		const marginLeft = 40;

		// x 축 생성
		const x = d3.scaleUtc(d3.extent(values, (value: Value) => value.date) as [Date, Date], [
			marginLeft,
			(width as number) - marginRight
		]);

		const maxValue: number = d3.max(values, value => value.value) as number;
		const y = d3.scaleLinear([0, maxValue * 1.3], [height - marginBottom, marginTop]);

		const line = d3
			.line<Value>()
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
			<div className={clsx(styles.featuresWrap)}>
				<h3>{title}</h3>
				<div className={clsx(styles.chartFeatures)}>
					Period: {observation_start} ~ {observation_end}
				</div>
			</div>

			<div ref={svgContainerRef} className={clsx(styles.chartContainer)} style={lineChartStyle}>
				<div className={clsx(styles.svgWrap)}>
					<svg ref={svgRef} />
				</div>
			</div>
		</div>
	);
};

export default LineChart;
