const changeNameToCategoryId = (categoryName: string): string => {
	let categoryId = 'interest';
	if (categoryName === 'interest') return (categoryId = '114');
	if (categoryName === 'exchange') return (categoryId = '94');
	if (categoryName === 'production') return (categoryId = '9');
	if (categoryName === 'consume') return (categoryId = '31');

	return categoryId;
};

export default changeNameToCategoryId;
