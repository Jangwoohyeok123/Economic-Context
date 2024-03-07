import clsx from 'clsx';
import styles from './Indicators.module.scss';
import { Dispatch, SetStateAction, useState } from 'react';
import IndicatorCard from '../cards/indicatorCard/IndicatorCard';
import MakeConfirmModal from '../modals/makeConfirmModal/MakeConfirmModal';
import ChartModal from '../modals/chartModal/ChartModal';
import { useQuery } from '@tanstack/react-query';
import queryKey from '@/const/queryKey';
import app from '@/firebase/firebaseConfig';
import { getDatabase, get, ref } from 'firebase/database';

type Favorite = {
	title: string;
	seriesId: string;
	categoryId: number;
};

interface IndicatorsProps {
	// Categorys 는 API 가 완성되면 다시 타입 지정한다.
	CategoryIndex: number;
	setCategoryIndex: Dispatch<SetStateAction<number>>;
}

export default function Indicators({ CategoryIndex, setCategoryIndex }: IndicatorsProps) {
	const [isOpenConfirmContext, setIsOpenConfirmContext] = useState(false);
	const [categoryNames, setCategoryNames] = useState(['interest', 'exchange', 'consume', 'production']);
	const [isChartModalOpen, setIsChartModalOpen] = useState(false);
	const userId = 1;
	const { data: favorites, isSuccess } = useQuery({
		queryKey: [queryKey.favorite, userId],
		queryFn: async () => {
			const db = getDatabase(app);
			const favoriteDocRef = ref(db, `/user/favorite/${userId}`);
			const snapshot = await get(favoriteDocRef);
			const favoritesArray: Favorite[] = [];

			if (snapshot.exists()) {
				snapshot.forEach(childSnapshot => {
					favoritesArray.push(childSnapshot.val());
				});
			}

			return favoritesArray;
		}
	});

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
				{isSuccess &&
					favorites.map((favorite, idx) => {
						return (
							<IndicatorCard
								isChartModalOpen={isChartModalOpen}
								setIsChartModalOpen={setIsChartModalOpen}
								seriesId={favorite.seriesId}
								categoryId={favorite.categoryId}
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
			<ChartModal isChartModalOpen={isChartModalOpen} setIsChartModalOpen={setIsChartModalOpen}></ChartModal>
		</div>
	);
}
