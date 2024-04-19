import const_categoryId from '@/const/categoryId';
import const_categoryTypes from '@/const/categoryId';

export const changeNameToCategoryId = (categoryName: string): number => {
	let type = const_categoryTypes.interest_mortgage;
	if (categoryName === 'Interest') return (type = const_categoryTypes.interest_mortgage);
	if (categoryName === 'Exchange') return (type = const_categoryTypes.exchange);
	if (categoryName === 'Production') return (type = const_categoryTypes.production);
	if (categoryName === 'Consume') return (type = const_categoryTypes.consume);

	return type;
};

export const changeCategoryIdToName = (categoryId: number): string => {
	let categoryName = 'Interest';
	if (categoryId === const_categoryTypes.interest_mortgage) return (categoryName = 'Interest');
	if (categoryId === const_categoryTypes.exchange) return (categoryName = 'Exchange');
	if (categoryId === const_categoryTypes.production) return (categoryName = 'Production');
	if (categoryId === const_categoryTypes.consume) return (categoryName = 'Consume');

	return categoryName;
};

export const changeCategoryIdToColor = (categoryId: number): string => {
	let categoryColor = '';
	if (categoryId === const_categoryId.interest_mortgage) categoryColor = '#E5B04F';
	if (categoryId === const_categoryId.interest_fed) categoryColor = '#B88855';
	if (categoryId === const_categoryId.materials) categoryColor = '#D8C3A0';
	if (categoryId === const_categoryId.gdp) categoryColor = '#A9C9C2';
	if (categoryId === const_categoryId.exchange) categoryColor = '#59AEC3';
	if (categoryId === const_categoryId.production) categoryColor = '#FEBCD7';
	if (categoryId === const_categoryId.consume) categoryColor = '#CBEDFE';
	if (categoryId === const_categoryId.labor) categoryColor = '#7CB8EF';

	return categoryColor;
};
