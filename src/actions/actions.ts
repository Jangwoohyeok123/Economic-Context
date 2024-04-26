import { User_Type } from '@/types/user';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const TOGGLE_LOGIN_ALERT_MODAL = 'TOGGLE_LOGIN_ALERT_MODAL';

// user
export const loginUser = (user: User_Type) => {
	return { type: USER_LOGIN, payload: user };
};

export const logoutUser = () => {
	return { type: USER_LOGOUT };
};

export const toggleLoginModal = () => ({
	type: TOGGLE_LOGIN_ALERT_MODAL
});
