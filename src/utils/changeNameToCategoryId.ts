import const_categoryTypes from '@/const/categoryId';

export const changeNameToCategoryId = (categoryName: string): number => {
	let type = const_categoryTypes.interest;
	if (categoryName === 'Interest') return (type = const_categoryTypes.interest);
	if (categoryName === 'Exchange') return (type = const_categoryTypes.exchange);
	if (categoryName === 'Production') return (type = const_categoryTypes.production);
	if (categoryName === 'Consume') return (type = const_categoryTypes.consume);

	return type;
};

export const changeCategoryIdToName = (categoryType: number): string => {
	let categoryName = 'Interest';
	if (categoryType === const_categoryTypes.interest) return (categoryName = 'Interest');
	if (categoryType === const_categoryTypes.exchange) return (categoryName = 'Exchange');
	if (categoryType === const_categoryTypes.production) return (categoryName = 'Production');
	if (categoryType === const_categoryTypes.consume) return (categoryName = 'Consume');

	return categoryName;
};
