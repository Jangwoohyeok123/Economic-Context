import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import clsx from 'clsx';
import styles from './LineChart.module.scss';
import { Indicator_Type, DateAndValue_Type } from '@/types/fred';
import styled from 'styled-components';
import makeDebouncedHandler from '@/utils/makeDebounceHandler';
import filterChartValues from '@/utils/filterChartValues';
import setPeriodValues_List from '@/utils/setPeriodValues_List';
import createChart from '@/utils/createChart';

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

	> div {
		font-size: 0.9rem;
		opacity: 0.9;
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
 * @className
 */
const LineChart = ({ indicator, values: values_List, width = 100, height = 65, className }: LineChart_Props) => {
	const rootSvgRef = useRef<SVGSVGElement>(null);
	const rootSvgContainerRef = useRef<HTMLDivElement>(null);
	const { frequency } = indicator;
	const [duration, setDuration] = useState<number>(10);

	// 차트설정 로직
	useEffect(() => {
		const resetChart = () => {
			// 차트초기화
			if (rootSvgRef.current) {
				d3.select(rootSvgRef.current).selectAll('*').remove();
				createChart(rootSvgRef.current, values_List, duration, setDuration, height);
			}
		};
		const debounced_resetChart = makeDebouncedHandler(resetChart, 200);

		window.addEventListener('resize', debounced_resetChart);
		resetChart();

		return () => {
			window.removeEventListener('resize', debounced_resetChart);
		};
	}, [values_List]);

	// duration의 변경시 차트 새로그리기
	useEffect(() => {
		if (rootSvgRef.current) {
			d3.select(rootSvgRef.current).selectAll('*').remove();
			createChart(rootSvgRef.current, values_List, duration, setDuration, height); 
		}
	}, [duration]);

	return (
		<div className={clsx(styles.LineChart, className && styles[className])}>
			<ChartWrapper ref={rootSvgContainerRef} width={width}>
				<ChartFeatures>
					<div>Frequency: {frequency}</div>
					<ul>
						<li onClick={() => setDuration(1)}>1Y</li>
						<li onClick={() => setDuration(3)}>3Y</li>
						<li onClick={() => setDuration(5)}>5Y</li>
						<li onClick={() => setDuration(10)}>MAX</li>
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
