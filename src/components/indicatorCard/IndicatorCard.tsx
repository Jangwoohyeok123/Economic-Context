import clsx from 'clsx';
import styles from './IndicatorCard.module.scss';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Store from '@/types/storeInterface';
import { ActiveIndicators } from '../indicators/Indicators';
import { changeCategoryIdToName } from '@/utils/changeNameToCategoryId';

interface IndicatorCardProps {
	activeIndicators: ActiveIndicators;
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
		// refButtons의 DOM 노드가 event.target 또는 그 부모 중 하나인지 확인
		if (refButtons.current && !refButtons.current.contains(event.target as Node)) {
			pushSeriesIdToUrlAndModalOpen(seriesId);
		}
	};

	// // activeindicators 안에 특정 category 에서 sereisId 를 갖고있다면 active handling 을 해주는 함수
	// const isButtonActive = (categoryName: string, seriesId: string) => {
	// 	return activeIndicators[categoryName].includes(seriesId);
	// };

	/* 
								// isButtonActive(changeCategoryIdToName(categoryId), seriesId)
						// 	? clsx(styles.rightButton, styles.on)
	
	*/

	return (
		<div className={clsx(styles[CardClassName])} onClick={handleCardClick}>
			<h3>{title}</h3>
			<div className={clsx(styles.buttons)} ref={refButtons}>
				<button className={clsx(styles.leftButton)} type='button' onClick={leftButtonHandler}>
					{leftButtonContent}
				</button>
				{/* 이 버튼의 seriesId 가 activeIndicators 에 포함되어 있다면 styles.on 을 제거하고, 그렇지 않다면 추가한다.*/}
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
	);
}
