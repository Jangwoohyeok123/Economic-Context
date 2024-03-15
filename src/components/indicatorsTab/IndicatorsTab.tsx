import clsx from 'clsx';
import styles from './IndicatorsTab.module.scss';
import { useState } from 'react';
import IndicatorCard from '../cards/indicatorCard/IndicatorCard';
import useFavoriteQuery from '@/hooks/useFavoriteQuery';
import { categoryNames } from '@/pages/_app';
import useFavoriteMutation from '@/hooks/useFavoriteMutation';
import { changeNameToCategoryId } from '@/utils/changeNameToCategoryId';
import { Indicator } from '@/types/userType';

/**
- IndicatorsTab 을 클릭하면 첫 selectedFavorite 이 페칭된다.
- categoryIndex 가 바뀌면 useFavoriteQuery 에 의해서 페칭이 되는 구조다.
*/
export default function IndicatorsTab() {
	const [categoryIndex, setCategoryIndex] = useState(0);
	const categoryId = changeNameToCategoryId(categoryNames[categoryIndex]);
	const [isOpenConfirmContext, setIsOpenConfirmContext] = useState(false);
	const { selectedFavorites, isSelectedFavoritesExist } = useFavoriteQuery(categoryId);
	const { addFavoriteMutationAll, deleteFavoriteMutationAll } = useFavoriteMutation();

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
				{selectedFavorites?.map((favorite: Indicator, index: number) => {
					const { title, seriesId, categoryId } = favorite;
					return (
						<IndicatorCard
							key={index}
							title={title}
							seriesId={seriesId}
							categoryId={categoryId}
							observation_end=' favorite 요소'
							observation_start='백엔드 요청사항: favorite 요소'
							className={clsx(styles.IndicatorCard)}>
							<div>asd</div>
						</IndicatorCard>
					);
				})}
			</section>
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
		</div>
	);
}
