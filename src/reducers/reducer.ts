import { combineReducers } from 'redux';

const userInitialState = {
	isLogin: true,
	userId: 'JWH'
};

const userReducer = (state = userInitialState, action) => {
	if (action.type === 'login') return { ...state, isLogin: true };
	else if (action.type === 'logout') return { ...state, isLogin: false };

	return state;
};

const savedCardSetState = {
	interest: [],
	exchange: [],
	consume: [],
	production: []
};

interface savedCardSetAction {
	type: string;
	payload: {
		category: string;
		card: {
			seriesId: string;
			title: string;
		};
	};
}

/* 
	1. 카테고리를 찾아서 배열에 추가하는 로직이 있어야함
	2. 
	3. 
*/
const savedCardSetReducer = (state = savedCardSetState, action) => {
	if (action.type === '') {
		const { category, card } = action.payload;
		return {
			...state,
			[category]: [...state[category], card]
		};
	} else if (action.type === 'remove') {
		const { category, seriesId } = action.payload;
		return {
			...state,
			[category]: state[category].filter(card => card.seriesId !== seriesId)
		};
	}

	return state;
};

const combinedReducers = combineReducers({
	user: userReducer,
	savedCardSet: savedCardSetReducer
});

export default combinedReducers;
