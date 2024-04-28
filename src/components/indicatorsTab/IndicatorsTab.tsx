import clsx from 'clsx';
import styles from './IndicatorsTab.module.scss';
import { useRef, useState } from 'react';
import useFavoriteQuery from '@/hooks/useFavoriteQuery';
import useFavoriteMutation from '@/hooks/useFavoriteMutation';
import { changeCategoryIdToName } from '@/utils/changeNameToCategoryId';
import LoginAlertModal from '../modals/loginAlertModal/LoginAlertModal';
import { FavoriteIndicator_Type } from '@/types/favorite';
import styled from 'styled-components';
import const_categoryId, { categoryIds } from '@/const/categoryId';
import CreateContextSection from '../createContextSection/CreateContextSection';
import { MdExpandMore } from 'react-icons/md';
import Accordian from '../accordian/Accordian';
import CategoryTabMenu from '../categoryTabMenu/CategoryTabMenu';

const FavoriteContainer = styled.section`
	display: flex;
	width: 100%;
	height: 100%;
	padding: 20px 40px;
	justify-content: space-between;
`;

const LeftContainer = styled.div`
	width: 50%;
	overflow: hidden;

	// Tabmenu는 고정px
	.categoryTabMenuWrapper {
		width: 550px;
		min-height: 140px;
		margin: 0 auto;
		display: flex;
		align-items: center;
	}

	// favoriteList는 나머지 여백
	.favoriteList {
		height: calc(100% - 180px);
		overflow-y: auto;
		transition: 0.5s;

		> .item {
			padding: 0 20px;
			width: 100%;
			height: 50px;
			display: flex;
			align-items: center;
			border-top: 1px solid #ccc;
			gap: 20px;

			input[type='checkbox'] {
				transform: scale(1.2);
			}

			&:hover {
				cursor: pointer;
				background: var(--bgColor);
			}

			h4 {
				font-weight: 500;
			}
		}

		> .favoriteListHeader {
			padding: 0 20px;
			display: flex;
			align-items: center;
			gap: 20px;
			width: 100%;
			height: 35px;
			background: var(--bgColor2);

			input[type='checkbox'] {
				transform: scale(1.2);
			}

			h4 {
				width: 100%;
				display: flex;
				justify-content: center;
				font-weight: 500;
			}
		}

		&::-webkit-scrollbar {
			width: 3px;
		}

		&::-webkit-scrollbar-thumb {
			width: 3px;
			background: #ccc;
			visibility: hidden;
		}

		&:hover::-webkit-scrollbar-thumb {
			visibility: visible;
		}
	}

	.item:last-child {
		border-bottom: 1px solid #ccc;
	}
`;

// 위아래패딩은 30px로 가봅시다.
const RightContainer = styled.div`
	width: 40%;
	height: 100%;
	overflow: hidden;
	background-color: var(--bgColor);
	padding: 20px 40px;

	// 100 85 60
	> .header {
		height: 100px;

		h2 {
			font-weight: 500;
			font-size: 2rem;
		}
		span {
			opacity: 0.8;
		}
	}

	> .contextName {
		height: 85px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		> div {
			display: flex;
			justify-content: space-between;
			margin-bottom: 1px;
			position: relative;
			height: 40px;

			h3 {
				display: flex;
				align-items: center;
				font-weight: 500;
			}
		}

		input {
			width: 100%;
			padding: 10px 10px;
			border-radius: 8px;
			border: 1px solid var(--bgColor2);

			&::placeholder {
				opacity: 0.8;
			}

			&:focus {
				outline: none;
			}
		}
	}

	> .createButtonWrapper {
		text-align: right;

		button {
			height: 40px;
			padding: 0 10px;
			border: none;
			background: #222;
			color: white;

			&:hover {
				cursor: pointer;
			}
		}
	}
`;

export default function IndicatorsTab() {
	const { deleteFavoriteMutationAll } = useFavoriteMutation();
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
						<Accordian />
					</div>
					<input type='text' placeholder='write your context name' />
				</div>

				<CreateContextSection checkedFavorite_List={checkedFavorite_List} setCheckedFavorite_List={setCheckedFavorite_List} />
			</RightContainer>
		</FavoriteContainer>
	);
}
