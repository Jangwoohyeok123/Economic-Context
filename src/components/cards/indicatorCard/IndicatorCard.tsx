import { useRouter } from 'next/router';
import { cleanString } from '@/utils/cleanString';
import { frontUrl } from '@/pages/_app';
import { DateAndValue_Type, Indicator_Type } from '@/types/fred';
import LineChart from '@/components/charts/line/LineChart';
import { getChartData } from '@/api/fred';
import styled from 'styled-components';
import getVolatility from '@/utils/getVolatility';
import Loading from '@/components/loading/Loading';
import IndicatorDescription from '@/components/IndicatorDescription/IndicatorDescription';
import { useQuery } from '@tanstack/react-query';
import const_queryKey from '@/const/queryKey';

export interface IndicatorCardContainer_Props {
	$volatility: number;
}

// height는 부모요소에서 제어하지 말고 자식요소의 content 크기에서 쪼개서 부여하는게 맞다
export const IndicatorCardContainer = styled.div<IndicatorCardContainer_Props>`
	width: 100%;
	height: 100%;
	background: #fff;
	padding: 10px 15px;
	border-radius: 30px;
	box-shadow: 5px 10px 10px #cfcfcf;

	.lineChartWrapper {
		width: 100%;
		height: 65%;

		> div {
			width: 100%;
			height: 100%;
		}
	}
`;

interface IndicatorCard_Props {
	categoryId: number;
	indicator: Indicator_Type;
	currentPage: number;
}

/**
 * @param title
 * @param seriesId
 * @param categoryId
 * @param observation_end
 * @param observation_start
 * @returns
 */
export default function IndicatorCard({ indicator, categoryId, currentPage }: IndicatorCard_Props) {
	const { title, id: seriesId } = indicator ?? {}; // `??` indicator가 없을 때 생기는 에러를 위한 널병합연산자
	const router = useRouter();
	const cleandTitle = title ? cleanString(title) : 'title';
	const routeMorePage = (seriesId: string) => router.push(`${frontUrl}/${seriesId}?title=${cleandTitle}&categoryId=${categoryId}`);

	const { data: chartDatas, isLoading } = useQuery<DateAndValue_Type[]>({
		queryKey: [const_queryKey.fred, 'getChartData', seriesId],
		queryFn: () =>
			getChartData(seriesId).then(data => {
				const { dataArray } = data;
				return dataArray;
			})
	});

	// chartData를 불러오는 로딩중에 보여줄 clipLoader
	if (isLoading || chartDatas === undefined || chartDatas.length === 0) return <Loading />;

	const [prevData, lastData] = [Number(chartDatas[chartDatas.length - 2].value), Number(chartDatas[chartDatas.length - 1].value)];

	const volatility = getVolatility(prevData, lastData);

	return (
		<IndicatorCardContainer $volatility={volatility}>
			<IndicatorDescription
				title={title}
				observation_end={indicator.observation_end}
				lastData={lastData}
				volatility={volatility}
				categoryId={categoryId}
			/>
			<div className='lineChartWrapper'>
				<LineChart categoryId={categoryId} values={chartDatas} />
			</div>
		</IndicatorCardContainer>
	);
}
