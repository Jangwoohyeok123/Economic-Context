import clsx from 'clsx';
import styles from './Category.module.scss';
import { Indicator_Type } from '@/types/fred';
import IndicatorCard from '../cards/indicatorCard/IndicatorCard';
import BubblePopButton from '../bubblePopButton/BubblePopButton';

interface Category_Props {
	categoryData: Indicator_Type[];
	currentPage: number;
	itemsPerPage: number;
	categoryId: number;
	setIsAlertModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Category({
	categoryData,
	currentPage,
	itemsPerPage,
	categoryId,
	setIsAlertModalOpen
}: Category_Props) {
	return (
		<section className={clsx(styles.Category)}>
			{categoryData
				.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
				.map((series: Indicator_Type, idx: number) => {
					const { title, id: seriesId, frequency, popularity, observation_start, observation_end } = series;
					const notes = series.notes ?? '';

					return (
						<IndicatorCard
							key={idx}
							title={title}
							seriesId={seriesId}
							categoryId={categoryId}
							frequency={frequency as string}
							popularity={popularity ? popularity : 0}
							notes={notes ? notes : ''}
							observation_end={observation_end as string}
							observation_start={observation_start as string}
							className={styles.IndicatorCard}>
							<BubblePopButton
								clickHandler={() => {
									setIsAlertModalOpen(true);
								}}>
								save
							</BubblePopButton>
						</IndicatorCard>
					);
				})}
		</section>
	);
}
