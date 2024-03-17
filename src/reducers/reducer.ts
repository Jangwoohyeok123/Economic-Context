import { combineReducers } from 'redux';

const userInitialState = {
	isLogin: false,
	createdAt: '',
	email: '',
	favorite_indicators: null,
	google_id: '',
	id: 1,
	picture_url: ''
};

const userReducer = (state = userInitialState, action: { type: string; payload: any }) => {
	if (action.type === 'USER_LOGIN') {
		const userData = action.payload;
		const { createAt, email, favorite_indicators, google_id, id, picture_url } = userData;
		return { ...state, createAt, email, favorite_indicators, google_id, id, picture_url, isLogin: true };
	} else if (action.type === 'USER_LOGOUT') return { ...state, isLogin: false };

	return state;
};

const combinedReducers = combineReducers({
	user: userReducer
});

export default combinedReducers;
