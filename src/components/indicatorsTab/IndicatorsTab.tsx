import clsx from 'clsx';
import styles from './IndicatorsTab.module.scss';
import { Store_Type } from '@/types/redux';
import { useEffect, useRef, useState } from 'react';
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
import TableFeatures from '../tableFeatures/TableFeatures';
import CheckedFavoriteSection from '../checkedFavoriteSection/CheckedFavoriteSection';

const itemsPerPage = 3;

const FavoriteContainer = styled.section`
	display: flex;
	width: 100%;
	height: calc(100vh - var(--headerSize) - 30px * 2); // 100vh - headerSize - padding * 2 - menuSize
	justify-content: space-evenly;
`;

const LeftContainer = styled.section`
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
		overflow-y: auto;
		transition: 0.5s;

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
const RightContainer = styled.section`
	width: 40%;
	background: #fff;
	padding: 30px 40px;

	.header {
		height: 15%;

		h2 {
			font-weight: 500;
			font-size: 2rem;
		}
		span {
			opacity: 0.8;
		}
	}

	.contextName {
		height: 15%;

		h3 {
			font-weight: 500;
			padding-bottom: 5px;
		}

		input {
			width: 100%;
			padding: 10px 10px;

			&::placeholder {
				opacity: 0.8;
			}

			&:focus {
				outline: none;
			}
		}
	}

	.features {
		display: flex;
		gap: 20px;
		padding-bottom: 10px;

		span {
			background: #dfdfdf;
			padding: 3px 15px;
			border-radius: 10px;

			&:hover {
				cursor: pointer;
			}
		}
	}

	.createButtonWrapper {
		text-align: right;

		button {
			padding: 10px 20px;
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
	const user = useSelector((state: Store_Type) => state.user);

	// const [categoryIndex, setCategoryIndex] = useState<number>(0);
	const [isValidateModal, setIsValidateModal] = useState<boolean>(false);

	const { deleteFavoriteMutationAll } = useFavoriteMutation();
	const { allFavorites_List } = useFavoriteQuery();
	const [currentCategoryId, setCurrentCategoryId] = useState<number>(const_categoryId.interest_mortgage);
	const [checkedFavorite_List, setCheckedFavorite_List] = useState<FavoriteIndicator_Type[]>([]);
	const refIndicatorCheckbox = useRef<HTMLInputElement>(null);

	// const curFavorites = favoritesWithPick?.filter((favorite: FavoriteIndicator_Type) => favorite?.categoryId == currentCategoryId);
	if (!allFavorites_List) {
		return <div>isLoading</div>;
	}

	const curFavorites_List = allFavorites_List?.filter(favorite => {
		return favorite.categoryId === currentCategoryId;
	});

	// 정확하게 정리하고 말로 설명해보기
	const pickIndicator = (favoriteIndicator: FavoriteIndicator_Type) => {
		setCheckedFavorite_List(prev => {
			if (prev.find(item => item.seriesId === favoriteIndicator.seriesId)) {
				return prev.filter(item => item.seriesId !== favoriteIndicator.seriesId);
			}

			return [...prev, favoriteIndicator];
		});
	};

	const openAlertModal = () => {
		setIsValidateModal(!isValidateModal);
	};

	return (
		<div className={clsx(styles.IndicatorsTab)}>
			<FavoriteContainer>
				<LeftContainer>
					<nav>
						{categoryIds.map((categoryId, index) => {
							if (index > 4) return;

							return (
								<button
									key={index}
									className={categoryId === currentCategoryId ? clsx(styles.on) : ''}
									onClick={() => setCurrentCategoryId(categoryId)}>
									{changeCategoryIdToName(categoryId)}
								</button>
							);
						})}
					</nav>

					<div className='favoriteList'>
						{curFavorites_List.length > 0
							? curFavorites_List?.map((favoriteIndicator: FavoriteIndicator_Type, index: number) => {
									const { title, seriesId, notes, categoryId, observation_end, observation_start, frequency, popularity } = favoriteIndicator;

									// 선언당시에 값을 기억하는 것 같은데 이런현상이 가능한 이유가뭐지?
									// input의 check가 안됐다면 setCheckedFavorite를 통해 값을 추가한다.
									// input의 check가 됐다면 setCheckedFavorite를 통해 값을 삭제한다.
									return (
										<div key={index} className='item' onClick={() => pickIndicator(favoriteIndicator)}>
											<input
												type='checkbox'
												ref={refIndicatorCheckbox}
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
						<span>make your custom content</span>d
					</div>
					<div className='contextName'>
						<h3>Context Name</h3>
						<input type='text' placeholder='write your context name' />
					</div>

					<CheckedFavoriteSection
						checkedFavorite_List={checkedFavorite_List}
						isValidateModal={isValidateModal}
						setIsValidateModalOpen={setIsValidateModal}
					/>
				</RightContainer>
			</FavoriteContainer>

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
