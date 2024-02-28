import clsx from 'clsx';
import styles from './IndicatorCard.module.scss';

type leftButton = {
	handler: () => void;
	desc: string;
};

type rightButton = {
	handler: () => void;
	desc: string;
};

interface IndicatorCardProps {
	title: string;
	leftButton: leftButton;
	rightButton: rightButton;
	pageType: string;
}

function checkingPageTypeAndModifyClassName(pageType: string) {
	let className;
	if (pageType === 'main') {
		className = 'IndicatorCardMainPage';
	} else if ((pageType = 'dashbaord')) {
		className = 'IndicatorCardDashboard';
	} else {
		className = 'defaultClassName';
	}

	return className;
}

export default function IndicatorCard({ title, leftButton, rightButton, pageType }: IndicatorCardProps) {
	const CardClassName = checkingPageTypeAndModifyClassName(pageType);
	return (
		<div className={clsx(styles[CardClassName])}>
			<h3>{title}</h3>
			<div className={clsx(styles.buttons)}>
				<button type='button' onClick={leftButton.handler}>
					{leftButton.desc}
				</button>
				<button type='button' onClick={rightButton.handler}>
					{rightButton.desc}
				</button>
			</div>
		</div>
	);
}
