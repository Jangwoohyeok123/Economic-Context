import clsx from 'clsx';
import styles from './Indicators.module.scss';
import { Dispatch, SetStateAction, useState } from 'react';
import IndicatorCard from '../cards/indicatorCard/IndicatorCard';
import MakeConfirmModal from '../modals/makeConfirmModal/MakeConfirmModal';

type Favorite = {
	title: string;
	seriesId: string;
	categoryId: number;
};

interface IndicatorsProps {
	// Categorys 는 API 가 완성되면 다시 타입 지정한다.
	favorites: Favorite[];
	CategoryIndex: number;
	setCategoryIndex: Dispatch<SetStateAction<number>>;
}

export default function Indicators({ favorites, CategoryIndex, setCategoryIndex }: IndicatorsProps) {
	const [isOpenConfirmContext, setIsOpenConfirmContext] = useState(false);
	const [categoryNames, setCategoryNames] = useState(['interest', 'exchange', 'consume', 'production']);

	return (
		<div className={clsx(styles.Indicators)}>
			<nav>
				{categoryNames.map((category, idx) => {
					return (
						<button key={idx} onClick={() => setCategoryIndex(idx)} className={CategoryIndex === idx ? styles.on : ''}>
							{category}
						</button>
					);
				})}
			</nav>
			<form>
				{favorites.map((favorite, idx) => {
					return (
						<IndicatorCard
							key={idx}
							pageType='dashboard'
							title={favorite.title}
							leftButtonContent='delete'
							leftButtonHandler={() => {}}
							rightButtonContent='check'
							rightButtonHandler={() => {}}></IndicatorCard>
					);
				})}
			</form>
			<footer>
				<span className={clsx(styles.item)}></span>
				<div className={clsx(styles.pagination, styles.item)}>- 1 -</div>
				<div className={clsx(styles.item, styles.buttonWrap)}>
					<button
						onClick={() => {
							setIsOpenConfirmContext(true);
						}}>
						Make Context
					</button>
				</div>
			</footer>

			<MakeConfirmModal
				isModalOpen={isOpenConfirmContext}
				setIsModalOpen={setIsOpenConfirmContext}
				size='big'
				header={''}
				body={''}
				leftButtonContent={''}
				leftButtonHandler={() => {}}
				rightButtonContent={''}
				rightButtonHandler={() => {}}
			/>
		</div>
	);
}
