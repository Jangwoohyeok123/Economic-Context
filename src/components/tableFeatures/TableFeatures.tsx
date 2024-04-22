import { FavoriteIndicator_Type } from '@/types/favorite';
import styled from 'styled-components';

const FeaturesContainer = styled.div`
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
`;

interface TableFeatures_Props {
	checkedFavorite_List: FavoriteIndicator_Type[];
}

export default function TableFeatures({ checkedFavorite_List }: TableFeatures_Props) {
	return (
		<FeaturesContainer>
			<span>Allcheck</span>
			<span>Uncheck</span>
		</FeaturesContainer>
	);
}
