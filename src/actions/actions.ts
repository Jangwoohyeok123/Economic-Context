import User from '@/types/userInterface';

// user
export const login = (user: User) => {
	return { type: 'login', payload: user };
};

export const logout = () => {
	return { type: 'logout' };
};

// chartModal
export const open = () => {
	return { type: 'open' };
};

export const close = () => {
	return { type: 'close' };
};
