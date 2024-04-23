import { FavoriteIndicator_Type } from '@/types/favorite';
import { changeCategoryIdToName } from '@/utils/changeNameToCategoryId';
import styled from 'styled-components';

const PickedTableContainer = styled.div`
	height: 55%;
	width: 100%;
	margin-bottom: 20px;

	div {
		height: 35px;
		border-bottom: 1px solid var(--bgColor);
	}

	.tableHead {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		background: var(--bgColor);
		border-bottom: none;

		span {
			width: 60%;
			display: inline-block;
			text-align: center;
		}

		span:nth-of-type(2) {
			width: 20%;
		}

		span:nth-of-type(3) {
			width: 20%;
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

			div {
				display: flex;
				justify-content: center;
				align-items: center;
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
					display: inline-block; // 너비와 높이 조정 가능하게 변경
					max-width: 100%; // 부모의 최대 너비를 넘지 않도록 설정
					overflow: hidden; // 넘치는 내용 숨김
					text-overflow: ellipsis; // 넘치는 텍스트를 '...'로 표시
					white-space: nowrap; // 줄바꿈 없이 한 줄에 표시
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
	isChecked_List: boolean[];
	setIsChecked_List: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export default function PickedTable({ checkedFavorite_List, isChecked_List, setIsChecked_List }: PickedTable_Props) {
	return (
		<PickedTableContainer>
			<div className='tableHead'>
				<span>Indicator</span>
				<span>category</span>
			</div>
			<div className='tableBody'>
				{checkedFavorite_List.map((favoriteIndicator, index) => {
					const { title, categoryId } = favoriteIndicator;

					return (
						<div className='row' key={index}>
							<div
								onClick={() => {
									const newCheckedList = [...isChecked_List];
									// 배열의 해당 요소를 토글
									newCheckedList[index] = !newCheckedList[index];
									// 새로운 배열로 상태 업데이트
									setIsChecked_List(newCheckedList);
								}}>
								<input type='checkbox' checked={isChecked_List[index]}></input>
								<span>{title}</span>
							</div>
							<div>{changeCategoryIdToName(categoryId)}</div>
						</div>
					);
				})}
			</div>
		</PickedTableContainer>
	);
}
