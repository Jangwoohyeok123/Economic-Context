import clsx from 'clsx';
import styles from './IndicatorCard.module.scss';
import { useRouter } from 'next/router';
import { cleanString } from '@/utils/cleanString';
import { frontUrl } from '@/pages/_app';
import { DateAndValue_Type, Indicator_Type } from '@/types/fred';
import LineChart from '@/components/charts/line/LineChart';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getChartData } from '@/api/fred';
import styled from 'styled-components';

const IndicatorCardWrapper = styled.div``;

interface IndicatorCard_Props {
	categoryId: number;
	indicator: Indicator_Type;
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
export default function IndicatorCard({ indicator, categoryId, children, className, currentPage }: IndicatorCard_Props) {
	const { title, id: seriesId, observation_start, observation_end, notes } = indicator;
	const router = useRouter();
	const cleandTitle = title ? cleanString(title) : 'title';
	const routeMorePage = (seriesId: string) => router.push(`${frontUrl}/${seriesId}?title=${cleandTitle}&categoryId=${categoryId}`);
	const [chartDatas, setChartDatas] = useState<DateAndValue_Type[]>([]);
	console.log(currentPage, 'rerender', chartDatas);

	useEffect(() => {
		getChartData(seriesId).then(data => {
			const { dataArray } = data;
			setChartDatas(dataArray);
		});
	}, [seriesId, currentPage]);

	if (chartDatas.length === 0) return <div>loading</div>;

	return (
		<IndicatorCardWrapper>
			<LineChart categoryId={categoryId} indicator={indicator} values={chartDatas} width={100} height={40} duration={1} />
			<div className={clsx(styles.cardWrap)}>
				<div className={clsx(styles.IndicatorCard, className)} onClick={() => routeMorePage(seriesId)}>
					{/* <div className={styles.header}>
						<h3>{cleandTitle}</h3>
						<div className={clsx(styles.period)}>
							<div>
								Period: {observation_start} ~ {observation_end}
							</div>
						</div>
					</div> */}
					{/* <p>{notes ? notes : 'This indicator does not have information about the indicator description.'}</p> */}
					{children}
				</div>
			</div>
		</IndicatorCardWrapper>
	);
}
