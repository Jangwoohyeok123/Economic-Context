import const_categoryColor from '@/const/categoryColor';
import const_categoryTypes from '@/const/categoryId';
import { ReactElement } from 'react';

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
	if (categoryId === const_categoryTypes.interest_mortgage) return (categoryName = 'Mortagage');
	if (categoryId === const_categoryTypes.interest_fed) return (categoryName = 'Fed');
	if (categoryId === const_categoryTypes.materials) return (categoryName = 'Materials');
	if (categoryId === const_categoryTypes.gdp) return (categoryName = 'GDP');
	if (categoryId === const_categoryTypes.exchange) return (categoryName = 'Exchange');
	if (categoryId === const_categoryTypes.production) return (categoryName = 'Production');
	if (categoryId === const_categoryTypes.consume) return (categoryName = 'Consume');
	if (categoryId === const_categoryTypes.labor) return (categoryName = 'Labor');

	return categoryName;
};

export const changeCategoryIdToColor = (categoryId: number): string => {
	const defaultColor = '#333;';
	let categoryName = changeCategoryIdToName(categoryId);
	let color = const_categoryColor[categoryName];
	if (categoryName === 'Interest') color = const_categoryColor['interest_mortgage'];
	if (categoryName === 'Fed') color = const_categoryColor['interest_fed'];
	if (categoryName === 'Materials') color = const_categoryColor['materials'];
	if (categoryName === 'GDP') color = const_categoryColor['gdp'];
	if (categoryName === 'Exchange') color = const_categoryColor['exchange'];
	if (categoryName === 'Production') color = const_categoryColor['production'];
	if (categoryName === 'Consume') color = const_categoryColor['consume'];
	if (categoryName === 'Labor') color = const_categoryColor['labor'];

	return color || defaultColor;
};
