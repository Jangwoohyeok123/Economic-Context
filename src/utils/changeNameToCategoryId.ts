import categoryId from '@/const/categoryId';

export const changeNameToCategoryId = (categoryName: string): number => {
	let type = categoryId.interest;
	if (categoryName === 'interest') return (type = categoryId.interest);
	if (categoryName === 'exchange') return (type = categoryId.exchange);
	if (categoryName === 'production') return (type = categoryId.production);
	if (categoryName === 'consume') return (type = categoryId.consume);

	return type;
};

export const changeCategoryIdToName = (categoryType: number): string => {
	let categoryName = 'interest';
	if (categoryType === categoryId.interest) return (categoryName = 'interest');
	if (categoryType === categoryId.exchange) return (categoryName = 'exchange');
	if (categoryType === categoryId.production) return (categoryName = 'production');
	if (categoryType === categoryId.consume) return (categoryName = 'consume');

	return categoryName;
};
