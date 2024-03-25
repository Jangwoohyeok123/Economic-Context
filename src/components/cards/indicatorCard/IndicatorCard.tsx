import clsx from 'clsx';
import styles from './IndicatorCard.module.scss';
import { useRouter } from 'next/router';
import { cleanString } from '@/utils/cleanString';
import { Indicator } from '@/types/userType';

interface IndicatorCardProps extends Indicator {
	children: React.ReactNode;
	className?: string;
}
/**
 * - required props
 * @param title
 * @param seriesId morepage 로 이동하기 위해 필요하다.
 * @param categoryId morepage 로 이동하기 위해 필요하다.
 * @param observation_end
 * @param observation_start
 * @returns title, 기간 정보가 담기 card 를 반환한다. className 을 통해 커스텀 가능하다.
 */
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
	const cleandTitle = title ? cleanString(title) : 'title';
	const localRoutingUrl = process.env.NEXT_PUBLIC_FRONT_URL_LOCAL;
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
