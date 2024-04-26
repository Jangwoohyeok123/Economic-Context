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
import IndicatorDescription from '@/components/IndicatorDescription/IndicatorDescription';

interface IndicatorCardWrapper_Props {
	$volatility: number;
}

// height는 부모요소에서 제어하지 말고 자식요소의 content 크기에서 쪼개서 부여하는게 맞다
const IndicatorCardWrapper = styled.div<IndicatorCardWrapper_Props>`
	width: 100%;
	height: 100%;
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
			<IndicatorDescription indicator={indicator} lastData={lastData} volatility={volatility} categoryId={categoryId} />
			<LineChart categoryId={categoryId} values={chartDatas} />
		</IndicatorCardWrapper>
	);
}
