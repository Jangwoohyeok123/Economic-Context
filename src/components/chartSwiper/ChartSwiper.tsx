import clsx from 'clsx';
import styles from './ChartSwiper.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQueries } from '@tanstack/react-query';
import { getChartData, getIndicator } from '@/api/fred';
import const_queryKey from '@/const/queryKey';
import LineChart from '../charts/line/LineChart';
import { DateAndValue_Type, Indicator_Type } from '@/types/fred';
import const_categoryId from '@/const/categoryId';

interface ChartSwiper_Props {
	seriesIds: string[];
}

/** context data 가 넘어왔을 때 */
export default function ChartSwiper({ seriesIds }: ChartSwiper_Props) {
	const queryChartValues = useQueries({
		queries: seriesIds.map(seriesId => ({
			queryKey: [const_queryKey.context, 'getChartData', seriesId],
			queryFn: () => getChartData(seriesId)
		})),
		combine: results => {
			// value 로 이뤄진 Array 를 담은 Array (2 차원 배열)
			const valuesArrays = results.map<DateAndValue_Type[]>(result => result.data?.dataArray || []);

			return {
				valuesArrays
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
				data: results.filter(result => result.data !== undefined).map<Indicator_Type>(result => result.data as Indicator_Type)
			};
		}
	});

	const isLoading = queryChartValues.valuesArrays.some(el => el === undefined) || queryIndicators.data.some(el => el === undefined);

	if (isLoading) return <div>Loading...</div>;

	const chartDatasForSwiper = queryChartValues.valuesArrays.map((values, index: number) => {
		return {
			indicator: queryIndicators.data[index],
			values: values
		};
	});

	return (
		<div className={clsx(styles.ChartSwiper)}>
			<Swiper spaceBetween={50} slidesPerView={1}>
				{chartDatasForSwiper.length > 0 &&
					chartDatasForSwiper?.map((chartData, index: number) => {
						const { indicator, values } = chartData;

						return (
							<SwiperSlide key={index}>
								{/* 구조변경 전 default 값으로 처리 */}
								<LineChart categoryId={const_categoryId.interest_fed} duration={3} indicator={indicator} values={values} />
							</SwiperSlide>
						);
					})}
			</Swiper>
		</div>
	);
}
