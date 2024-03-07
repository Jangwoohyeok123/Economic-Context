import clsx from 'clsx';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { useRouter } from 'next/router';
import styles from './ChartModal.module.scss';
import { roboto, poppins } from '@/pages/_app';
import React, { useEffect, useState } from 'react';
import { ChartModalProps } from '@/types/modalInterface';
import LineChart from '@/components/charts/line/LineChart';

export default function ChartModal({ isChartModalOpen, setIsChartModalOpen, children }: ChartModalProps) {
	const [chartValues, setChartValues] = useState([]);
	const router = useRouter();
	const { seriesId, title } = router.query;

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
		axios.get(`/api/chartValues?seriesId=${seriesId}`).then(response => {
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
