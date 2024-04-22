import { FavoriteIndicator_Type } from '@/types/favorite';
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

			div {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 60%;
			}

			div:nth-of-type(1) {
				gap: 10px;
				padding-left: 3px;
				justify-content: left;
				overflow: hidden; /* 내용이 넘치면 잘라냄 */

				input[type='checkbox'] {
					transform: scale(1.2);
				}
			}

			div:nth-of-type(2) {
				width: 20%;
			}

			div:nth-of-type(3) {
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
				<span>volality</span>
				<span>category</span>
			</div>
			<div className='tableBody'>
				{checkedFavorite_List.map((favoriteIndicator, index) => {
					const { title } = favoriteIndicator;

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
							<div>volality</div>
							<div>category</div>
						</div>
					);
				})}
			</div>
		</PickedTableContainer>
	);
}
