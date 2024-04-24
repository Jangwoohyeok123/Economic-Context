import clsx from 'clsx';
import styles from './Category.module.scss';
import { Indicator_Type } from '@/types/fred';
import IndicatorCard from '../cards/indicatorCard/IndicatorCard';
import BubblePopButton from '../bubblePopButton/BubblePopButton';
import { FaRegStar } from 'react-icons/fa6';
import styled from 'styled-components';

interface Category_Props {
	categoryData: Indicator_Type[];
	currentPage: number;
	itemsPerPage: number;
	categoryId: number;
	setIsAlertModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const StarCotainer = styled.div`
	height: 30px;

	.star {
		width: 25px;
		height: 100%;
		cursor: pointer;
	}
`;

export default function Category({ categoryData, currentPage, itemsPerPage, categoryId, setIsAlertModalOpen }: Category_Props) {
	return (
		<section className={clsx(styles.Category)}>
			{categoryData.length > 0 &&
				categoryData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((seriess: Indicator_Type, idx: number) => {
					return (
						<IndicatorCard key={idx} indicator={seriess} categoryId={categoryId} className={styles.IndicatorCard} currentPage={currentPage}>
							<BubblePopButton
								clickHandler={() => {
									setIsAlertModalOpen(true);
								}}>
								<StarCotainer>
									<FaRegStar className='star' />
								</StarCotainer>
							</BubblePopButton>
						</IndicatorCard>
					);
				})}
		</section>
	);
}
