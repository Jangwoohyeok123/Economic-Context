const const_categoryId = {
	interest_mortgage: 114,
	interest_fed: 22,
	materials: 32217,
	gdp: 106,
	exchange: 94,
	production: 33580,
	consume: 32424,
	labor: 33509
};

export default const_categoryId;

const categoryIdsKeys = Object.keys(const_categoryId) as Array<keyof typeof const_categoryId>;
export const categoryIds: number[] = categoryIdsKeys.map(key => {
	return const_categoryId[key];
});
