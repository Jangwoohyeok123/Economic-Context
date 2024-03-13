import clsx from 'clsx';
import styles from './IndicatorCard.module.scss';
import { cleanString } from '@/utils/cleanString';
import { useEffect, useRef } from 'react';

interface IndicatorCardProps {
	children: React.ReactNode;
	notes?: string;
	title: string;
	seriesId: string;
	categoryId: number;
	frequency: string;
	popularity: number;
	observation_end: string;
	observation_start: string;
	className: string;
}

export default function IndicatorCard({
	children,
	notes,
	title,
	seriesId,
	categoryId,
	frequency,
	popularity,
	observation_end,
	observation_start,
	className
}: IndicatorCardProps) {
	return (
		<div className={clsx(styles.cardWrap)}>
			<div className={clsx(styles.IndicatorCard, className)}>
				<div className={styles.header}>
					<h3>{cleanString(title)}</h3>
					<div className={clsx(styles.period)}>
						<div>
							Period: {observation_start} ~ {observation_end}
						</div>
					</div>
				</div>
				{children}
			</div>
		</div>
	);
}
