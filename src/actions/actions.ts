import User from '@/types/userInterface';

// user
export const login = (user: User) => {
	return { type: 'USER_LOGIN', payload: user };
};

export const logout = () => {
	return { type: 'USER_LOGOUT' };
};

// Modal
export const chartModalOpen = () => {
	return { type: 'open' };
};

export const chartModalClose = () => {
	return { type: 'close' };
};

export const toggleValidationNameModal = () => {
	return { type: 'TOGGLE_VALIDATION_NAME_MODAL' };
};
