import { combineReducers } from 'redux';

const userInitialState = {
	isLogin: true,
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
		console.log(userData);
		return { ...state, userData: userData, isLogin: true };
	} else if (action.type === 'logout') return { ...state, isLogin: false };

	return state;
};

const chartModalInitialState = {
	isModalOpen: false
};

const chartModalReducer = (state = chartModalInitialState, action: { type: string; payload: any }) => {
	if (action.type === 'open') {
		return { ...state, isModalOpen: true };
	} else if (action.type === 'close') return { ...state, isModalOpen: false };

	return state;
};

const combinedReducers = combineReducers({
	user: userReducer,
	chartModal: chartModalReducer
});

export default combinedReducers;
