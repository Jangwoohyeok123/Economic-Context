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

export default function CategoryId() {
	const router = useRouter();
	const { id: seriesId, title } = router.query;
	const [chartDatas, setChartDatas] = useState<DataItem[]>([]);
	const [indicators, setIndicators] = useState<Seriess_Type>({
		id: '',
		title: '',
		notes: '',
		observation_start: '',
		observation_end: ''
	});

	useEffect(() => {
		getChartData(seriesId as string)
			.then(chartDatas => {
				const { dataArray } = chartDatas;
				setChartDatas(dataArray);
			})
			.catch(err => {
				console.error(err.message);
			});

		getIndicator(seriesId as string).then(indicator => {
			const { seriesId: id, notes, observation_start, observation_end } = indicator;
			setIndicators(prev => ({
				...prev,
				seriesId: id,
				title: title as string,
				notes: notes ?? '',
				observation_start,
				observation_end
			}));
		});
	}, [seriesId]);

	return (
		<main className={clsx(styles.CategoryId, poppins.variable, roboto.variable)}>
			<div>asd</div>
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
