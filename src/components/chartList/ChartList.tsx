import clsx from 'clsx';
import styles from './ChartList.module.scss';
import { useQueries } from '@tanstack/react-query';
import { getChartData, getIndicator } from '@/backendApi/fred';
import const_queryKey from '@/const/queryKey';
import LineChart from '../charts/line/LineChart';
import { SeriessType, DateValue_Type } from '@/types/fredType';

interface ChartSwiperProps {
	seriesIds: string[];
}

/** context data 가 넘어왔을 때 */
export default function ChartList({ seriesIds }: ChartSwiperProps) {
	const queryChartValues = useQueries({
		queries: seriesIds.map(seriesId => ({
			queryKey: [const_queryKey.context, seriesId],
			queryFn: () => getChartData(seriesId)
		})),
		combine: results => {
			return {
				valuesArrays: results.map<DateValue_Type[]>(result => result.data.dataArray)
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
				data: results.map<SeriessType>(result => result.data)
			};
		}
	});

	const isLoading =
		queryChartValues.valuesArrays.some(el => el === undefined) || queryIndicators.data.some(el => el === undefined);

	if (isLoading) return <div>Loading...</div>;

	const chartDatasForList = queryChartValues.valuesArrays.map((values, index: number) => {
		return {
			indicator: queryIndicators.data[index],
			values: values
		};
	});

	return (
		<div className={clsx(styles.ChartList)}>
			{chartDatasForList.length > 0 &&
				chartDatasForList?.map((chartData, index: number) => {
					const { indicator, values } = chartData;

					return (
						<div key={index} className={clsx(styles.Chart)}>
							<LineChart indicator={indicator} values={values} width={100} height={30} className={'ChartList'} />
						</div>
					);
				})}
		</div>
	);
}