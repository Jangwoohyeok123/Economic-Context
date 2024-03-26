import clsx from 'clsx';
import styles from './IndicatorsTab.module.scss';
import { Store_Type } from '@/types/redux';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import IndicatorCard from '../cards/indicatorCard/IndicatorCard';
import { useSelector } from 'react-redux';
import BubblePopButton from '../bubblePopButton/BubblePopButton';
import useFavoriteQuery from '@/hooks/useFavoriteQuery';
import { categoryNames } from '@/pages/_app';
import useFavoriteMutation from '@/hooks/useFavoriteMutation';
import { changeNameToCategoryId } from '@/utils/changeNameToCategoryId';
import MakeContextModal from '../modals/makeContextModal/MakeContextModal';
import AlertModal from '../modals/alertModal/AlertModal';
import { addEllipsis } from '@/utils/cleanString';
import { FavoriteIndicatorWithIsPick_Type, FavoriteIndicator_Type } from '@/types/favorite';

/**
- IndicatorsTab 을 클릭하면 첫 selectedFavorite 이 페칭된다.
- categoryIndex 가 바뀌면 useFavoriteQuery 에 의해서 페칭이 되는 구조다.
*/
const itemsPerPage = 3;

export default function IndicatorsTab() {
	const user = useSelector((state: Store_Type) => state.user);

	const [categoryIndex, setCategoryIndex] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [favoritesWithPick, setFavoritesWithPick] = useState<FavoriteIndicatorWithIsPick_Type[]>([]);
	const [isMakeOpen, setIsMakeOpen] = useState<boolean>(false);
	const [isValidateModal, setIsValidateModal] = useState<boolean>(false);

	const { deleteFavoriteMutationAll } = useFavoriteMutation();
	const categoryId = changeNameToCategoryId(categoryNames[categoryIndex]);
	const { allFavorites } = useFavoriteQuery();

	useEffect(() => {
		if (favoritesWithPick.length) {
			const updated = allFavorites?.map((favorite: FavoriteIndicator_Type) => {
				const prev = favoritesWithPick.find(
					(prevFavorites: FavoriteIndicatorWithIsPick_Type) => prevFavorites.seriesId === favorite.seriesId
				);
				return prev
					? {
							...favorite,
							isPick: prev.isPick
					  }
					: {
							...favorite,
							isPick: false
					  };
			});
			updated && setFavoritesWithPick(updated);
			return;
		}
		const updated = allFavorites?.map((favorite: FavoriteIndicator_Type) => {
			return {
				...favorite,
				isPick: false
			};
		});

		updated && setFavoritesWithPick(updated);
	}, [allFavorites]);
	const curFavorites = favoritesWithPick?.filter(
		(favorite: FavoriteIndicator_Type) => favorite?.categoryId == categoryId
	);
	const pagedFavorite = curFavorites?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

	return (
		<div className={clsx(styles.IndicatorsTab)}>
			<nav>
				{categoryNames.map((name, index) => {
					return (
						<button
							key={index}
							className={index === categoryIndex ? clsx(styles.on) : ''}
							onClick={() => setCategoryIndex(index)}>
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
							<p>{notes ? addEllipsis(notes, 300) : 'This Indicator is not have description.'}</p>
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
				{curFavorites && (
					<ReactPaginate
						pageCount={Math.ceil(curFavorites.length / itemsPerPage)}
						previousAriaLabel='prev card'
						nextAriaLabel='next card'
						previousLabel='Prev'
						nextLabel='Next'
						pageRangeDisplayed={5}
						marginPagesDisplayed={0}
						onPageChange={event => setCurrentPage(event.selected)}
						containerClassName={styles.pagination}
						breakLabel={null}
						forcePage={currentPage}
						activeClassName={styles.paginationActive}
						previousClassName={currentPage === 0 ? styles.disabled : ''}
						nextClassName={currentPage === Math.ceil(curFavorites.length / itemsPerPage) ? styles.disabled : ''}
						disabledClassName={styles.disabled}
					/>
				)}
				<div className={clsx(styles.item, styles.buttonWrap)}>
					<button
						onClick={() => {
							if (favoritesWithPick?.filter(favorite => favorite.isPick).length > 0) setIsMakeOpen(true);
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
