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
	position: relative;

	span {
		position: absolute;
		top: 50px;
		right: 10px;
		opacity: 0.8;
	}
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
	const rootSvgRef = useRef<SVGSVGElement>(null);
	const rootSvgContainerRef = useRef<HTMLDivElement>(null);
	const widthStyle = {
		width: `${width}%`
	};

	const lastDate = new Date(values[values.length - 1].date);
	const oneYearAgo = new Date(lastDate.setFullYear(lastDate.getFullYear() - 1));
	// 월별 데이터

	console.log('-------------------------------');
	console.log('1 년전 데이터 찾아보기');
	for (let i = values.length - 1; i >= values.length - 5; i--) {
		console.log('index: ', i);
		console.log('years: ', values[i].date.getFullYear());
		console.log('month: ', values[i].date.getMonth());
		console.log('day: ', values[i].date.getDay());
	}
	console.log('-------------------------------');

	if (duration === 1) {
	} else if (duration === 3) {
	} else if (duration === 5) {
	}

	const slicedValues = values.slice(-200);

	// 차트설정 로직
	useEffect(() => {
		if (values && rootSvgRef.current) {
			const { x: svgX, bottom: svgBottom, top: svgTop, width: svgWidth, height: svgHeight } = rootSvgRef.current.getBoundingClientRect();
			const [xAxisStartPosition, xAxisLastPosition] = [svgX, svgX + svgWidth];
			const xAxisHeight = 25;

			const [xMin, xMax] = d3.extent(slicedValues, (value: DateAndValue_Type) => value.date) as [Date, Date];
			const [yMin, yMax] = d3.extent(slicedValues, (value: DateAndValue_Type) => Number(value.value)) as [number, number];

			const [xDomain, xRange] = [
				[xMin, xMax],
				[10, svgWidth - 50]
			];

			// domain을 조절해서 화면에서 차트가 벗어나지 않도록 한다. domain의 최소, 최대를 10% 확장하여 domain이 range안에 있게만듦
			const expansion = 0.1;
			const [yDomain, yRange] = [
				[yMin * (1 - expansion), yMax * (1 + expansion)],
				[0, svgHeight - 50]
			];

			const [utcScale, linearScale] = [d3.scaleUtc(xDomain, xRange), d3.scaleLinear(yDomain, yRange)];
			const line = d3
				.line<DateAndValue_Type>()
				.x(utc => utcScale(utc.date))
				.y(linear => linearScale(Number(linear.value)));

			// chart가 그려질 도화지역할을 하는 svg 태그
			const rootSvg = d3.select(rootSvgRef.current).attr('style', `width: 100%; height: ${height}vh; padding: 20px; padding-top: 30px;`);

			// 중첩되는 chart 제거
			rootSvg.selectAll('*').remove();

			// x(axis bottom) 축
			// each 함수는 x 축에 벗어나는 tick을 제어한다. offset 이 커질수록 축의 가장자리에 날짜(tick)가 나오지 않는다.
			rootSvg
				.append('g')
				.attr('style', `transform: translate(0, calc(100% - ${xAxisHeight}px)); opacity: 0.9`)
				.call(d3.axisBottom(utcScale).ticks(10).tickSizeOuter(0))
				.selectAll('.tick')
				.each(function (_, index, ticks) {
					const xOffset = 100;
					const node: Element = ticks[index] as Element;

					// 양 끝에 tick이 x축에서 잘려서 보이는 현상을 제어하는 로직으로 this는 tick을 의미한다.
					if (index === 0 && node.getBoundingClientRect().x - xAxisStartPosition < xOffset * 0.3) {
						d3.select(this).remove();
					} else if (index === ticks.length - 1 && xAxisLastPosition - node.getBoundingClientRect().x < xOffset) {
						d3.select(this).remove();
					}
				});

			// axisRight y축
			rootSvg
				.append('g')
				.attr('style', `transform: translate(calc(100% - ${50}px), ${-xAxisHeight}px); opacity: 0.9;`)
				.call(d3.axisRight(linearScale).ticks(10))
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

					// y 축에서 tick 이 잘려서 보이는 현상 또는 너무 x 축에 가까운 것을 제거하는 로직
					if (index === 0 && tick.getBoundingClientRect().y - svgTop < yOffset * 0.4) {
						d3.select(this).remove();
					} else if (index === ticks.length - 1 && svgBottom - tick.getBoundingClientRect().y < yOffset * 0.7) {
						d3.select(this).remove();
					}
				});

			rootSvg
				.append('svg')
				.attr('width', '100%')
				.attr('height', '100%')
				.attr('transform', 'translate(0, 0)')
				.append('path')
				.attr('fill', 'none')
				.attr('stroke', 'steelblue')
				.attr('stroke-width', 1.5)
				.attr('d', line(slicedValues as DateAndValue_Type[]));

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
			<ChartWrapper ref={rootSvgContainerRef} width={width}>
				<ChartFeatures>
					<BsCalendar4Week className='icon' />
					<ul>
						<li>1Y</li>
						<li>3Y</li>
						<li>5Y</li>
						<li>MAX</li>
					</ul>
				</ChartFeatures>
				<span>units: {indicator.units_short}</span>
				<Chart>
					<Svg ref={rootSvgRef} />
				</Chart>
			</ChartWrapper>
		</div>
	);
};

export default LineChart;
