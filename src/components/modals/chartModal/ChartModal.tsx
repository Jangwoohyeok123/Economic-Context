import clsx from 'clsx';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { useRouter } from 'next/router';
import styles from './ChartModal.module.scss';
import { roboto, poppins } from '@/pages/_app';
import React, { useEffect, useState } from 'react';
import { ChartModalProps } from '@/types/modalType';
import LineChart from '@/components/charts/line/LineChart';

/*

	렌더링되면 2개의 api 를 호출한다.
	1. api/chartdata?seriesId={seriesId}
	2. api/indicatorData?seriesId={seriesId}
	
*/

export default function ChartModal({ isChartModalOpen, setIsChartModalOpen }: ChartModalProps) {
	const [chartValues, setChartValues] = useState([]);
	const router = useRouter();
	const { seriesId, title } = router.query;

	const clearUrl = () => {
		const newUrl = {
			pathname: router.pathname,
			query: null
		};

		router.replace(newUrl, undefined, { shallow: true });
	};

	useEffect(() => {
		if (!seriesId) return;
		axios.get(`/api/chartValues?seriesId=${seriesId}`).then(response => {
			console.log(response.data.observations.observations);
			setChartValues(
				response.data.observations.observations.map(el => {
					if (el.value === '.') el.value = 0;
					return { date: new Date(el.date), value: Number(el.value) };
				})
			);
		});
	}, [seriesId]);

	return isChartModalOpen
		? ReactDOM.createPortal(
				<React.Fragment>
					<div
						className={clsx(styles.Overlay)}
						onClick={() => {
							setIsChartModalOpen(!isChartModalOpen);
							clearUrl();
						}}></div>
					<div className={clsx(styles.ChartModal, roboto.variable, poppins.variable)}>
						{chartValues.length > 1 ? <LineChart title={title as string} values={chartValues}></LineChart> : null}
					</div>
				</React.Fragment>,
				document.body
		  )
		: null;
}
