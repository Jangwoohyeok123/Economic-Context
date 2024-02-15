import clsx from 'clsx';
import styles from './CategoryId.module.scss';
import { useRouter } from 'next/router';
import { Poppins, Roboto } from 'next/font/google';
import { useEffect, useState } from 'react';
import LineChart from '@/components/charts/line/LineChart';
import searchDotAndSetValue from '@/utils/valueUtils';

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
	const [Values, setValues] = useState<DataItem[]>([]);

	useEffect(() => {
		const a = fetch(`/api/observations?seriesId=${seriesId}`)
			.then(response => {
				return response.json();
			})
			.then(data => setData(data.observations));
	}, []);

	useEffect(() => {
		console.log(Data);
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
			{Values.length !== 0 && (
				<LineChart
					width={928}
					height={500}
					marginTop={20}
					marginRight={30}
					marginBottom={30}
					marginLeft={40}
					values={Values}
				/>
			)}
		</main>
	);
}
