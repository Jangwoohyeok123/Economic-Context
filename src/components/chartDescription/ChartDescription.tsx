import clsx from 'clsx';
import styles from './ChartDescription.module.scss';
import { SeriessType } from '@/types/fredType';

interface ChartDescriptionProps {
	indicator: SeriessType;
	children?: React.ReactNode;
}

export default function ChartDescription({ indicator, children }: ChartDescriptionProps) {
	return (
		<div className={clsx(styles.ChartDescription)}>
			<h3>{indicator.title}</h3>
			<p className={clsx(styles.notes)}>{indicator.notes}</p>
			<div className={clsx(styles.additional)}>
				<div>
					<div>
						<span>Frequency</span> : {indicator.frequency ? indicator.frequency : 'hello'}
					</div>
					<div>
						<span>Continued</span> :
						{indicator.observation_end === indicator.realtime_end ? ' continued' : ' discontinued'}
					</div>
					<div>
						<span>Period</span> : {indicator.observation_start} ~ {indicator.observation_end}
					</div>
				</div>
				{children}
			</div>
		</div>
	);
}
