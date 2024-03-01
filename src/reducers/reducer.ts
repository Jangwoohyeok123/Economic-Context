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

const savedCardSetReducer = (state = savedCardSetState, action) => {
	if (action.type === 'add') {
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
