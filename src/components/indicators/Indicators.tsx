import app from '@/firebase/firebaseConfig';
import clsx from 'clsx';
import styles from './Indicators.module.scss';
import queryKey from '@/const/queryKey';
import ChartModal from '../modals/chartModal/ChartModal';
import { useEffect, useState } from 'react';
import IndicatorCard from '../indicatorCard/IndicatorCard';
import { Indicator } from '@/types/dbInterface';
import MakeConfirmModal from '../modals/makeConfirmModal/MakeConfirmModal';
import { deleteFavorite } from '@/firebase/favorite';
import { getDatabase, get, ref } from 'firebase/database';
import { changeNameToCategoryId } from '@/utils/changeNameToCategoryId';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
/* 
  하나의 state 를 4 개의 탭에서 보여줄려고 filter 를 이용중인데, styles.on 을 각 탭에서의 카드를 클릭하면 부여해주고 있었다. 그런데, tab 이 바뀌어도 styles.on 이 초기화가 되지 않는데 뭐가 문제일까 ? 

*/

export interface ActiveIndicators {
	[key: string]: string[];
	interest: string[];
	exchange: string[];
	consume: string[];
	production: string[];
}

export default function Indicators() {
	const userId = 1;
	const queryClient = useQueryClient();
	const categoryNames = ['interest', 'exchange', 'consume', 'production'];
	const [categoryIndex, setCategoryIndex] = useState(0);
	const [isChartModalOpen, setIsChartModalOpen] = useState(false);
	const [isOpenModalForMakeContext, setIsOpenConfirmContext] = useState(false);
	const [activeIndicators, setActiveIndicators] = useState<ActiveIndicators>({
		interest: [],
		exchange: [],
		consume: [],
		production: []
	});

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

	const clickCheckButton = (categoryName: string, seriesId: string): void => {
		setActiveIndicators(prevState => {
			// 현재 카테고리에 해당하는 indicators 배열 복사
			const updatedIndicators = [...prevState[categoryName]];
			const index = updatedIndicators.indexOf(seriesId);

			if (index > -1) updatedIndicators.splice(index, 1);
			else updatedIndicators.push(seriesId);

			return {
				...prevState,
				[categoryName]: updatedIndicators
			};
		});

		console.log(activeIndicators);
	};

	useEffect(() => {
		const newActiveIndicators: ActiveIndicators = {
			interest: [],
			exchange: [],
			consume: [],
			production: []
		};

		// favorites의 각 항목을 적절한 카테고리에 할당
		favorites?.forEach(favorite => {
			const categoryName = categoryNames.find(name => changeNameToCategoryId(name) === favorite.categoryId);
			if (categoryName) {
				newActiveIndicators[categoryName].push(favorite.seriesId);
			}
		});

		// activeIndicators 상태 업데이트
		setActiveIndicators(newActiveIndicators);
		console.log(newActiveIndicators);
	}, [favorites]);

	// click 하면 acitveIdicators 에 포함되어 있으면 삭제하고 아니면 추가하는 로직을 만든다.

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
									activeIndicators={activeIndicators}
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
									rightButtonHandler={() => clickCheckButton(categoryNames[categoryIndex], seriesId)}></IndicatorCard>
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
				isModalOpen={isOpenModalForMakeContext}
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
