import clsx from 'clsx';
import styles from './IndicatorCard.module.scss';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Store from '@/types/storeInterface';

interface IndicatorCardProps {
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

	const pushSeriesIdToURL = (seriesId: string) => {
		router.push(`${router.pathname}?seriesId=${seriesId}`, undefined, { shallow: true });
		setIsChartModalOpen(true);
	};

	return (
		<>
			<div className={clsx(styles[CardClassName])} onClick={() => pushSeriesIdToURL(seriesId)}>
				<h3>{title}</h3>
				<div className={clsx(styles.buttons)} ref={refButtons}>
					<button className={clsx(styles.leftButton)} type='button' onClick={leftButtonHandler}>
						{leftButtonContent}
					</button>
					<button
						className={clsx(styles.rightButton)}
						ref={refRightBtn}
						type='button'
						onClick={() => {
							rightButtonHandler();
							if (isLogin) refRightBtn.current?.classList.toggle(styles.on);
						}}>
						{rightButtonContent}
					</button>
				</div>
			</div>
		</>
	);
}
