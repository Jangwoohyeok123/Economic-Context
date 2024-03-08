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
import { changeNameToCategoryId } from '@/utils/changeNameToCategoryId';

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

export default function Indicators() {
	const categoryNames = ['interest', 'exchange', 'consume', 'production'];
	const [categoryIndex, setCategoryIndex] = useState(0);
	const userId = 1;
	const [isOpenConfirmContext, setIsOpenConfirmContext] = useState(false);
	const [isChartModalOpen, setIsChartModalOpen] = useState(false);
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

	// 범용성있게 함수이름을 failterDataSet 라고 정의할까요?
	const filterFavoriteByCategoryId = (favorites: Favorite[], categoryId: number) => {
		return favorites.filter(favorite => favorite.categoryId === categoryId);
	};

	const pickCategory = (idx: number) => {
		setCategoryIndex(idx);
	};

	return (
		<div className={clsx(styles.Indicators)}>
			<nav>
				{categoryNames.map((categoryName, index) => {
					const categoryId = changeNameToCategoryId(categoryName);
					return (
						favorites && (
							<button
								key={index}
								onClick={() => {
									filterFavoriteByCategoryId(favorites, categoryId);
									pickCategory(index);
								}}
								className={categoryIndex === index ? styles.on : ''}>
								{categoryName}
							</button>
						)
					);
				})}
			</nav>
			<form>
				{isSuccess &&
					filterFavoriteByCategoryId(favorites, changeNameToCategoryId(categoryNames[categoryIndex])).map(
						(favorite, idx) => {
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
						}
					)}
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
