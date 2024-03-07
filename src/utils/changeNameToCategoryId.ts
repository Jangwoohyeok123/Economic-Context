import categoryTypes from '@/const/categoryId';

export const changeNameToType = (categoryName: string): number => {
	let type = categoryTypes.interest;
	if (categoryName === 'interest') return (type = categoryTypes.interest);
	if (categoryName === 'exchange') return (type = categoryTypes.exchange);
	if (categoryName === 'production') return (type = categoryTypes.production);
	if (categoryName === 'consume') return (type = categoryTypes.consume);

	return type;
};

export const changeTypeToName = (categoryType: number): string => {
	let categoryName = 'interest';
	if (categoryType === categoryTypes.interest) return (categoryName = 'interest');
	if (categoryType === categoryTypes.exchange) return (categoryName = 'exchange');
	if (categoryType === categoryTypes.production) return (categoryName = 'production');
	if (categoryType === categoryTypes.consume) return (categoryName = 'consume');

	return categoryName;
};
