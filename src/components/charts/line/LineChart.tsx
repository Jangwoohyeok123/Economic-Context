import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import clsx from 'clsx';
import styles from './LineChart.module.scss';
import { Indicator_Type, DateAndValue_Type } from '@/types/fred';
import styled from 'styled-components';
import { BsCalendar4Week } from 'react-icons/bs';

interface ChartWrapper_Props {
	width: number;
}

const ChartWrapper = styled.div<ChartWrapper_Props>`
	width: ${Props => `${Props.width}%`};
`;

const ChartFeatures = styled.div`
	height: var(--chartHeaderSize);
	background: #cecece;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 var(--chartPadding);

	.icon {
		cursor: pointer;
	}

	> ul {
		display: flex;
		gap: 15px;

		li {
			cursor: pointer;
		}
	}
`;

const Chart = styled.div`
	display: flex;
	height: calc(100% - var(--chartHeaderSize));
	border-bottom: 1px solid #fff;
`;

const Svg = styled.svg`
	width: 100%;
	background: var(--bgColor-light);
`;

export interface LineChart_Props {
	indicator: Indicator_Type;
	duration: number;
	children?: React.ReactElement;
	height?: number;
	width?: number;
	values: DateAndValue_Type[];
	className?: string;
}

/**
 * @indicator SeriessType
 * @values Value[]
 * @height [x]vh
 * @width [y]%
 */
const LineChart = ({ indicator, duration, values, width = 100, height = 65, className }: LineChart_Props) => {
	const svgRef = useRef<SVGSVGElement>(null);
	const svgContainerRef = useRef<HTMLDivElement>(null);
	const widthStyle = {
		width: `${width}%`
	};

	if (duration === 1) {
	} else if (duration === 3) {
	} else if (duration === 5) {
	}

	const slicedValues = values.slice(-200);

	// chart 를 세팅하는 라이브러리 로직입니다.
	useEffect(() => {
		if (values && svgRef.current) {
			const {
				x: svgX,
				y: svgY,
				bottom: svgBottom,
				left: svgLeft,
				right: svgRight,
				top: svgTop,
				width: svgWidth,
				height: svgHeight
			} = svgRef.current.getBoundingClientRect();
			const [xAxisStartPosition, xAxisLastPosition] = [svgX, svgX + svgWidth];
			const xAxisSize = 30;

			// const yDomain = d3.extent(slicedValues, (value: DateAndValue_Type) => Number(value.value));
			const [xDomain, xRange, yDomain, yRange] = [
				d3.extent(slicedValues, (value: DateAndValue_Type) => value.date) as [Date, Date],
				[0, svgWidth],
				d3.extent(slicedValues, (value: DateAndValue_Type) => Number(value.value)) as [number, number],
				[0, svgHeight - 100] // y 축 길이 제어는 range 로 해라
			];

			const [utcScale, linearScale] = [d3.scaleUtc(xDomain, xRange), d3.scaleLinear(yDomain, yRange)];
			const line = d3
				.line<DateAndValue_Type>()
				.x(utc => utcScale(utc.date))
				.y(linear => linearScale(Number(linear.value)));

			const svg = d3.select(svgRef.current).attr('style', `width: 100%; height: ${height}vh; padding: 20px;`);

			// 중첩되는 chart 제거
			svg.selectAll('*').remove();

			// x(axis bottom) 축
			// each 는 x 축에 벗어나는 부분을 제어한다. offset 이 커질수록 축의 가장자리에 숫자가 나오지 않는다.
			svg
				.append('g')
				.attr('style', `transform: translate(0, calc(100% - ${xAxisSize}px)) scale(0.9);`)
				.call(d3.axisBottom(utcScale).ticks(10).tickSizeOuter(0))
				.selectAll('.tick')
				.each(function (date, index, nodes) {
					const offset = 80;
					const node: Element = nodes[index];
					if (index === 0 && node.getBoundingClientRect().x - xAxisStartPosition < offset * 0.7) {
						d3.select(this).remove();
					}
					if (index === nodes.length - 1 && xAxisLastPosition - node.getBoundingClientRect().x < offset) {
						d3.select(this).remove();
					}
				});

			// axisRight y 축
			svg
				.append('g')
				.attr('transform', `translate(${svgWidth - 80}, 20)`) // y 축을 오른쪽으로 이동
				.call(d3.axisRight(linearScale).ticks(10)) // 오른쪽 축 함수 사용
				.call(g => g.select('.domain').remove()) // 축 라인 제거
				.call(g =>
					g
						.selectAll('.tick line')
						.clone() // 틱 라인 확장
						.attr('x2', '-100%') // y 축 우측으로 이동시키기
						.attr('stroke-opacity', 0.15)
				);

			// svg
			// 	.append('path')
			// 	.attr('fill', 'none')
			// 	.attr('stroke', 'steelblue')
			// 	.attr('stroke-width', 1.5)
			// 	.attr('d', line(slicedValues as DateAndValue_Type[]));
		}
	}, [values]);

	return (
		<div className={clsx(styles.LineChart, className && styles[className])}>
			<ChartWrapper ref={svgContainerRef} width={width}>
				<ChartFeatures>
					<BsCalendar4Week className='icon' />
					<ul>
						<li>1Y</li>
						<li>3Y</li>
						<li>5Y</li>
						<li>MAX</li>
					</ul>
				</ChartFeatures>
				<Chart>
					<Svg ref={svgRef} />
				</Chart>
			</ChartWrapper>
		</div>
	);
};

export default LineChart;
