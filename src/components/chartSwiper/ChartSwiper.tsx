import clsx from 'clsx';
import styles from './ChartSwiper.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQueries } from '@tanstack/react-query';
import { getChartData, getIndicator } from '@/api/fred';
import const_queryKey from '@/const/queryKey';
import LineChart from '../charts/line/LineChart';
import { ChartDataForSwiper_Type, SeriessType, DateValue_Type } from '@/types/fred';
import { Indicator } from '@/types/userType';

interface ChartSwiper_Props {
	seriesIds: string[];
}

/** context data 가 넘어왔을 때 */
export default function ChartSwiper({ seriesIds }: ChartSwiper_Props) {
	const queryChartValues = useQueries({
		queries: seriesIds.map(seriesId => ({
			queryKey: [const_queryKey.context, seriesId],
			queryFn: () => getChartData(seriesId)
		})),
		combine: results => {
			return {
				valuesArrays: results.map<DateValue_Type[]>(result => result.data?.dataArray)
			};
		}
	});

	const queryIndicators = useQueries({
		queries: seriesIds.map(seriesId => ({
			queryKey: [const_queryKey.indicator, seriesId],
			queryFn: () => getIndicator(seriesId)
		})),
		combine: results => {
			return {
				data: results.map<OriginSeriess_Type>(result => result.data)
			};
		}
	});

	const isLoading =
		queryChartValues.valuesArrays.some(el => el === undefined) || queryIndicators.data.some(el => el === undefined);

	if (isLoading) return <div>Loading...</div>;

	const chartDatasForSwiper = queryChartValues.valuesArrays.map((values, index: number) => {
		return {
			indicator: queryIndicators.data[index],
			values: values
		};
	});

	return (
		<div className={clsx(styles.ChartSwiper)}>
			<Swiper spaceBetween={50} slidesPerView={1} onSlideChange={() => console.log('slide change')}>
				{chartDatasForSwiper.length > 0 &&
					chartDatasForSwiper?.map((chartData, index: number) => {
						const { indicator, values } = chartData;

						return (
							<SwiperSlide key={index}>
								<LineChart indicator={indicator} values={values} />
							</SwiperSlide>
						);
					})}
			</Swiper>
		</div>
	);
}
