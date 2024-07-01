import { useRef, useState } from 'react';
import useFavoriteQuery from '@/hooks/useFavoriteQuery';
import { FavoriteContainer, LeftContainer, RightContainer } from '@/styles/IndicatorsTab.style';
import { FavoriteIndicator_Type } from '@/types/favorite';
import const_categoryId, { categoryIds } from '@/const/categoryId';
import Accordion from '../accordion/Accordion';
import CategoryTabMenu from '../categoryTabMenu/CategoryTabMenu';
import DashHeader from '../dashheader/DashHeader';
import CreateContextSection from '../createContextSection/CreateContextSection';

export default function IndicatorsTab() {
	const { allFavorites_List } = useFavoriteQuery();
	const [currentCategoryId, setCurrentCategoryId] = useState<number>(const_categoryId.interest_mortgage);
	const [checkedFavorite_List, setCheckedFavorite_List] = useState<FavoriteIndicator_Type[]>([]);
	const refFavoriteList = useRef<HTMLDivElement>(null);

	if (!allFavorites_List) return <div>isLoading</div>;

	const curFavorites_List = allFavorites_List?.filter(favorite => favorite.categoryId === currentCategoryId);

	const pickIndicator = (favoriteIndicator: FavoriteIndicator_Type) => {
		setCheckedFavorite_List(prev => {
			if (prev.find(item => item.seriesId === favoriteIndicator.seriesId)) return prev.filter(item => item.seriesId !== favoriteIndicator.seriesId);

			return [...prev, favoriteIndicator];
		});
	};

	const allClick = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = e.target;

		if (checked) setCheckedFavorite_List(prev => [...new Set([...prev, ...curFavorites_List])]);
		else {
			const idsToRemove = new Set(curFavorites_List.map(item => item.seriesId));
			setCheckedFavorite_List(prev => prev.filter(item => !idsToRemove.has(item.seriesId)));
		}
	};

	const isSubset = (subset: FavoriteIndicator_Type[], superset: FavoriteIndicator_Type[]) => {
		if (subset.length === 0) return false;
		return subset.every(element => superset.includes(element));
	};

	return (
		<FavoriteContainer>
			<DashHeader tab={'Indicators'} />
			<LeftContainer>
				<div className='categoryTabMenuWrapper'>
					<CategoryTabMenu categoryIdList={categoryIds} selectedCategoryId={currentCategoryId} setSelectedCategoryId={setCurrentCategoryId} />
				</div>

				<div className='favoriteList' ref={refFavoriteList}>
					<div className='favoriteListHeader'>
						<input type='checkbox' checked={isSubset(curFavorites_List, checkedFavorite_List)} onChange={allClick} />
						<h4>Indicator</h4>
					</div>
					{curFavorites_List.length > 0
						? curFavorites_List?.map((favoriteIndicator: FavoriteIndicator_Type, index: number) => {
								const { title } = favoriteIndicator;

								return (
									<div key={index} className='item' onClick={() => pickIndicator(favoriteIndicator)}>
										<input
											type='checkbox'
											checked={checkedFavorite_List.some(checkedFavoriteIndicator => {
												return checkedFavoriteIndicator.seriesId === favoriteIndicator.seriesId;
											})}
										/>
										<h4>{title}</h4>
									</div>
								);
						  })
						: '이 페이지는 작업이 필요해'}
				</div>
			</LeftContainer>
			<RightContainer>
				<div className='header'>
					<h2>Create Context</h2>
					<span>make your custom context</span>
				</div>
				<div className='contextName'>
					<div>
						<h3>Context Name</h3>
						<Accordion />
					</div>
					<input type='text' placeholder='write your context name' />
				</div>

				<CreateContextSection checkedFavorite_List={checkedFavorite_List} setCheckedFavorite_List={setCheckedFavorite_List} />
			</RightContainer>
		</FavoriteContainer>
	);
}
