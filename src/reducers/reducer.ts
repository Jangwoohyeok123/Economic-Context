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
		return { ...state, userData: userData, isLogin: true };
	} else if (action.type === 'USER_LOGOUT') return { ...state, isLogin: false };

	return state;
};

const combinedReducers = combineReducers({
	user: userReducer,
	chartModal: chartModalReducer,
	validateNameReducer: validateNameReducer
});

export default combinedReducers;
