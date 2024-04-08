import clsx from 'clsx';
import styles from './IndicatorsTab.module.scss';
import { Store_Type } from '@/types/redux';
import { useEffect, useState } from 'react';
import IndicatorCard from '../cards/indicatorCard/IndicatorCard';
import { useSelector } from 'react-redux';
import BubblePopButton from '../bubblePopButton/BubblePopButton';
import useFavoriteQuery from '@/hooks/useFavoriteQuery';
import { categoryNames } from '@/pages/_app';
import useFavoriteMutation from '@/hooks/useFavoriteMutation';
import { changeNameToCategoryId } from '@/utils/changeNameToCategoryId';
import MakeContextModal from '../modals/makeContextModal/MakeContextModal';
import AlertModal from '../modals/alertModal/AlertModal';
import { FavoriteIndicatorWithIsPick_Type, FavoriteIndicator_Type } from '@/types/favorite';
import Pagination from '../pagination/Pagination';

const itemsPerPage = 3;

export default function IndicatorsTab() {
	const user = useSelector((state: Store_Type) => state.user);

	const [categoryIndex, setCategoryIndex] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [favoritesWithPick, setFavoritesWithPick] = useState<FavoriteIndicatorWithIsPick_Type[]>([]);
	const [isMakeOpen, setIsMakeOpen] = useState<boolean>(false);
	const [isValidateModal, setIsValidateModal] = useState<boolean>(false);

	const { deleteFavoriteMutationAll } = useFavoriteMutation();
	const { allFavorites_List } = useFavoriteQuery();
	const categoryId = changeNameToCategoryId(categoryNames[categoryIndex]);

	useEffect(() => {
		if (favoritesWithPick.length) {
			// favorite 하나가 추가될 때
			const updated = allFavorites_List?.map((favoriteIndicator: FavoriteIndicator_Type) => {
				const prev = favoritesWithPick.find(
					(prevFavorites: FavoriteIndicatorWithIsPick_Type) => prevFavorites.seriesId === favoriteIndicator.seriesId
				);
				return prev
					? {
							...favoriteIndicator,
							isPick: prev.isPick
				}
					: {
							...favoriteIndicator,
							isPick: false
					  };
			});
			updated && setFavoritesWithPick(updated);
			return;
		}

		//
		const updated = allFavorites_List?.map((favoriteIndicator: FavoriteIndicator_Type) => {
			return {
				...favoriteIndicator,
				isPick: false
			};
		});

		updated && setFavoritesWithPick(updated);
	}, [allFavorites_List]);
	const curFavorites = favoritesWithPick?.filter(
		(favorite: FavoriteIndicator_Type) => favorite?.categoryId == categoryId
	);
	const pagedFavorite = curFavorites?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	return (
		<div className={clsx(styles.IndicatorsTab)}>
			<nav>
				{categoryNames.map((name, index) => {
					return (
						<button
							key={index}
							className={index === categoryIndex ? clsx(styles.on) : ''}
							onClick={() => {
								setCategoryIndex(index);
								setCurrentPage(1);
							}}>
							{name}
						</button>
					);
				})}
			</nav>
			<section className={clsx(styles.favorites)}>
				{pagedFavorite?.map((favorite: FavoriteIndicatorWithIsPick_Type, index: number) => {
					const {
						title,
						seriesId,
						notes,
						categoryId,
						observation_end,
						observation_start,
						isPick,
						frequency,
						popularity
					} = favorite;

					return (
						<IndicatorCard
							key={index}
							title={title}
							seriesId={seriesId}
							categoryId={categoryId}
							observation_end={observation_end}
							observation_start={observation_start}
							notes={notes}
							className={clsx(styles.indicatorCardByTab)}
							frequency={frequency}
							popularity={popularity}>
							<div className={styles.buttons}>
								<BubblePopButton clickHandler={() => deleteFavoriteMutationAll?.mutate({ userId: user.id, seriesId })}>
									delete
								</BubblePopButton>
								<BubblePopButton
									className={isPick ? clsx(styles.on) : ''}
									clickHandler={() => {
										const updated = favoritesWithPick?.map((favorite: FavoriteIndicatorWithIsPick_Type) => {
											if (favorite.seriesId === seriesId) {
												return {
													...favorite,
													isPick: !favorite.isPick
												};
											}

											return favorite;
										});

										setFavoritesWithPick(updated);
									}}>
									{isPick ? 'unpick' : 'pick'}
								</BubblePopButton>
							</div>
						</IndicatorCard>
					);
				})}
			</section>
			<footer>
				<span className={clsx(styles.item)}></span>
				<Pagination
					data_List={favoritesWithPick.filter(favoriteIndicator => favoriteIndicator.categoryId === categoryId)}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					itemsPerPage={3}
					pageRangeDisplayed={5}
				/>
				<div className={clsx(styles.item, styles.buttonWrap)}>
					<button
						onClick={() => {
							if (favoritesWithPick?.filter(favoriteIndicator => favoriteIndicator.isPick).length > 0)
								setIsMakeOpen(true);
							else setIsValidateModal(true);
						}}>
						Make Context
					</button>
				</div>
			</footer>
			<MakeContextModal favorites={favoritesWithPick} isModalOpen={isMakeOpen} setIsModalOpen={setIsMakeOpen} />
			<AlertModal
				isModalOpen={isValidateModal}
				setIsModalOpen={setIsValidateModal}
				body='카드를 골라주세요'
				header='카드를 골라주세요'
				size='small'
				leftButtonContent='close'
				rightButtonContent='close'
				leftButtonHandler={() => setIsValidateModal(false)}
				rightButtonHandler={() => setIsValidateModal(false)}></AlertModal>
		</div>
	);
}
