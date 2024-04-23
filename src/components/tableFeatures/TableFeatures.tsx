import { FavoriteIndicator_Type } from '@/types/favorite';
import styled from 'styled-components';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { MdOutlineRefresh } from 'react-icons/md';

const FeaturesContainer = styled.div`
	display: flex;
	gap: 20px;
	padding-bottom: 10px;
	justify-content: right;

	span {
		background: #dfdfdf;
		padding: 3px 10px;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;

		&:hover {
			cursor: pointer;
		}
	}
`;

interface TableFeatures_Props {
	checkedFavorite_List: FavoriteIndicator_Type[];
	setCheckedFavorite_List: React.Dispatch<React.SetStateAction<FavoriteIndicator_Type[]>>;
	isChecked_List: boolean[];
	setIsChecked_List: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export default function TableFeatures({ checkedFavorite_List, setCheckedFavorite_List, isChecked_List, setIsChecked_List }: TableFeatures_Props) {
	return (
		<FeaturesContainer>
			<span
				onClick={() => {
					setCheckedFavorite_List([]);
					setIsChecked_List([]);
				}}>
				<MdOutlineRefresh />
			</span>
			<span onClick={() => {}}>
				<MdOutlineDeleteOutline />
			</span>
		</FeaturesContainer>
	);
}
