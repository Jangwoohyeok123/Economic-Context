import { combineReducers } from 'redux';

const userInitialState = {
	isLogin: false,
	userId: 'JWH'
};

const userReducer = (state = userInitialState, action) => {
	if (action.type === 'login') return { ...state, isLogin: true };
	else if (action.type === 'logout') return { ...state, isLogin: false };

	return state;
};

const combinedReducers = combineReducers({
	user: userReducer
});

export default combinedReducers;
