import clsx from 'clsx';
import styles from './ChartSwiper.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQueries } from '@tanstack/react-query';
import { getChartData } from '@/backendApi/fred';
import const_queryKey from '@/const/queryKey';
import { useEffect, useState } from 'react';

import LineChart, { Value } from '../charts/line/LineChart';
import { Indicator } from '@/types/userType';

type chartDataForSwiper = {
	indicator: Indicator;
	values: Value[];
};

interface ChartSwiper {
	seriesIds: string[];
	context: any;
	chartDatasForSwiper: chartDataForSwiper[];
	setChartDatasForSwiper: React.Dispatch<React.SetStateAction<[]>>;
}

export default function ChartSwiper({ chartDatasForSwiper, setChartDatasForSwiper, seriesIds, context }: ChartSwiper) {
	const queryChartDatas = useQueries({
		queries: seriesIds.map(seriesId => ({
			queryKey: [const_queryKey.context, seriesId],
			queryFn: () => getChartData(seriesId)
		})),
		combine: results => {
			return {
				data: results.map(result => result.data)
			};
		}
	});

	// context + chartData 를 합쳐야 한다.
	/* 
      [
        {
          indicator: indicator,
          values: values
        }
      ]
  */

	useEffect(() => {
		if (queryChartDatas.data) {
			const temp = queryChartDatas?.data.map((chartData, index: number) => {
				const values = chartData?.dataArray || [{ date: 'a', value: 3 }];
				const indicator = context.customIndicators[index];

				return {
					indicator: indicator,
					values: values
				};
			});
			console.log('temp', temp);
			setChartDatasForSwiper(temp);
		}
	}, [context.customIndicators, queryChartDatas.data, setChartDatasForSwiper]);

	// if (chartDatasForSwiper.length !== 0) {
	// 	return <div>Loading...</div>;
	// }
	console.log('chartDatasForSwiper', chartDatasForSwiper);
	return (
		<div className={clsx(styles.ChartSwiper)}>
			<Swiper spaceBetween={50} slidesPerView={1} onSlideChange={() => console.log('slide change')}>
				{chartDatasForSwiper?.map((chartData, index: number) => {
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
