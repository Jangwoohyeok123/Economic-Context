import const_categoryTypes from '@/const/categoryId';

export const changeNameToCategoryId = (categoryName: string): number => {
	let type = const_categoryTypes.interest;
	if (categoryName === 'interest') return (type = const_categoryTypes.interest);
	if (categoryName === 'exchange') return (type = const_categoryTypes.exchange);
	if (categoryName === 'production') return (type = const_categoryTypes.production);
	if (categoryName === 'consume') return (type = const_categoryTypes.consume);

	return type;
};

export const changeCategoryIdToName = (categoryType: number): string => {
	let categoryName = 'interest';
	if (categoryType === const_categoryTypes.interest) return (categoryName = 'interest');
	if (categoryType === const_categoryTypes.exchange) return (categoryName = 'exchange');
	if (categoryType === const_categoryTypes.production) return (categoryName = 'production');
	if (categoryType === const_categoryTypes.consume) return (categoryName = 'consume');

	return categoryName;
};
