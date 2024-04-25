import { useRouter } from 'next/router';
import { cleanString } from '@/utils/cleanString';
import { frontUrl } from '@/pages/_app';
import { DateAndValue_Type, Indicator_Type } from '@/types/fred';
import LineChart from '@/components/charts/line/LineChart';
import { useEffect, useState } from 'react';
import { getChartData } from '@/api/fred';
import styled from 'styled-components';
import getVolatility from '@/utils/getVolatility';
import Loading from '@/components/loading/Loading';

interface IndicatorCardWrapper_Props {
	$volatility: number;
}

const IndicatorCardWrapper = styled.div<IndicatorCardWrapper_Props>`
	.notChart {
		padding: 0 20px;
		background: #fff;
		display: flex;
		padding-top: 20px;
		justify-content: space-between;
		align-items: top;
		height: 130px;

		h3 {
			font-weight: 400;
			width: 60%;
		}

		.values {
			padding-top: 20px;

			span:nth-of-type(1) {
				font-size: 1.7rem;
				font-weight: 500;
				padding-right: 6px;
			}

			span:nth-of-type(2) {
				font-size: 0.85rem;
				color: ${props => {
					const { $volatility: volatility } = props;
					if (volatility > 0) return 'red';
					if (volatility === 0) return '#111';
					else return 'blue';
				}};
			}
			> div {
				font-size: 0.7rem;
				opacity: 0.7;
			}
		}
	}
`;

interface IndicatorCard_Props {
	categoryId: number;
	indicator: Indicator_Type;
	children: React.ReactNode;
	className?: string;
	currentPage: number;
}
/**
 *
 * @param title
 * @param seriesId
 * @param categoryId
 * @param observation_end
 * @param observation_start
 * @returns
 */
export default function IndicatorCard({ indicator, categoryId, children, className, currentPage }: IndicatorCard_Props) {
	const { title, id: seriesId } = indicator ?? {}; // `??` indicator가 없을 때 생기는 에러를 위한 널병합연산자
	const router = useRouter();
	const cleandTitle = title ? cleanString(title) : 'title';
	const routeMorePage = (seriesId: string) => router.push(`${frontUrl}/${seriesId}?title=${cleandTitle}&categoryId=${categoryId}`);
	const [chartDatas, setChartDatas] = useState<DateAndValue_Type[]>([]);

	useEffect(() => {
		getChartData(seriesId).then(data => {
			const { dataArray } = data;
			setChartDatas(dataArray);
		});
	}, [seriesId, currentPage]);

	// chartData를 불러오는 로딩중에 보여줄 clipLoader
	if (chartDatas.length === 0) return <Loading />;

	const [prevData, lastData] = [Number(chartDatas[chartDatas.length - 2].value), Number(chartDatas[chartDatas.length - 1].value)];

	const volatility = getVolatility(prevData, lastData);

	return (
		<IndicatorCardWrapper $volatility={volatility}>
			<LineChart categoryId={categoryId} values={chartDatas} width={100} height={40} />
			<div className={'notChart ' + className}>
				<h3>{title}</h3>
				<div className='right'>
					<div>{children}</div>
					<div className='values'>
						<span>{lastData}</span>
						<span>{volatility >= 0 ? `(+${volatility}%)` : `(${volatility}%)`}</span>
						<div>last_updated: {indicator.observation_end}</div>
					</div>
				</div>
			</div>
		</IndicatorCardWrapper>
	);
}
