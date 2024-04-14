import clsx from 'clsx';
import styles from './Skeleton.module.scss';

export default function SkeletonChartList() {
	return (
		<div className={clsx(styles.ChartList)}>
			<div className={clsx(styles.Chart)}></div>
			<div className={clsx(styles.Chart)}></div>
			<div className={clsx(styles.Chart)}></div>
		</div>
	);
}
