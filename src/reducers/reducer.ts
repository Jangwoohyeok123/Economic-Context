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

// modal 은 전역으로 무조건 관리하자
const chartModalReducer = (state = chartModalInitialState, action: { type: string; payload: any }) => {
	if (action.type === 'open') {
		return { ...state, isModalOpen: true };
	} else if (action.type === 'close') return { ...state, isModalOpen: false };

	return state;
};

const validationModalReducer = (state = { isModalOpen: false }, action: { type: string; payload: boolean }) => {
	switch (action.type) {
		case 'OPEN_VALIDATE_MODAL':
			return { ...state, isModalOpen: true };
		case 'CLOSE_VALIDATE_MODAL':
			return { ...state, isModalOpen: false };
		default:
			return state;
	}
};

const combinedReducers = combineReducers({
	user: userReducer,
	chartModal: chartModalReducer,
	validationModal: validationModalReducer
});

export default combinedReducers;
