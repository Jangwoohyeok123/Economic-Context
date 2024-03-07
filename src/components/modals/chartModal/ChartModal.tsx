import clsx from 'clsx';
import axios from 'axios';
import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import styles from './ChartModal.module.scss';
import { roboto, poppins } from '@/pages/_app';
import { ChartModalProps } from '@/types/modalInterface';
import LineChart from '@/components/charts/line/LineChart';

export default function ChartModal({ isModalOpen, setIsModalOpen, children, seriesId, title }: ChartModalProps) {
	const [chartValues] = useState([]);

	useEffect(() => {
		axios.get(`/api/chartValues/${seriesId}`).then(response => console.log(response));
	}, []);

	return isModalOpen
		? ReactDOM.createPortal(
				<React.Fragment>
					<div className={clsx(styles.Overlay)}></div>
					<div className={clsx(roboto.variable, poppins.variable)}>
						<LineChart title={title} values={chartValues}></LineChart>
					</div>
				</React.Fragment>,
				document.body
		  )
		: null;
}
