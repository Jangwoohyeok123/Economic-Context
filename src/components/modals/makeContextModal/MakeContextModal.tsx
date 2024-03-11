import clsx from 'clsx';
import styles from './MakeContextModal.module.scss';
import ReactDOM from 'react-dom';
import { Indicator } from '@/types/dbInterface';
import { addContext } from '@/firebase/context';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { MakeModalProps } from '@/types/modalInterface';
import { roboto, poppins } from '@/pages/_app';
import { toggleValidationNameModal } from '@/actions/actions';
import checkingModalSizeAndModifyClassName from '@/utils/checkingModalSizeAndModifyClassName';
import const_categoryId from '@/const/categoryId';

export default function MakeContextModal({
	isModalOpen,
	setIsModalOpen,
	children,
	size,
	activeIndicators
}: MakeModalProps) {
	const dispatch = useDispatch();
	const ModalClassName = checkingModalSizeAndModifyClassName(size);
	const refInputForContextName = useRef<HTMLInputElement>(null);
	const [contextIndicators, setContextIndicators] = useState<Indicator[]>([]);
	// const isValidationModalOpen = useSelector(state => state.validateNameReducer.isOpen);

	const makeContext = async () => {
		let contextName: string;
		if (refInputForContextName.current?.value !== '' && refInputForContextName.current?.value) {
			contextName = refInputForContextName.current?.value;
		} else {
			dispatch(toggleValidationNameModal());
			return;
		}

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

		addContext(contextName, contextIndicators);
	};

	useEffect(() => {
		const newContextIndicators: Indicator[] = [];
		console.log(activeIndicators);

		const activeIndicatorsKeys = Object.keys(activeIndicators);
		activeIndicatorsKeys.forEach(categoryName => {
			activeIndicators[categoryName].forEach(indicator => {
				if (indicator.isActive) {
					newContextIndicators.push({
						title: indicator.title,
						seriesId: indicator.seriesId,
						categoryId: indicator.categoryId
					});
				}
			});
		});

		setContextIndicators(newContextIndicators);
	}, [activeIndicators]);

	return isModalOpen && contextIndicators
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
								<li>
									Interest:{' '}
									{contextIndicators.filter(indicator => indicator.categoryId === const_categoryId.interest).length}{' '}
									개의 지표들
								</li>
								<li>
									Exchange:{' '}
									{contextIndicators.filter(indicator => indicator.categoryId === const_categoryId.exchange).length}{' '}
									개의 지표들
								</li>
								<li>
									Consume:{' '}
									{contextIndicators.filter(indicator => indicator.categoryId === const_categoryId.consume).length} 개의
									지표들
								</li>
								<li>
									Production:{' '}
									{contextIndicators.filter(indicator => indicator.categoryId === const_categoryId.production).length}{' '}
									개의 지표들
								</li>
							</ul>
						</div>
						<div className={clsx(styles.buttons)}>
							<button
								className={clsx(styles.leftButton)}
								onClick={() => {
									setIsModalOpen(false);
								}}>
								Cancel
							</button>
							<button className={clsx(styles.rightButton)} onClick={makeContext}>
								Make
							</button>
						</div>
					</div>
				</React.Fragment>,
				document.body
		  )
		: null;
}
