import clsx from 'clsx';
import styles from './IndicatorCard.module.scss';
import { useRouter } from 'next/router';
import { cleanString } from '@/utils/cleanString';
import { frontUrl } from '@/pages/_app';
import { Indicator_Type } from '@/types/fred';
import { changeCategoryIdToColor } from '@/utils/changeNameToCategoryId';

interface IndicatorCard_Props {
	categoryId: number;
	indicator: Indicator_Type;
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
export default function IndicatorCard({ indicator, categoryId, children, className }: IndicatorCard_Props) {
	const { title, id: seriesId, observation_start, observation_end, notes } = indicator ?? {}; // `??` indicator가 없을 때 생기는 에러를 위한 널병합연산자
	const router = useRouter();
	const cleandTitle = title ? cleanString(title) : 'title';
	const routeMorePage = (seriesId: string) => {
		router.push(`${frontUrl}/${seriesId}?title=${cleandTitle}&categoryId=${categoryId}`);
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
				<p>{notes ? notes : 'This indicator does not have information about the indicator description.'}</p>
				{children}
			</div>
		</div>
	);
}
