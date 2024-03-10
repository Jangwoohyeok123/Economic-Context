import User from '@/types/userInterface';

// user
export const login = (user: User) => {
	return { type: 'USER_LOGIN', payload: user };
};

export const logout = () => {
	return { type: 'USER_LOGOUT' };
};
