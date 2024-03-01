import clsx from 'clsx';
import styles from './IndicatorCard.module.scss';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

interface IndicatorCardProps {
	title: string;
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
	title,
	leftButtonContent,
	leftButtonHandler,
	rightButtonContent,
	rightButtonHandler,
	pageType
}: IndicatorCardProps) {
	const refRightBtn = useRef<HTMLButtonElement>(null);
	const CardClassName = checkingPageTypeAndModifyClassName(pageType);
	const isLogin = useSelector(state => state.user.isLogin);

	return (
		<div className={clsx(styles[CardClassName])}>
			<h3>{title}</h3>
			<div className={clsx(styles.buttons)}>
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
	);
}

// , { [styles.on]: isLogin }
