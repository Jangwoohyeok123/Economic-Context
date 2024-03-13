import clsx from 'clsx';
import styles from './Category.module.scss';
import { Seriess_Type } from '@/types/fredInterface';
import IndicatorCard from '../cards/indicatorCard/IndicatorCard';
import BubblePopButton from '../bubblePopButton/BubblePopButton';

interface Category_Intercae {
	categoryData: Seriess_Type[];
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
}: Category_Intercae) {
	const buttonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.stopPropagation();
		setIsAlertModalOpen(true);
	};

	return (
		<figure className={clsx(styles.Category)}>
			{categoryData
				.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
				.map((series: Seriess_Type, idx: number) => {
					const { title, id: seriesId, frequency, popularity, observation_start, observation_end } = series;
					const notes = series.notes ?? '';

					return (
						<IndicatorCard
							key={idx}
							title={title}
							seriesId={seriesId}
							categoryId={categoryId}
							frequency={frequency}
							popularity={popularity}
							notes={notes ? notes : ''}
							observation_end={observation_end}
							observation_start={observation_start}
							className={styles.IndicatorCard}>
							<div>
								{notes ? (
									<p>{notes}</p>
								) : (
									<p>This indicator does not have information about the indicator description.</p>
								)}
							</div>
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
