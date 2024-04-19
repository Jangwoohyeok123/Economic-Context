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

export default function Category({ categoryData, currentPage, itemsPerPage, categoryId, setIsAlertModalOpen }: Category_Props) {
	return (
		<section className={clsx(styles.Category)}>
			{categoryData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((seriess: Indicator_Type, idx: number) => {
				return (
					<IndicatorCard key={idx} indicator={seriess} categoryId={categoryId} className={styles.IndicatorCard}>
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
