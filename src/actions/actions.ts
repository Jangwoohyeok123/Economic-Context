import User from '@/types/userInterface';

// user
export const login = (user: User) => {
	return { type: 'login', payload: user };
};

export const logout = () => {
	return { type: 'logout' };
};

// Modal
export const chartModalOpen = () => {
	return { type: 'open' };
};

export const chartModalClose = () => {
	return { type: 'close' };
};

export const openValidateModal = () => {
	return { type: 'OPEN_VALIDATE_MODAL' };
};

// 'CLOSE_VALIDATE_MODAL' 액션 생성자
export const closeValidateModal = () => {
	return { type: 'CLOSE_VALIDATE_MODAL' };
};
