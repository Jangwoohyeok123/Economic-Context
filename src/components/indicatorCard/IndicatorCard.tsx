import clsx from 'clsx';
import Store from '@/types/storeInterface';
import styles from './IndicatorCard.module.scss';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { EnhancedSeriess } from '@/types/fredInterface';
import { ActiveIndicators } from '../indicators/Indicators';
import { changeCategoryIdToName } from '@/utils/changeNameToCategoryId';

interface IndicatorCardProps {
	activeIndicators?: ActiveIndicators;
	data?: EnhancedSeriess;
	seriesId: string;
	categoryId: number;
	title: string;
	isChartModalOpen: boolean;
	setIsChartModalOpen: (isChartModalOpen: boolean) => void;
	leftButtonContent: string;
	leftButtonHandler: () => void;
	rightButtonContent: string;
	rightButtonHandler: () => void;
	pageType: string;
}

function checkingPageTypeAndModifyClassName(pageType: string) {
	let className = 'defaultClassName';
	if (pageType === 'main') {
		className = 'IndicatorCardMainPage';
	} else if (pageType === 'dashboard') {
		className = 'IndicatorCardDashboard';
	}

	return className;
}

export default function IndicatorCard({
	data,
	activeIndicators,
	seriesId,
	categoryId,
	title,
	isChartModalOpen,
	setIsChartModalOpen,
	leftButtonContent,
	leftButtonHandler,
	rightButtonContent,
	rightButtonHandler,
	pageType
}: IndicatorCardProps) {
	const router = useRouter();
	const refButtons = useRef<HTMLDivElement>(null);
	const refRightBtn = useRef<HTMLButtonElement>(null);
	const isLogin = useSelector((state: Store) => state.user.isLogin);
	const CardClassName = checkingPageTypeAndModifyClassName(pageType);

	const pushSeriesIdToUrlAndModalOpen = (seriesId: string) => {
		router.push(`${router.pathname}?seriesId=${seriesId}&title=${title}`, undefined, { shallow: true });
		setIsChartModalOpen(true);
	};

	const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (refButtons.current && !refButtons.current.contains(event.target as Node)) {
			pushSeriesIdToUrlAndModalOpen(seriesId);
		}
	};

	return (
		<>
			{activeIndicators ? (
				<div className={clsx(styles[CardClassName])} onClick={handleCardClick}>
					<h3>{title}</h3>
					<div className={clsx(styles.buttons)} ref={refButtons}>
						<button className={clsx(styles.leftButton)} type='button' onClick={leftButtonHandler}>
							{leftButtonContent}
						</button>
						<button
							// [styles.on]: clsx 에서 제공하는 조건부 스타일 util
							className={clsx(styles.rightButton, {
								[styles.on]: activeIndicators[changeCategoryIdToName(categoryId)].find(
									el => el.seriesId === seriesId && el.isActive
								)
							})}
							ref={refRightBtn}
							type='button'
							onClick={() => {
								rightButtonHandler();
							}}>
							{rightButtonContent}
						</button>
					</div>
				</div>
			) : (
				<>
					{data ? (
						<div className={clsx(styles[CardClassName])} onClick={handleCardClick}>
							<h3>{title}</h3>
							<div className={clsx(styles.buttons)} ref={refButtons}>
								<button className={clsx(styles.leftButton)} type='button' onClick={leftButtonHandler}>
									{leftButtonContent}
								</button>
								<button
									// [styles.on]: clsx 에서 제공하는 조건부 스타일 util
									className={clsx(styles.rightButton, {
										[styles.on]: data.isActive
									})}
									ref={refRightBtn}
									type='button'
									onClick={() => {
										rightButtonHandler();
									}}>
									{rightButtonContent}
								</button>
							</div>
						</div>
					) : null}
				</>
			)}
		</>
	);
}
