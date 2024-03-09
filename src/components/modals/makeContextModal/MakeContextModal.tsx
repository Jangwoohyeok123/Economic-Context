import clsx from 'clsx';
import styles from './MakeContextModal.module.scss';
import ReactDOM from 'react-dom';
import React, { useRef } from 'react';
import { MakeModalProps } from '@/types/modalInterface';
import { roboto, poppins } from '@/pages/_app';
import checkingModalSizeAndModifyClassName from '@/utils/checkingModalSizeAndModifyClassName';

export default function MakeContextModal({
	isModalOpen,
	setIsModalOpen,
	children,
	size,
	activeIndicators
}: MakeModalProps) {
	const ModalClassName = checkingModalSizeAndModifyClassName(size);
	const refInputForContextName = useRef<HTMLInputElement>(null);

	return isModalOpen
		? ReactDOM.createPortal(
				<React.Fragment>
					<div className={clsx(styles.Overlay)}></div>
					<div className={clsx(styles[ModalClassName], roboto.variable, poppins.variable)}>
						<div className={clsx(styles.header)}>
							<h3>Create Context</h3>
							<span>Make your custom context</span>
						</div>
						<div className={clsx(styles.name)}>
							<h5>Name</h5>
							<input type='text' placeholder='Name of your context' ref={refInputForContextName} />
						</div>
						<div className={clsx(styles.selectedIndicators)}>
							<h5>Indicators</h5>
							<ul className={clsx(styles.selectedIndicators)}>
								<li>Interest: {activeIndicators.interest.length} 개의 지표들</li>
								<li>Exchange: {activeIndicators.exchange.length} 개의 지표들</li>
								<li>Consume: {activeIndicators.consume.length} 개의 지표들</li>
								<li>Production: {activeIndicators.production.length} 개의 지표들</li>
							</ul>
						</div>
						<div className={clsx(styles.buttons)}>
							<button className={clsx(styles.leftButton)} onClick={() => setIsModalOpen(false)}>
								Cancel
							</button>
							<button
								className={clsx(styles.rightButton)}
								onClick={() => {
									const contextName = refInputForContextName.current?.value;
									const contextIndicators = [];
									const activeIndicatorsKeys = Object.keys(activeIndicators);

									activeIndicatorsKeys.forEach(categoryName => {
										activeIndicators[categoryName].forEach(indicator => {
											if (indicator.isActive) {
												contextIndicators.push({
													title: indicator.title,
													seriesId: indicator.seriesId,
													categoryId: indicator.categoryId
												});
											}
										});
									});
								}}>
								Make
							</button>
						</div>
					</div>
				</React.Fragment>,
				document.body
		  )
		: null;
}
