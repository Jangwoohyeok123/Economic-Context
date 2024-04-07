import clsx from 'clsx';
import styles from './Skeleton.module.scss';

export default function SkeletonIndicatorCard() {
	return (
		<div className={clsx(styles.Indicator)}>
			<div className={clsx(styles.title)}></div>
			<div className={clsx(styles.chart)}></div>
			<div className={clsx(styles.description)}></div>
		</div>
	);
}
