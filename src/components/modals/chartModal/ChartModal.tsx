import clsx from 'clsx';
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './ChartModal.module.scss';
import { roboto, poppins } from '@/pages/_app';
import { ChartModalProps } from '@/types/modalInterface';

export default function ChartModal({ isModalOpen, setIsModalOpen, children }: ChartModalProps) {
	return isModalOpen
		? ReactDOM.createPortal(
				<React.Fragment>
					<div className={clsx(styles.Overlay)}></div>
					<div className={clsx(roboto.variable, poppins.variable)}></div>
				</React.Fragment>,
				document.body
		  )
		: null;
}
