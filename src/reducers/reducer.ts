import { TOGGLE_LOGIN_ALERT_MODAL, USER_LOGIN, USER_LOGOUT } from '@/actions/actions';
import { combineReducers } from 'redux';
// reducer란 새로운 전역 state를 만드는 순수함수다.

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
	switch (action.type) {
		case USER_LOGIN: {
			const { createAt, email, favorite_indicators, google_id, id, picture_url } = action.payload;
			return { ...state, createAt, email, favorite_indicators, google_id, id, picture_url, isLogin: true };
		}
		case USER_LOGOUT:
			return { ...state, isLogin: false };
		default:
			return state;
	}
};

// 전역 state의 이름은 isLoginAlertModalOpen ?
const initialState = {
	isLoginAlertModalOpen: false
};

/* 
	dispatch(action())에서 action함수의 type은 switch조건문에 전달되고 payload는 새로운 state를 생성하는데 사용될 값입니다.
*/
const loginModalReducer = (state = initialState, action: { type: string; payload: boolean }) => {
	switch (action.type) {
		case TOGGLE_LOGIN_ALERT_MODAL:
			return {
				...state,
				isLoginAlertModalOpen: !state.isLoginAlertModalOpen
			};
		default:
			return state;
	}
};

// 이 코드를 보고 useSelector를 사용하세요.
/**
 * const isLogin = useSelector(state => state.userReducer.isLogin);
 * const isLoginAlertModalOpen = useSelector(state => state.loginAlertModal.isLoginAlertModalOpen);
 * */

const combinedReducers = combineReducers({
	user: userReducer,
	loginAlertModal: loginModalReducer
});

export default combinedReducers;
