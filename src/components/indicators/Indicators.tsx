import app from '@/firebase/firebaseConfig';
import clsx from 'clsx';
import styles from './Indicators.module.scss';
import queryKey from '@/const/queryKey';
import { poppins } from '@/pages/_app';
import ChartModal from '../modals/chartModal/ChartModal';
import IndicatorCard from '../indicatorCard/IndicatorCard';
import { Indicator } from '@/types/dbInterface';
import { useDispatch, useSelector } from 'react-redux';
import MakeContextModal from '../modals/makeContextModal/MakeContextModal';
import ValidateNameModal from '../modals/validateNameModal/validateNameModal';
import { deleteFavorite } from '@/firebase/favorite';
import { useEffect, useState } from 'react';
import { getDatabase, get, ref } from 'firebase/database';
import { changeNameToCategoryId } from '@/utils/changeNameToCategoryId';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toggleValidationNameModal } from '@/actions/actions';
/* 
  하나의 state 를 4 개의 탭에서 보여줄려고 filter 를 이용중인데, styles.on 을 각 탭에서의 카드를 클릭하면 부여해주고 있었다. 그런데, tab 이 바뀌어도 styles.on 이 초기화가 되지 않는데 뭐가 문제일까 ? 

*/

export type ActiveIndicator = {
	title: string;
	seriesId: string;
	categoryId: number;
	isActive: boolean;
};

export interface ActiveIndicators {
	[key: string]: ActiveIndicator[];
	interest: ActiveIndicator[];
	exchange: ActiveIndicator[];
	consume: ActiveIndicator[];
	production: ActiveIndicator[];
}

export default function Indicators() {
	const userId = 1;
	const dispatch = useDispatch();
	const isValidationModalOpen = useSelector(state => state.validateNameReducer.isOpen);
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

	const clickCheckButton = (title: string, categoryName: string, seriesId: string): void => {
		setActiveIndicators(prevState => {
			const updatedIndicators = [...prevState[categoryName]];
			const index = updatedIndicators.findIndex(indicator => indicator.seriesId === seriesId);

			if (index > -1) {
				updatedIndicators[index] = {
					...updatedIndicators[index],
					isActive: !updatedIndicators[index].isActive
				};
			} else {
				updatedIndicators.push({
					title: title,
					seriesId: seriesId,
					categoryId: changeNameToCategoryId(categoryName),
					isActive: true
				});
			}

			return {
				...prevState,
				[categoryName]: updatedIndicators
			};
		});
	};

	const toggleValidateNameModal = () => {
		dispatch(toggleValidationNameModal());
	};

	// favorites 가 변할때마다 activeIndicators 가 동기화 되어야 한다.
	//
	useEffect(() => {
		const prevActiveIndicators = { ...activeIndicators };

		const newActiveIndicators: ActiveIndicators = {
			interest: [],
			exchange: [],
			consume: [],
			production: []
		};

		favorites?.forEach(favorite => {
			const categoryName = categoryNames.find(name => changeNameToCategoryId(name) === favorite.categoryId);
			if (categoryName) {
				newActiveIndicators[categoryName].push({
					title: favorite.title,
					seriesId: favorite.seriesId,
					categoryId: favorite.categoryId,
					isActive: false
				});
			}
		});

		categoryNames.forEach((categoryName, idx) => {
			prevActiveIndicators[categoryName].forEach(prevIndicator => {
				const samePreviousIndicator = newActiveIndicators[categoryName].find(
					indicator => indicator.seriesId === prevIndicator.seriesId
				);
				if (samePreviousIndicator) samePreviousIndicator.isActive = prevIndicator.isActive;
			});
		});

		setActiveIndicators(newActiveIndicators);
	}, [favorites]);

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
					activeIndicators &&
					filterFavoriteByCategoryId(favorites, changeNameToCategoryId(categoryNames[categoryIndex])).map(
						(favorite, idx) => {
							const title = favorite.title;
							const seriesId = favorite.seriesId;
							const categoryId = favorite.categoryId;

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
									rightButtonHandler={() =>
										clickCheckButton(title, categoryNames[categoryIndex], seriesId)
									}></IndicatorCard>
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

			<MakeContextModal
				isModalOpen={isOpenModalForMakeContext}
				setIsModalOpen={setIsOpenConfirmContext}
				size='big'
				activeIndicators={activeIndicators}
			/>
			<ChartModal isChartModalOpen={isChartModalOpen} setIsChartModalOpen={setIsChartModalOpen} />
			<ValidateNameModal
				isValidationModalOpen={isValidationModalOpen}
				setIsValidationModalOpen={() => dispatch(toggleValidationNameModal())}>
				<div className={clsx(styles.validateNameModal, poppins.variable)}>
					<p>Context Name 을 적어주세요</p>
					<button onClick={() => dispatch(toggleValidationNameModal())}>Name 다시적기</button>
				</div>
			</ValidateNameModal>
		</div>
	);
}
