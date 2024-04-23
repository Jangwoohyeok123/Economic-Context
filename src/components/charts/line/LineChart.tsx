import styled from 'styled-components';
import * as d3 from 'd3';
import renderChartSvg from '@/utils/renderChartSvg';
import prepareValues_ListByPeriod from '@/utils/setPeriodValues_List';
import makeDebouncedHandler from '@/utils/makeDebounceHandler';
import { Indicator_Type, DateAndValue_Type } from '@/types/fred';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { changeCategoryIdToColor } from '@/utils/changeNameToCategoryId';

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

interface ChartFeature_Props {
	$chartColor: string;
}

const ChartFeatures = styled.div<ChartFeature_Props>`
	height: var(--chartHeaderSize);
	background: ${Props => Props.$chartColor};
	display: flex;
	justify-content: right;
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
		gap: 10px;

		li {
			cursor: pointer;
			font-size: 0.8rem;
		}
	}
`;

const ChartSvgWrapper = styled.div`
	display: flex;
	height: calc(100% - var(--chartHeaderSize));
	border-bottom: 1px solid #fff;
`;

const Svg = styled.svg`
	width: 100%;
	background: var(--bgColor-light);
`;

export interface LineChart_Props {
	categoryId: number;
	children?: React.ReactElement;
	height?: number;
	width?: number;
	values: DateAndValue_Type[];
	className?: string;
}

/**
 * @categoryId number
 * @values DateAndValue_Type[]
 * @height [x]vh
 * @width [y]%
 * @className
 */
const LineChart = ({ categoryId, values: values_List, width = 100, height = 65, className }: LineChart_Props) => {
	const rootSvgRef = useRef<SVGSVGElement>(null);
	const rootSvgContainerRef = useRef<HTMLDivElement>(null);
	const [duration, setDuration] = useState<number>(10);
	const lastDate = values_List[values_List.length - 1].date;

	// resize 이벤트 발생시 차트 다시그리기
	useEffect(() => {
		const resetChart = () => {
			// tooltip 남아있는 현상 제거
			if (rootSvgRef.current && rootSvgContainerRef.current) {
				d3.select(rootSvgRef.current).selectAll('*').remove();
				renderChartSvg(rootSvgRef.current, values_List, height, duration);
			}
		};
		const debounced_resetChart = makeDebouncedHandler(resetChart, 200);

		window.addEventListener('resize', debounced_resetChart);

		return () => {
			window.removeEventListener('resize', debounced_resetChart);
		};
	}, []);

	// duration 변경시 데이터를 변경하고 차트 다시그리기
	// duration 변경시 tooltip 을 다시생성한다.
	useEffect(() => {
		if (!rootSvgRef.current) return;
		d3.select(rootSvgRef.current).selectAll('*').remove();

		const preparedValues_List: DateAndValue_Type[] = prepareValues_ListByPeriod(duration, values_List, lastDate);
		renderChartSvg(rootSvgRef.current, preparedValues_List, height, duration);
	}, [duration]);

	// 초기렌더링 문제문제 해결을 위해서 빈배열 useEffect추가
	useEffect(() => {
		if (rootSvgRef.current) {
			d3.select(rootSvgRef.current).selectAll('*').remove();
			renderChartSvg(rootSvgRef.current, values_List, height, duration);
		}
	}, [values_List]);

	return (
		<div className={className}>
			<ChartWrapper ref={rootSvgContainerRef} width={width}>
				<ChartFeatures $chartColor={changeCategoryIdToColor(categoryId)}>
					<ul>
						<li onClick={() => setDuration(1)}>1Y</li>
						<li onClick={() => setDuration(3)}>3Y</li>
						<li onClick={() => setDuration(5)}>5Y</li>
						<li onClick={() => setDuration(10)}>MAX</li> {/* 10은 max를 의미한다 */}
					</ul>
				</ChartFeatures>
				<ChartSvgWrapper>
					<Svg ref={rootSvgRef} />
				</ChartSvgWrapper>
			</ChartWrapper>
		</div>
	);
};

export default LineChart;
