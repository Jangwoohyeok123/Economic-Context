import clsx from 'clsx';
import styles from './IndicatorsTab.module.scss';
import { Store_Type } from '@/types/redux';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useFavoriteQuery from '@/hooks/useFavoriteQuery';
import useFavoriteMutation from '@/hooks/useFavoriteMutation';
import { changeCategoryIdToName } from '@/utils/changeNameToCategoryId';
import AlertModal from '../modals/alertModal/AlertModal';
import { FavoriteIndicator_Type } from '@/types/favorite';
import styled from 'styled-components';
import const_categoryId, { categoryIds } from '@/const/categoryId';
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

	.favoriteList {
		height: calc(100% - var(--headerSize) - 20px);
		overflow-y: auto;
		transition: 0.5s;

		> .item {
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

		> .favoriteListHeader {
			padding: 0 20px;
			display: flex;
			align-items: center;
			gap: 20px;
			width: 100%;
			height: 40px;
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
const RightContainer = styled.section`
	width: 40%;
	background: #fff;
	padding: 30px 40px;

	> .header {
		height: 15%;

		h2 {
			font-weight: 500;
			font-size: 2rem;
		}
		span {
			opacity: 0.8;
		}
	}

	> .contextName {
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

	> .features {
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

	> .createButtonWrapper {
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
	const [isValidateModal, setIsValidateModal] = useState<boolean>(false);

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

	const openAlertModal = () => setIsValidateModal(!isValidateModal);

	// checked라면 checkedFavorite_List에서 curFavorite_List와 일치하는 지표들을 삭제한다.
	// !checked라면 checkedFavorite_List에서 curFavorite_List와 일치하는 지표들을 삭제하고 curFavorite_List를 checkedFavorite_List에 추가한다.
	const allClick = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = e.target;

		if (checked) {
			// 체크된 경우: 현재의 curFavorites_List를 추가하지만 중복을 피하기 위해 Set을 사용
			setCheckedFavorite_List(prev => [...new Set([...prev, ...curFavorites_List])]);
		} else {
			// 체크 해제된 경우: curFavorites_List와 일치하는 항목을 제거하고, 나머지는 유지
			const idsToRemove = new Set(curFavorites_List.map(item => item.seriesId));
			setCheckedFavorite_List(prev => prev.filter(item => !idsToRemove.has(item.seriesId)));
		}
	};

	function isSubset(subset: FavoriteIndicator_Type[], superset: FavoriteIndicator_Type[]) {
		if (subset.length === 0) return false;
		return subset.every(element => superset.includes(element));
	}

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

					{/* checkedFavorite_List에 curFavorite_List가 모두 포함되어 있다면 input의 checked는 true가 되도록 만들기 */}
					<div className='favoriteList' ref={refFavoriteList}>
						<div className='favoriteListHeader'>
							<input type='checkbox' checked={isSubset(curFavorites_List, checkedFavorite_List)} onChange={allClick} />
							<h4>Indicator</h4>
						</div>
						{curFavorites_List.length > 0
							? curFavorites_List?.map((favoriteIndicator: FavoriteIndicator_Type, index: number) => {
									const { title, seriesId, notes, categoryId, observation_end, observation_start, frequency, popularity } = favoriteIndicator;

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
						<span>make your custom content</span>d
					</div>
					<div className='contextName'>
						<h3>Context Name</h3>
						<input type='text' placeholder='write your context name' />
					</div>

					<CheckedFavoriteSection
						checkedFavorite_List={checkedFavorite_List}
						setCheckedFavorite_List={setCheckedFavorite_List}
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
