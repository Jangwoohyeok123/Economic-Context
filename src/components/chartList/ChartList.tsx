import clsx from 'clsx';
import styles from './ChartList.module.scss';
import { useQueries } from '@tanstack/react-query';
import { getChartData, getIndicator } from '@/api/fred';
import const_queryKey from '@/const/queryKey';
import LineChart from '../charts/line/LineChart';
import { DateAndValue_Type, Indicator_Type } from '@/types/fred';
import SkeletonChartList from '../skeleton/SkeletonChartList';

interface ChartSwiper_Props {
	seriesIds: string[];
}

/** context data 가 넘어왔을 때 */
export default function ChartList({ seriesIds }: ChartSwiper_Props) {
	const queryChartValuesResults = useQueries({
		queries: seriesIds.map(seriesId => ({
			queryKey: [const_queryKey.context, seriesId],
			queryFn: () => getChartData(seriesId)
		}))
	});

	const queryIndicators = useQueries({
		queries: seriesIds.map(seriesId => ({
			queryKey: [const_queryKey.indicator, seriesId],
			queryFn: () => getIndicator(seriesId)
		})),
		combine: results => {
			return {
				data: results.map<Indicator_Type>(result => result.data as Indicator_Type)
			};
		}
	});

	const isLoading = queryChartValuesResults.some(result => result.isLoading) || queryIndicators.data.some(el => el === undefined);
	const combineChartValuesResults = {
		valuesArrays: queryChartValuesResults.map<DateAndValue_Type[]>(result => result.data?.dataArray || [])
	};

	const chartDatasForList = combineChartValuesResults.valuesArrays.map((values, index: number) => {
		return {
			indicator: queryIndicators.data[index],
			values: values
		};
	});

	return (
		<div className={clsx(styles.ChartList)}>
			{isLoading ? (
				<SkeletonChartList />
			) : (
				chartDatasForList.length > 0 &&
				chartDatasForList.map((chartData, index: number) => {
					const { indicator, values } = chartData;

					return (
						<div key={index} className={clsx(styles.Chart)}>
							<LineChart indicator={indicator} values={values} width={100} height={30} className={'ChartList'} duration={3} />
						</div>
					);
				})
			)}
		</div>
	);
}
