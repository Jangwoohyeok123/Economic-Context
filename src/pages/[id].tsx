import clsx from 'clsx';
import styles from './CategoryId.module.scss';
import LineChart from '@/components/charts/line/LineChart';
import { useRouter } from 'next/router';
import { poppins, roboto } from './_app';
import { useEffect, useState } from 'react';
import searchDotAndSetValue from '@/utils/searchDotAndSetValue';
import { getChartData } from '@/backendApi/fred';

interface DataItem {
	date: Date;
	value: number;
}

export default function CategoryId() {
	const router = useRouter();
	const { id: seriesId } = router.query;

	useEffect(() => {
		getChartData(seriesId as string).then(chartData => console.log(chartData));
	}, []);

	return <main className={clsx(styles.CategoryId, poppins.variable, roboto.variable)}></main>;
}
