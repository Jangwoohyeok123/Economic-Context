import { useRouter } from 'next/router';
import { cleanString } from '@/utils/cleanString';
import { frontUrl } from '@/pages/_app';
import { DateAndValue_Type, Indicator_Type } from '@/types/fred';
import LineChart from '@/components/charts/line/LineChart';
import { useEffect, useState } from 'react';
import { getChartData } from '@/api/fred';
import styled from 'styled-components';
import getVolatility from '@/utils/getVolatility';
import { FavoriteIndicator_Type } from '@/types/favorite';
import Loading from '@/components/loading/Loading';
import { IndicatorCardContainer, IndicatorCardContainer_Props } from '../indicatorCard/IndicatorCard';
import IndicatorDescription from '@/components/IndicatorDescription/IndicatorDescription';

const FavoriteIndicatorCardContainer = styled(IndicatorCardContainer)<IndicatorCardContainer_Props>``;

interface FavoriteIndicatorCard_Props {
	categoryId: number;
	favoriteIndicator: FavoriteIndicator_Type;
	children: React.ReactNode;
	className?: string;
	currentPage: number;
}
/**
 * - required props
 * @param title
 * @param seriesId morepage 로 이동하기 위해 필요하다.
 * @param categoryId morepage 로 이동하기 위해 필요하다.
 * @param observation_end
 * @param observation_start
 * @returns title, 기간 정보가 담기 card 를 반환한다. className 을 통해 커스텀 가능하다.
 */
export default function FavoriteIndicatorCard({ favoriteIndicator, categoryId, children, className, currentPage }: FavoriteIndicatorCard_Props) {
	const { title, seriesId, observation_start, observation_end, notes } = favoriteIndicator;
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

	if (chartDatas.length === 0) return <Loading />;

	const [prevData, lastData] = [Number(chartDatas[chartDatas.length - 2].value), Number(chartDatas[chartDatas.length - 1].value)];

	const volatility = getVolatility(prevData, lastData);

	return (
		<FavoriteIndicatorCardContainer $volatility={volatility}>
			<IndicatorDescription
				title={favoriteIndicator.title}
				observation_end={favoriteIndicator.observation_end}
				lastData={lastData}
				volatility={volatility}
				categoryId={categoryId}
			/>
			<div className='lineChartWrapper'>
				<LineChart categoryId={categoryId} values={chartDatas} />
			</div>
		</FavoriteIndicatorCardContainer>
	);
}
