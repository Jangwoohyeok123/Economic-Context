import { FavoriteIndicator_Type } from '@/types/favorite';
import styled from 'styled-components';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { MdOutlineRefresh } from 'react-icons/md';
import React from 'react';

// height 60px;
const FeaturesContainer = styled.div`
	height: 30px;
	padding-top: 20px;
	padding-bottom: 10px;
	display: flex;
	/* background-color: #aaa; */
	align-items: center;
	gap: 20px;
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
	finalCheckedFavorite_List: FavoriteIndicator_Type[];
	setFinalCheckedFavorite_List: React.Dispatch<React.SetStateAction<FavoriteIndicator_Type[]>>;
}
// finalCheckedFavorite_List, setFinalCheckedFavorite_List
export default function ContextTableMethods({
	checkedFavorite_List,
	setCheckedFavorite_List,
	finalCheckedFavorite_List,
	setFinalCheckedFavorite_List
}: TableFeatures_Props) {
	return (
		<FeaturesContainer>
			<span
				onClick={() => {
					setCheckedFavorite_List([]);
					setFinalCheckedFavorite_List([]);
				}}>
				<MdOutlineRefresh />
			</span>
			<span
				onClick={() => {
					setCheckedFavorite_List(prev => {
						return prev.filter(indicator => !finalCheckedFavorite_List.includes(indicator));
					});

					setFinalCheckedFavorite_List([]);
				}}>
				<MdOutlineDeleteOutline />
			</span>
		</FeaturesContainer>
	);
}
