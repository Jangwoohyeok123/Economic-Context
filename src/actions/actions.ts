// user
export const login = () => {
	return { type: 'login' };
};

export const logout = () => {
	return { type: 'logout' };
};

// savedCardSet
// 카드를 추가하는 액션 생성자
export const addCard = (category: string, seriesId: string, title: string) => ({
	type: 'add',
	payload: { category, card: { seriesId, title } }
});

// 카드를 삭제하는 액션 생성자
export const removeCard = (category: string, seriesId: string) => ({
	type: 'remove',
	payload: { category, seriesId }
});
