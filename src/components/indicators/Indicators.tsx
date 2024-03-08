import app from '@/firebase/firebaseConfig';
import clsx from 'clsx';
import styles from './Indicators.module.scss';
import queryKey from '@/const/queryKey';
import ChartModal from '../modals/chartModal/ChartModal';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import IndicatorCard from '../indicatorCard/IndicatorCard';
import { Indicator } from '@/types/dbInterface';
import MakeConfirmModal from '../modals/makeConfirmModal/MakeConfirmModal';
import { getDatabase, get, ref } from 'firebase/database';
import { changeNameToCategoryId } from '@/utils/changeNameToCategoryId';
import { deleteFavorite } from '@/firebase/logic';

export default function Indicators() {
	const userId = 1;
	const queryClient = useQueryClient();
	const categoryNames = ['interest', 'exchange', 'consume', 'production'];
	const [categoryIndex, setCategoryIndex] = useState(0);
	const [isChartModalOpen, setIsChartModalOpen] = useState(false);
	const [isOpenConfirmContext, setIsOpenConfirmContext] = useState(false);

	const { data: favorites, isSuccess } = useQuery({
		queryKey: [queryKey.favorite, userId],
		queryFn: async () => {
			const db = getDatabase(app);
			const favoriteDocRef = ref(db, `/user/favorite/${userId}`);
			const snapshot = await get(favoriteDocRef);
			const favoritesArray: Indicator[] = [];

			if (snapshot.exists()) {
				snapshot.forEach(childSnapshot => {
					favoritesArray.push(childSnapshot.val());
				});
			}

			return favoritesArray;
		},
		staleTime: 1 * 60 * 1000 // 1분
	});

	const deleteMutation = useMutation({
		mutationFn: ({ userId, seriesId }: { userId: number; seriesId: string }) => deleteFavorite(userId, seriesId),
		onSuccess(data) {
			console.log(data);
			alert('mutate 성공');
			queryClient.invalidateQueries({ queryKey: [queryKey.favorite, userId] }); // 화면을 최신상태로 유지하는 방법
		},
		onError(err) {
			console.error(err);
		}
	});

	// 범용성있게 함수이름을 failterDataSet 라고 정의할까요?
	const filterFavoriteByCategoryId = (favorites: Indicator[], categoryId: number) => {
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
							const seriesId = favorite.seriesId;
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
									leftButtonHandler={() => {
										deleteMutation.mutate({ userId, seriesId });
									}}
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
