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

interface IndicatorCardWrapper_Props {
	volatility: number;
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
					const { volatility } = props;
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

	if (chartDatas.length === 0) return <div>loading</div>;

	const [prevData, lastData] = [Number(chartDatas[chartDatas.length - 2].value), Number(chartDatas[chartDatas.length - 1].value)];

	const volatility = getVolatility(prevData, lastData);

	return (
		<IndicatorCardWrapper volatility={volatility}>
			<LineChart categoryId={categoryId} values={chartDatas} width={100} height={40} duration={1} />
			<div className={'notChart ' + className}>
				<h3>{title}</h3>
				<div className='right'>
					<div>{children}</div>
					<div className='values'>
						<span>{lastData}</span>
						<span>{volatility >= 0 ? `(+${volatility}%)` : `(${volatility}%)`}</span>
						<div>last_updated: {favoriteIndicator.observation_end}</div>
					</div>
				</div>
			</div>
		</IndicatorCardWrapper>
	);
}

// onClick={() => routeMorePage(seriesId)}

{
	/* <div className={styles.header}>
						<h3>{cleandTitle}</h3>
						<div className={clsx(styles.period)}>
							<div>
								Period: {observation_start} ~ {observation_end}
							</div>
						</div>
					</div> */
}
{
	/* <p>{notes ? notes : 'This indicator does not have information about the indicator description.'}</p> */
}
