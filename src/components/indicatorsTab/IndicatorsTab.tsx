import clsx from 'clsx';
import styles from './IndicatorsTab.module.scss';
import { Store_Type } from '@/types/redux';
import { useEffect, useState } from 'react';
import IndicatorCard from '../cards/indicatorCard/IndicatorCard';
import { useSelector } from 'react-redux';
import BubblePopButton from '../bubblePopButton/BubblePopButton';
import useFavoriteQuery from '@/hooks/useFavoriteQuery';
import useFavoriteMutation from '@/hooks/useFavoriteMutation';
import { changeCategoryIdToName, changeNameToCategoryId } from '@/utils/changeNameToCategoryId';
import MakeContextModal from '../modals/makeContextModal/MakeContextModal';
import AlertModal from '../modals/alertModal/AlertModal';
import { FavoriteIndicatorWithIsPick_Type, FavoriteIndicator_Type } from '@/types/favorite';
import Pagination from '../pagination/Pagination';
import FavoriteIndicatorCard from '../cards/favoriteIndicatorCard/FavoriteIndicatorCard';
import styled from 'styled-components';
import const_categoryId, { categoryIds } from '@/const/categoryId';
import PickedTable from '../pickedTable/PickedTable';

const itemsPerPage = 3;

const FavoriteWrapper = styled.section`
	display: flex;
	width: 100%;
	height: calc(100vh - var(--headerSize) - 30px * 2); // 100vh - headerSize - padding * 2 - menuSize
	justify-content: space-evenly;
`;

const LeftWrapper = styled.section`
	width: 50%;
	height: 100%;

	.item {
		padding: 0 20px;
		width: 100%;
		height: 60px;
		display: flex;
		align-items: center;
		border-top: 1px solid #ccc;
		gap: 20px;

		input[type='checkbox'] {
			transform: scale(1.2);
		}

		&:hover {
			background: #ddd;
		}

		h4 {
			font-weight: 500;
		}
	}

	.favoriteList {
		height: calc(100% - var(--headerSize) - 20px);
		overflow-y: scroll;
	}

	.item:last-child {
		border-bottom: 1px solid #ccc;
	}
`;

const RightWrapper = styled.section`
	width: 40%;
	height: 100%;
	background: #fff;
`;

export default function IndicatorsTab() {
	const user = useSelector((state: Store_Type) => state.user);

	// const [categoryIndex, setCategoryIndex] = useState<number>(0);
	const [isValidateModal, setIsValidateModal] = useState<boolean>(false);

	const { deleteFavoriteMutationAll } = useFavoriteMutation();
	const { allFavorites_List } = useFavoriteQuery();
	const [currentCategoryId, setCurrentCategoryId] = useState<number>(const_categoryId.interest_mortgage);

	// const curFavorites = favoritesWithPick?.filter((favorite: FavoriteIndicator_Type) => favorite?.categoryId == currentCategoryId);
	if (!allFavorites_List) {
		return <div>isLoading</div>;
	}

	const curFavorites_List = allFavorites_List?.filter(favorite => {
		return favorite.categoryId === currentCategoryId;
	});

	return (
		<div className={clsx(styles.IndicatorsTab)}>
			<FavoriteWrapper>
				<LeftWrapper>
					<nav>
						{categoryIds.map((categoryId, index) => {
							if (index > 4) return;

							return (
								<button
									key={index}
									className={categoryId === currentCategoryId ? clsx(styles.on) : ''}
									onClick={() => {
										setCurrentCategoryId(categoryId);
									}}>
									{changeCategoryIdToName(categoryId)}
								</button>
							);
						})}
					</nav>

					<div className='favoriteList'>
						{curFavorites_List.length > 0
							? curFavorites_List?.map((favorite: FavoriteIndicator_Type, index: number) => {
									const { title, seriesId, notes, categoryId, observation_end, observation_start, frequency, popularity } = favorite;

									return (
										<div key={index} className='item'>
											<input type='checkbox' />
											<h4>{title}</h4>
										</div>
									);
							  })
							: ''}
					</div>
				</LeftWrapper>
				<RightWrapper>
					<div>
						<h2>Create Context</h2>
						<span>make your custom content</span>
					</div>
					<div>
						<h3>Context Name</h3>
						<input type='text' />
					</div>
					<div className='features'>
						<span>Allcheck</span>
						<span>Uncheck</span>
					</div>
					<PickedTable />
					<button>create Context</button>
				</RightWrapper>
			</FavoriteWrapper>

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

/*
						// <FavoriteIndicatorCard key={index}>
						// 	<div className={styles.buttons}>
						// 		<BubblePopButton clickHandler={() => deleteFavoriteMutationAll?.mutate({ userId: user.id, seriesId })}>delete</BubblePopButton>
						// 		<BubblePopButton
						// 			className={isPick ? clsx(styles.on) : ''}
						// 			clickHandler={() => {
						// 				const updated = favoritesWithPick?.map((favorite: FavoriteIndicatorWithIsPick_Type) => {
						// 					if (favorite.seriesId === seriesId) {
						// 						return {
						// 							...favorite,
						// 							isPick: !favorite.isPick
						// 						};
						// 					}

						// 					return favorite;
						// 				});

						// 				setFavoritesWithPick(updated);
						// 			}}>
						// 			{isPick ? 'unpick' : 'pick'}
						// 		</BubblePopButton>
						// 	</div>
						// </FavoriteIndicatorCard>



			  <Pagination
					data_List={favoritesWithPick.filter(favoriteIndicator => favoriteIndicator.categoryId === categoryId)}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					itemsPerPage={3}
					pageRangeDisplayed={5}
				/>

        <MakeContextModal favorites={favoritesWithPick} isModalOpen={isMakeOpen} setIsModalOpen={setIsMakeOpen} />
        <div className={clsx(styles.item, styles.buttonWrap)}>
					<button
						onClick={() => {
							if (favoritesWithPick?.filter(favoriteIndicator => favoriteIndicator.isPick).length > 0) setIsMakeOpen(true);
							else setIsValidateModal(true);
						}}>
						Make Context
					</button>
				</div> 

				const pagedFavorite = curFavorites?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

		const updated = allFavorites_List?.map((favoriteIndicator: FavoriteIndicator_Type) => {
			return {
				...favoriteIndicator,
				isPick: false
			};
		});

		updated && setFavoritesWithPick(updated);
	}, [allFavorites_List]);
*/
