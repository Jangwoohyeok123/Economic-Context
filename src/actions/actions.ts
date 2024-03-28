import { User_Type } from '@/types/user';

// user
export const login = (user: User_Type) => {
	return { type: 'USER_LOGIN', payload: user };
};

export const logout = () => {
	return { type: 'USER_LOGOUT' };
};
