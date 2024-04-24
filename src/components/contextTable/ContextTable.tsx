import { FavoriteIndicator_Type } from '@/types/favorite';
import { changeCategoryIdToName } from '@/utils/changeNameToCategoryId';
import styled from 'styled-components';

const ContextTableContainer = styled.div`
	height: 55%;
	width: 100%;
	margin-bottom: 20px;

	div {
		height: 35px;
		border-bottom: 1px solid var(--bgColor);
	}

	/* 
				<div className='tableHead'>
				<div className='favoriteListHeader'>
					<input type='checkbox' />
					<h4>Indicator</h4>
				</div>
				<span>category</span>
			</div>
	
	
	*/

	.tableHead {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		background: var(--bgColor);
		border-bottom: none;
		padding: 0 30px 0 25px;

		> .favoriteListHeader {
			display: flex;
			align-items: center;
			width: 100%;
			gap: 10px;

			> input {
				transform: scale(1.2);
			}

			> h4 {
				width: 100%;
				display: flex;
				justify-content: center;
				font-weight: 500;
			}
		}
	}

	.tableBody {
		overflow-y: scroll;
		height: calc(100% - 35px);

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

		.row {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 20px;

			div {
				display: flex;
				align-items: center;
				justify-content: right;
				width: 70%;
			}

			div:nth-of-type(1) {
				gap: 10px;
				padding-left: 3px;
				width: 65%;
				justify-content: left;
				overflow: hidden; /* 내용이 넘치면 잘라냄 */

				/* 텍스트 관련 스타일 추가 */
				white-space: nowrap; /* 텍스트를 한 줄로 유지 */
				text-overflow: ellipsis; /* 텍스트가 넘치면 ...로 표시 */

				input[type='checkbox'] {
					transform: scale(1.2);
				}

				span {
					display: inline-block;
					max-width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			div:nth-of-type(2) {
				width: 20%;
			}
		}
	}
`;

interface PickedTable_Props {
	checkedFavorite_List: FavoriteIndicator_Type[];
	finalCheckedFavorite_List: FavoriteIndicator_Type[];
	setFinalCheckedFavorite_List: React.Dispatch<React.SetStateAction<FavoriteIndicator_Type[]>>;
}

export default function ContextTable({ checkedFavorite_List, finalCheckedFavorite_List, setFinalCheckedFavorite_List }: PickedTable_Props) {
	return (
		<ContextTableContainer>
			<div className='tableHead'>
				<div className='favoriteListHeader'>
					<input
						type='checkbox'
						checked={finalCheckedFavorite_List.length !== 0 && finalCheckedFavorite_List.length === checkedFavorite_List.length}
						onChange={() => {
							if (checkedFavorite_List.length !== finalCheckedFavorite_List.length) setFinalCheckedFavorite_List(checkedFavorite_List);
							else setFinalCheckedFavorite_List([]);
						}}
					/>
					<h4>Indicator</h4>
				</div>
				<span>category</span>
			</div>
			<div className='tableBody'>
				{checkedFavorite_List.map((favoriteIndicator, index) => {
					const { title, categoryId } = favoriteIndicator;

					// finalCheckedFavorite_List에 포함된 요소라면 true이다.
					return (
						<div className='row' key={index}>
							<div
								onClick={() =>
									setFinalCheckedFavorite_List(prev => {
										if (finalCheckedFavorite_List.includes(favoriteIndicator))
											return prev.filter(indicator => indicator.seriesId !== favoriteIndicator.seriesId);
										else return [...prev, favoriteIndicator];
									})
								}>
								<input type='checkbox' checked={finalCheckedFavorite_List.includes(favoriteIndicator)}></input>
								<span>{title}</span>
							</div>
							<div>{changeCategoryIdToName(categoryId)}</div>
						</div>
					);
				})}
			</div>
		</ContextTableContainer>
	);
}
