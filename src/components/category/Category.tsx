import clsx from 'clsx';
import styles from './Category.module.scss';
import { OriginSeriess_Type } from '@/types/fredType';
import IndicatorCard from '../cards/indicatorCard/IndicatorCard';
import BubblePopButton from '../bubblePopButton/BubblePopButton';

interface CategoryInterface {
	categoryData: OriginSeriess_Type[];
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
}: CategoryInterface) {
	return (
		<figure className={clsx(styles.Category)}>
			{categoryData
				.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
				.map((series: OriginSeriess_Type, idx: number) => {
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
							<p>{notes ? notes : 'This indicator does not have information about the indicator description.'}</p>
							<BubblePopButton
								clickHandler={() => {
									setIsAlertModalOpen(true);
								}}>
								save
							</BubblePopButton>
						</IndicatorCard>
					);
				})}
		</figure>
	);
}
