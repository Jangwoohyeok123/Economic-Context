import { Favorite_Type } from '@/types/backendType';
import axios from 'axios';

export const addContext = async (userId: number, name: string, customIndicators: Favorite_Type[]) => {
	try {
		if (typeof window === 'undefined') {
			throw new Error('This function can only be used in the client-side');
		}

		const token = sessionStorage.getItem('token');
		if (!token) {
			throw new Error('No token found in sessionStorage');
		}
		await axios.post(
			`${backendUrl}context/${userId}`,
			{
				name: name,
				customIndicators: customIndicators
			},
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);
	} catch (error: any) {
		if (error.response) {
			console.error(`Error: ${error.response.status} - ${error.response.data}`);
		} else if (error.request) {
			console.error('Error: No response from server.');
		} else {
			console.error('Error: ', error.message);
		}
	}
};

export const getContext = async (contextId: number): Promise<Context_Type> => {
	try {
		if (typeof window === 'undefined') {
			throw new Error('This function can only be used in the client-side');
		}

		const token = sessionStorage.getItem('token');
		if (!token) {
			throw new Error('No token found in sessionStorage');
		}
		const response = await axios.get(`${backendUrl}context/${contextId}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return response.data;
	} catch (error: any) {
		if (error.response) {
			console.error(`Error: ${error.response.status} - ${error.response.data}`);
		} else if (error.request) {
			console.error('Error: No response from server.');
		} else {
			console.error('Error: ', error.message);
		}

		throw new Error("Failed to get user's context");
	}
};

export const getAllContexts = async (userId: number): Promise<Context_Type[]> => {
	try {
		if (typeof window === 'undefined') {
			throw new Error('This function can only be used in the client-side');
		}

		const token = sessionStorage.getItem('token');
		if (!token) {
			throw new Error('No token found in sessionStorage');
		}
		const response = await axios.get(`${backendUrl}context/user/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return response.data;
	} catch (error: any) {
		if (error.response) {
			console.error(`Error: ${error.response.status} - ${error.response.data}`);
		} else if (error.request) {
			console.error('Error: No response from server.');
		} else {
			console.error('Error: ', error.message);
		}

		throw new Error("Failed to get user's contexts");
	}
};

export const getContextIdsWithNames = async (userId: number): Promise<ContextNameWithKey_Type[]> => {
	try {
		if (typeof window === 'undefined') {
			throw new Error('This function can only be used in the client-side');
		}

		const token = sessionStorage.getItem('token');
		if (!token) {
			throw new Error('No token found in sessionStorage');
		}
		const response = await axios.get(`${backendUrl}context/name/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return response.data;
	} catch (error: any) {
		if (error.response) {
			console.error(`Error: ${error.response.status} - ${error.response.data}`);
		} else if (error.request) {
			console.error('Error: No response from server.');
		} else {
			console.error('Error: ', error.message);
		}

		throw new Error('Failed to fetch');
	}
};

export const deleteContext = async (contextId: number) => {
	try {
		if (typeof window === 'undefined') {
			throw new Error('This function can only be used in the client-side');
		}

		const token = sessionStorage.getItem('token');
		if (!token) {
			throw new Error('No token found in sessionStorage');
		}
		await axios.delete(`${backendUrl}context/${contextId}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	} catch (error: any) {
		if (error.response) {
			console.error(`Error: ${error.response.status} - ${error.response.data}`);
		} else if (error.request) {
			console.error('Error: No response from server.');
		} else {
			console.error('Error: ', error.message);
		}
	}
};