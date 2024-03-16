import clsx from 'clsx';
import styles from './IndicatorsTab.module.scss';
import { Store } from '@/types/reduxType';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Indicator } from '@/types/userType';
import IndicatorCard from '../cards/indicatorCard/IndicatorCard';
import { useSelector } from 'react-redux';
import BubblePopButton from '../bubblePopButton/BubblePopButton';
import useFavoriteQuery from '@/hooks/useFavoriteQuery';
import { categoryNames } from '@/pages/_app';
import useFavoriteMutation from '@/hooks/useFavoriteMutation';
import { changeCategoryIdToName, changeNameToCategoryId } from '@/utils/changeNameToCategoryId';

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
	const [isOpenConfirmContext, setIsOpenConfirmContext] = useState(false);
	const { selectedFavorites } = useFavoriteQuery(categoryId);
	const { deleteFavoriteMutationAll } = useFavoriteMutation();
	const [pickIndicators, setPickIndicators] = useState<PickIndicators>({});

	useEffect(() => {
		setPickIndicators(
			categoryNames.reduce((acc: PickIndicators, name: string) => {
				acc[name] = [];
				return acc;
			}, {} as PickIndicators)
		);
	}, []);

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
				{selectedFavorites
					?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
					.map((favorite: Indicator, index: number) => {
						const { title, seriesId, categoryId } = favorite;
						return (
							<IndicatorCard
								key={index}
								title={title}
								seriesId={seriesId}
								categoryId={categoryId}
								observation_end=' favorite 요소'
								observation_start='백엔드 요청사항: favorite 요소'
								className={clsx(styles.indicatorCardByTab)}>
								<div className={styles.buttons}>
									<BubblePopButton
										clickHandler={() => deleteFavoriteMutationAll?.mutate({ userId: user.id, seriesId })}>
										delete
									</BubblePopButton>
									<BubblePopButton
										clickHandler={() => {
											const curCategoryName = changeCategoryIdToName(categoryId);
											let isActive = false;
											pickIndicators.curCategoryName.forEach((el ) => {
												if(el.seriesId === seriesId) return true;
											})
											if (pickIndicators.curCategoryName)
											// pickIndicators 의 현 category 에서 seriesId 가 이 카드의 seriesId 가 존재하면
											// 클릭할 때 그 배열에 값이 있는지 확인한다.
											// 없다면 state 추가
											// 있따면 삭제
											// 현 sereisId 가 pickIndicators 에 존재한다면 styles.on 아니면 off
										}}>
										pick
									</BubblePopButton>
								</div>
							</IndicatorCard>
						);
					})}
			</section>
			<footer>
				<span className={clsx(styles.item)}></span>
				{selectedFavorites && (
					<ReactPaginate
						pageCount={Math.ceil(selectedFavorites.length / itemsPerPage)}
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
						nextClassName={currentPage === Math.ceil(selectedFavorites.length / itemsPerPage) ? styles.disabled : ''}
						disabledClassName={styles.disabled}
					/>
				)}
				<div className={clsx(styles.item, styles.buttonWrap)}>
					<button
						onClick={() => {
							setIsOpenConfirmContext(true);
						}}>
						Make Context
					</button>
				</div>
			</footer>
		</div>
	);
}
