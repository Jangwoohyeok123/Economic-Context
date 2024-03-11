import clsx from 'clsx';
import styles from './CategoryId.module.scss';
import { useRouter } from 'next/router';
import { Poppins, Roboto } from 'next/font/google';
import { useEffect, useState } from 'react';
import LineChart from '@/components/charts/line/LineChart';
import searchDotAndSetValue from '@/utils/searchDotAndSetValue';

interface DataItem {
	date: Date;
	value: number;
}

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['300', '400', '500'],
	variable: '--baseFont'
});

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500'],
	variable: '--pointFont'
});

export default function CategoryId() {
	const router = useRouter();
	const { id: seriesId } = router.query;
	const [Data, setData] = useState([]);
	const [IndicatorData, setIndicatorData] = useState();
	const [Values, setValues] = useState<DataItem[]>([]);

	useEffect(() => {
		fetch(`/api/chartData?seriesId=${seriesId}`)
			.then(response => {
				return response.json();
			})
			.then(data => {
				return setData(data.observations);
			});

		fetch(`/api/indicatorData?seriesId=${seriesId}`)
			.then(response => {
				return response.json();
			})
			.then(indicatorData => setIndicatorData(indicatorData));
	}, []);

	useEffect(() => {
		console.log(IndicatorData);
	}, [IndicatorData]);

	useEffect(() => {
		setValues(
			searchDotAndSetValue(Data).map((data, idx) => {
				return {
					date: new Date(data.date),
					value: Number(data.value)
				};
			})
		);
	}, [Data]);

	return (
		<main className={clsx(styles.CategoryId, poppins.variable, roboto.variable)}>
			{Values.length !== 0 && IndicatorData && (
				<LineChart values={Values} title={IndicatorData.indicator.seriess[0].title} />
			)}
		</main>
	);
}
