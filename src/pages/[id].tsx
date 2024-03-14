import clsx from 'clsx';
import styles from './CategoryId.module.scss';
import LineChart from '@/components/charts/line/LineChart';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getChartData, getIndicator } from '@/backendApi/fred';
import { poppins, roboto } from './_app';
import { Seriess_Type } from '@/types/fredType';

interface DataItem {
	date: Date;
	value: number;
}

export default function IndicatorId() {
	const router = useRouter();
	const { id, title } = router.query;
	const [chartDatas, setChartDatas] = useState<DataItem[]>([]);
	const [indicators, setIndicators] = useState<Seriess_Type>({
		id: '',
		title: '',
		notes: '',
		observation_start: '',
		observation_end: '',
		frequency: '',
		frequency_short: '',
		units: '',
		units_short: '',
		popularity: 0,
		seasonal_adjustment: '',
		seasonal_adjustment_short: ''
	});

	useEffect(() => {
		getChartData(id as string)
			.then(chartDatas => {
				const { dataArray } = chartDatas;
				setChartDatas(dataArray);
			})
			.catch(err => {
				console.error(err.message);
			});

		getIndicator(id as string).then((indicator: Seriess_Type) => {
			const {
				id,
				notes,
				observation_start,
				observation_end,
				frequency,
				frequency_short,
				units,
				units_short,
				popularity,
				seasonal_adjustment,
				seasonal_adjustment_short
			} = indicator;
			setIndicators(prev => ({
				...prev,
				id,
				title: title as string, // Indicator 카드 컴포넌트에게서 router.query 를 통해 전달받은 값입니다.
				notes: notes ?? '',
				observation_start,
				observation_end,
				frequency,
				frequency_short,
				units,
				units_short,
				popularity
			}));
		});
	}, []);

	return (
		<main className={clsx(styles.CategoryId, poppins.variable, roboto.variable)}>
			{chartDatas.length && indicators && <LineChart indicators={indicators} values={chartDatas} />}
		</main>
	);
}

/* promise 와 async/await 의 차이점
	[ async-await ] => '변수선언 = 비동기함수결과' 의 직관적인 코드 작성가능하다.
	try {
		const { realtime_start, realtime_end, dataArray } = await getChartDataseriesId as string);
		return { realtime_start, realtime_end, dataArray };
	} catch (err) {
		console.error()
		return 'fallback value';
	}

	[ promise ] => 'promise 객체의 then 에서 변수선언 후 처리하는 방식으로 상대적으로 직관적이지 않다.'
	getChartData(seriesId as string).then((result) => {
		const { realtime_start, realtime_end, dataArray } = result;
	})

	[ useEffect 에서 async vs promise ]
	promise 가 개인적으로 맘에드는 이유는 useEffect 에서 await 를 쓰기 위해서는 async() => {}(); 꼴의
	비동기 즉시실행함수를 사용해야하기 때문에 프로미스를 생각했다.
*/
