import { combineReducers } from 'redux';

const userInitialState = {
	isLogin: false,
	userData: {
		createdAt: '',
		email: '',
		favorite_indicators: null,
		google_id: '',
		id: 1,
		picture_url: ''
	}
};

const userReducer = (state = userInitialState, action: { type: string; payload: any }) => {
	if (action.type === 'login') {
		const userData = action.payload;
		return { ...state, userData: userData, isLogin: true };
	} else if (action.type === 'logout') return { ...state, isLogin: false };

	return state;
};

const combinedReducers = combineReducers({
	user: userReducer
});

export default combinedReducers;
