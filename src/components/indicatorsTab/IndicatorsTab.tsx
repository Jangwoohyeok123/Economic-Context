import clsx from 'clsx';
import styles from './IndicatorsTab.module.scss';
import { Store } from '@/types/reduxType';
import { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Indicator, IndicatorWithIsPick } from '@/types/userType';
import IndicatorCard from '../cards/indicatorCard/IndicatorCard';
import { useSelector } from 'react-redux';
import BubblePopButton from '../bubblePopButton/BubblePopButton';
import useFavoriteQuery from '@/hooks/useFavoriteQuery';
import { categoryNames } from '@/pages/_app';
import useFavoriteMutation from '@/hooks/useFavoriteMutation';
import { changeNameToCategoryId } from '@/utils/changeNameToCategoryId';
import MakeContextModal from '../modals/makeContextModal/MakeContextModal';
import AlertModal from '../modals/alertModal/AlertModal';

/** [key: string] 는 key 를 여러개 갖을 수 있고 값은 Indicator[] 을 갖는다는 의미의 type 이다. */
type PickIndicators = {
	[key: string]: Indicator[];
};

/**
- IndicatorsTab 을 클릭하면 첫 selectedFavorite 이 페칭된다.
- categoryIndex 가 바뀌면 useFavoriteQuery 에 의해서 페칭이 되는 구조다.
*/
const itemsPerPage = 3;

export default function IndicatorsTab() {
	const user = useSelector((state: Store) => state.user);

	const [categoryIndex, setCategoryIndex] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [favorites, setFavorites] = useState();
	const [isMakeOpen, setIsMakeOpen] = useState(false);
	const [isValidateModal, setIsValidateModal] = useState(false);

	const { deleteFavoriteMutationAll } = useFavoriteMutation();
	const categoryId = changeNameToCategoryId(categoryNames[categoryIndex]);
	const { allFavorites } = useFavoriteQuery();

	useEffect(() => {
		if (favorites) {
			const updated = allFavorites.map(favorite => {
				const prev = favorites.find(prevFavorites => prevFavorites.seriesId === favorite.seriesId);
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

			setFavorites(updated);
			return;
		}

		const updated = allFavorites?.map(favorite => {
			return {
				...favorite,
				isPick: false
			};
		});

		setFavorites(updated);
	}, [allFavorites]);

	const curFavorites = favorites?.filter(favorite => favorite?.categoryId == categoryId);
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
				{pagedFavorite?.map((favorite: IndicatorWithIsPick, index: number) => {
					const { title, seriesId, notes, categoryId, observation_end, observation_start, isPick } = favorite;
					return (
						<IndicatorCard
							key={index}
							title={title}
							seriesId={seriesId}
							categoryId={categoryId}
							observation_end={observation_end}
							observation_start={observation_start}
							notes={notes}
							className={clsx(styles.indicatorCardByTab)}>
							<p>{notes ? notes.slice(300) : 'This Indicator is not have notes'}</p>
							<div className={styles.buttons}>
								<BubblePopButton clickHandler={() => deleteFavoriteMutationAll?.mutate({ userId: user.id, seriesId })}>
									delete
								</BubblePopButton>
								<BubblePopButton
									className={isPick ? clsx(styles.on) : ''}
									clickHandler={() => {
										const updated = favorites.map(favorite => {
											if (favorite.seriesId === seriesId) {
												return {
													...favorite,
													isPick: !favorite.isPick
												};
											}

											return favorite;
										});

										setFavorites(updated);
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
							if (favorites?.filter(favorite => favorite.isPick).length > 0) setIsMakeOpen(true);
							else setIsValidateModal(true);
						}}>
						Make Context
					</button>
				</div>
			</footer>
			<MakeContextModal favorites={favorites} isModalOpen={isMakeOpen} setIsModalOpen={setIsMakeOpen} />
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
