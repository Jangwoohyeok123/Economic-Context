import { Indicator_Type } from '@/types/fred';
import IndicatorCard from '../cards/indicatorCard/IndicatorCard';
import * as S from '../../styles/CategoryContainer.style';

interface Category_Props {
	categoryData: Indicator_Type[];
	currentPage: number;
	itemsPerPage: number;
	categoryId: number;
}

export default function Category({ categoryData, currentPage, itemsPerPage, categoryId }: Category_Props) {
	return (
		<S.CategoryContainer>
			{categoryData.length > 0 &&
				categoryData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((seriess: Indicator_Type, idx: number) => {
					return <IndicatorCard key={idx} indicator={seriess} categoryId={categoryId}></IndicatorCard>;
				})}
		</S.CategoryContainer>
	);
}
