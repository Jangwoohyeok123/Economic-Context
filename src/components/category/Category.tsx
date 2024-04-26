import clsx from 'clsx';
import styles from './Category.module.scss';
import { Indicator_Type } from '@/types/fred';
import IndicatorCard from '../cards/indicatorCard/IndicatorCard';

interface Category_Props {
	categoryData: Indicator_Type[];
	currentPage: number;
	itemsPerPage: number;
	categoryId: number;
}

export default function Category({ categoryData, currentPage, itemsPerPage, categoryId }: Category_Props) {
	return (
		<section className={clsx(styles.Category)}>
			{categoryData.length > 0 &&
				categoryData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((seriess: Indicator_Type, idx: number) => {
					return <IndicatorCard key={idx} indicator={seriess} categoryId={categoryId} currentPage={currentPage}></IndicatorCard>;
				})}
		</section>
	);
}
