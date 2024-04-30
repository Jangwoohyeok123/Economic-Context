import styled from 'styled-components';
import * as d3 from 'd3';
import renderChartSvg from '@/utils/renderChartSvg';
import prepareValues_ListByPeriod from '@/utils/setPeriodValues_List';
import makeDebouncedHandler from '@/utils/makeDebounceHandler';
import { DateAndValue_Type } from '@/types/fred';
import React, { useEffect, useRef, useState } from 'react';
import { changeCategoryIdToColor } from '@/utils/changeNameToCategoryId';
import Loading from '@/components/loading/Loading';
import { setDefaultAutoSelectFamilyAttemptTimeout } from 'net';

interface ChartContainer_Props {
	width: number;
	height: number;
}

// min-height를 주면 렌더링을 나눠서 처리하는 경
const ChartContainer = styled.div<ChartContainer_Props>`
	width: 100%;
	height: calc(100% - 25px);
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
	display: flex;
	justify-content: right;
	align-items: center;
	padding: 0 var(--chartPadding);
	height: 25px; // chartFeaturesSize

	.icon {
		cursor: pointer;
	}

	> div {
		font-size: 0.9rem;
		opacity: 0.9;
	}

	> ul {
		display: flex;
		width: 100%;
		border: 1px solid var(--bgColor2);
		border-radius: 10px;
		height: 100%;

		li {
			height: 100%;
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			font-size: 0.8rem;
			border-left: 1px solid var(--bgColor2);
			transition: 0.3s;

			&:hover {
				background: ${props => props.$chartColor};
				color: white;
			}
		}

		li:nth-of-type(1) {
			border-left: none;
			border-top-left-radius: 10px;
			border-bottom-left-radius: 10px;
		}

		li:nth-of-type(3) {
			border-top-right-radius: 10px;
			border-bottom-right-radius: 10px;
		}

		li.active {
			background: ${props => props.$chartColor};
			color: white;
		}
	}
`;

const ChartSvgWrapper = styled.div`
	display: flex;
	height: 100%;
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
const LineChart = ({ categoryId, values: values_List, width = 20, height = 30, className }: LineChart_Props) => {
	const rootSvgRef = useRef<SVGSVGElement>(null);
	const rootSvgContainerRef = useRef<HTMLDivElement>(null);
	const [duration, setDuration] = useState<number>(10);
	const lastDate = values_List[values_List.length - 1].date;
	const preparedValues_List: DateAndValue_Type[] = prepareValues_ListByPeriod(duration, values_List, lastDate);

	// resize 이벤트 발생시 차트 다시그리기
	useEffect(() => {
		const resetChart = () => {
			// tooltip 남아있는 현상 제거
			if (rootSvgRef.current && rootSvgContainerRef.current) {
				d3.select(rootSvgRef.current).selectAll('*').remove();
				renderChartSvg(rootSvgRef.current, preparedValues_List, height, duration);
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
		renderChartSvg(rootSvgRef.current, preparedValues_List, height, duration);
	}, [duration]);

	// 초기렌더링 문제문제 해결을 위해서 빈배열 useEffect추가
	useEffect(() => {
		if (rootSvgRef.current) {
			d3.select(rootSvgRef.current).selectAll('*').remove();
			renderChartSvg(rootSvgRef.current, preparedValues_List, height, duration);
		}

		setDuration(10);
	}, [values_List]);

	return (
		<div className={className}>
			<ChartContainer ref={rootSvgContainerRef} width={width} height={height}>
				<ChartFeatures $chartColor={changeCategoryIdToColor(categoryId)}>
					<ul>
						<li className={duration === 1 ? 'active' : ''} onClick={() => setDuration(1)}>
							1Y
						</li>
						<li className={duration === 5 ? 'active' : ''} onClick={() => setDuration(3)}>
							5Y
						</li>
						<li className={duration === 10 ? 'active' : ''} onClick={() => setDuration(10)}>
							MAX
						</li>
					</ul>
				</ChartFeatures>
				<ChartSvgWrapper>
					<Svg ref={rootSvgRef} />
				</ChartSvgWrapper>
			</ChartContainer>
		</div>
	);
};

export default LineChart;
