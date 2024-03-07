import clsx from 'clsx';
import axios from 'axios';
import ReactDOM from 'react-dom';
import React, { useEffect, useState as useState } from 'react';
import styles from './ChartModal.module.scss';
import { roboto, poppins } from '@/pages/_app';
import { ChartModalProps } from '@/types/modalInterface';
import LineChart from '@/components/charts/line/LineChart';
import { useRouter } from 'next/router';

export default function ChartModal({ isChartModalOpen, setIsChartModalOpen, children }: ChartModalProps) {
	const [chartValues, setChartValues] = useState([]);
	const router = useRouter();
	const { seriesId } = router.query;

	const clearUrl = () => {
		const currentQuery = { ...router.query };
		const newUrl = {
			pathname: router.pathname,
			query: null
		};

		router.replace(newUrl, undefined, { shallow: true });
	};

	useEffect(() => {
		if (!seriesId) return;
		// title 용도
		axios.get(`/api/chartValues?seriesId=${seriesId}`).then(response => {
			console.log(
				response.data.observations.observations.map(el => {
					return { date: new Date(el.date), value: Number(el.value) };
				})
			);
		});
		// .then(data => setData(data));

		// observation 용도
		axios.get(`/api/indicator?seriesId=${seriesId}`).then(response => {
			console.log(response.data.indicator.seriess[0].title);
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
						<LineChart title={'ddd'} values={chartValues}></LineChart>
					</div>
				</React.Fragment>,
				document.body
		  )
		: null;
}
