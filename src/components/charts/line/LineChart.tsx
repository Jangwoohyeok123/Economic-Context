import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import clsx from 'clsx';
import styles from './LineChart.module.scss';
import { Indicator_Type, DateAndValue_Type } from '@/types/fred';
import styled from 'styled-components';

export interface LineChart_Props {
	indicator: Indicator_Type;
	children?: React.ReactElement;
	height?: number;
	width?: number;
	values: DateAndValue_Type[] | [undefined, undefined];
	className?: string;
	seriesId?: string;
}

/**
 * @indicator SeriessType
 * @values Value[]
 * @height [x]vh
 * @width [y]%
 */
const LineChart = ({ indicator, values, width, height, className, seriesId }: LineChart_Props) => {
	const svgRef = useRef<SVGSVGElement>(null);
	const svgContainerRef = useRef<HTMLDivElement>(null);
	const widthStyle = {
		width: `${width}%`
	};
	const heightStyle = {
		height: `${height}vh`
	};

	const ChartWrapper = styled.div``;

	const Chart = styled.div`
		width: 100%;
		height: 100%;
		display: flex;
	`;

	const Svg = styled.svg`
		width: 100%;
		background: var(--bgColor-light);
		padding: 10px;
	`;

	// chart 를 세팅하는 라이브러리 로직입니다.
	useEffect(() => {
		const width = svgContainerRef.current?.offsetWidth || 0;
		const height = svgContainerRef.current?.offsetHeight || 0;
		const marginTop = 20;
		const marginRight = 40;
		const marginBottom = 40;
		const marginLeft = 40;
		const x = d3.scaleUtc(
			d3.extent(values as DateAndValue_Type[], (value: DateAndValue_Type) => value.date) as unknown as [Date, Date],
			[0, width]
		);
		const maxValue = d3.max(values as DateAndValue_Type[], (value: DateAndValue_Type) => Number(value.value));
		const y = d3.scaleLinear([0, Number(maxValue) * 1.3], [height - marginBottom, marginTop]);

		const line = d3
			.line<DateAndValue_Type>()
			.x(d => x(d.date))
			.y(d => y(Number(d.value)));

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
			.attr('d', line(values as DateAndValue_Type[]));
	}, [values]);

	return (
		<div className={clsx(styles.LineChart, className && styles[className])} style={widthStyle}>
			<ChartWrapper ref={svgContainerRef} style={heightStyle}>
				<Chart>
					<Svg ref={svgRef} />
				</Chart>
			</ChartWrapper>
		</div>
	);
};

export default LineChart;
