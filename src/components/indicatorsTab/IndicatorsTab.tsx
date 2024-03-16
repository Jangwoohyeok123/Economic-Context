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
import { changeCategoryIdToName, changeNameToCategoryId } from '@/utils/changeNameToCategoryId';
import { cleanString } from '@/utils/cleanString';
import MakeContextModal from '../modals/makeContextModal/MakeContextModal';

/** [key: string] 는 key 를 여러개 갖을 수 있고 값은 Indicator[] 을 갖는다는 의미의 type 이다. */
type PickIndicators = {
	[key: string]: Indicator[];
};

/**
- IndicatorsTab 을 클릭하면 첫 selectedFavorite 이 페칭된다.
- categoryIndex 가 바뀌면 useFavoriteQuery 에 의해서 페칭이 되는 구조다.
*/
export default function IndicatorsTab() {
	const user = useSelector((state: Store) => state.user);
	const itemsPerPage = 3;
	const [categoryIndex, setCategoryIndex] = useState(0);
	const categoryId = changeNameToCategoryId(categoryNames[categoryIndex]);
	const [currentPage, setCurrentPage] = useState(0);
	const { allFavorites } = useFavoriteQuery();
	const { deleteFavoriteMutationAll } = useFavoriteMutation();
	const [isMakeOpen, setIsMakeOpen] = useState(false);

	const [favorites, setFavorites] = useState();

	useEffect(() => {
		const updated = allFavorites?.map(favorite => {
			return {
				...favorite,
				isPick: false
			};
		});

		setFavorites(updated);
	}, [allFavorites]);
	const curFavorites = favorites?.filter(favorite => favorite.categoryId == categoryId);

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
				{curFavorites
					?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
					.map((favorite: IndicatorWithIsPick, index: number) => {
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
									<BubblePopButton
										clickHandler={() => deleteFavoriteMutationAll?.mutate({ userId: user.id, seriesId })}>
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
							setIsMakeOpen(true);
						}}>
						Make Context
					</button>
				</div>
			</footer>
			<MakeContextModal favorites={allFavorites} isModalOpen={isMakeOpen} setIsModalOpen={setIsMakeOpen} />
		</div>
	);
}
