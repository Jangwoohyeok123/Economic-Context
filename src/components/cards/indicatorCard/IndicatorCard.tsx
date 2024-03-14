import clsx from 'clsx';
import styles from './IndicatorCard.module.scss';
import { cleanString } from '@/utils/cleanString';
import { useRouter } from 'next/router';

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
	const router = useRouter();
	const localRoutingUrl = 'http://localhost:3000';
	const cleandTitle = cleanString(title);
	const routeMorePage = (seriesId: string) => {
		router.push(`${localRoutingUrl}/${seriesId}?title=${cleandTitle}&categoryId=${categoryId}`);
	};
	return (
		<div className={clsx(styles.cardWrap)}>
			<div className={clsx(styles.IndicatorCard, className)} onClick={() => routeMorePage(seriesId)}>
				<div className={styles.header}>
					<h3>{cleandTitle}</h3>
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
