import { Indicator, Journal } from '@/types/userType';
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_LOCAL;

export async function getJwtAndUserGoogleData(authCode: string) {
	try {
		const response = await axios.post(`${backendUrl}auth/google`, { code: authCode });
		const jwt = response.data[0];
		const userData = response.data[1];

		return { jwt, userData };
	} catch (error) {
		console.error(error);
		throw new Error('Failed to SNS login');
	}
}

export const getFavorites = async (userId: number) => {
	try {
		if (typeof window === 'undefined') {
			throw new Error('This function can only be used in the client-side');
		}

		const token = sessionStorage.getItem('token');
		if (!token) {
			throw new Error('No token found in sessionStorage');
		}

		const response = await axios.get(`${backendUrl}user/favorite/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const favorites = response.data;
		return favorites;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get user's favorites");
	}
};

export const getFavorite = async (userId: number, categoryId: number) => {
	try {
		if (typeof window === 'undefined') {
			throw new Error('This function can only be used in the client-side');
		}

		const token = sessionStorage.getItem('token');
		if (!token) {
			throw new Error('No token found in sessionStorage');
		}
		const response = await axios.get(`${backendUrl}user/favorite/${userId}/${categoryId}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const favorite = response.data;
		return favorite;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get user's favorite");
	}
};

// body => { indicatorId: seriesId }
export const addFavorite = async (userId: number, seriesId: string) => {
	try {
		if (typeof window === 'undefined') {
			throw new Error('This function can only be used in the client-side');
		}

		const token = sessionStorage.getItem('token');
		if (!token) {
			throw new Error('No token found in sessionStorage');
		}
		await axios.post(
			`${backendUrl}user/favorite/${userId}`,
			{
				indicatorId: seriesId
			},
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);
	} catch (error) {
		console.log(error);
		throw new Error('Failed to add favorite Indicator');
	}
};

// body => { indicatorId: seriesId }
export const deleteFavorite = async (userId: number, seriesId: string) => {
	try {
		if (typeof window === 'undefined') {
			throw new Error('This function can only be used in the client-side');
		}

		const token = sessionStorage.getItem('token');
		if (!token) {
			throw new Error('No token found in sessionStorage');
		}
		await axios.delete(`${backendUrl}user/favorite/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`
			},
			data: {
				indicatorId: seriesId
			}
		});
	} catch (error) {
		console.error(error);
		throw new Error('Failed to delete favorite Indicator');
	}
};

export const addContext = async (userId: number, name: string, customIndicators: Indicator[]) => {
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

export const getContext = async (contextId: number) => {
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
	}
};

export const getAllContexts = async (userId: number) => {
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
	}
};

export const getContextNamesWithKey = async (userId: number) => {
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

export const addJournal = async (userId: number, contextId: number, journalDataParams: Journal) => {
	try {
		if (typeof window === 'undefined') {
			throw new Error('This function can only be used in the client-side');
		}

		const token = sessionStorage.getItem('token');
		if (!token) {
			throw new Error('No token found in sessionStorage');
		}
		await axios.post(`${backendUrl}journal/${userId}/${contextId}`, journalDataParams, {
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

export const getJournal = async (contextId: number) => {
	try {
		if (typeof window === 'undefined') {
			throw new Error('This function can only be used in the client-side');
		}

		const token = sessionStorage.getItem('token');
		if (!token) {
			throw new Error('No token found in sessionStorage');
		}
		const response = await axios.get(`${backendUrl}journal/${contextId}`, {
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
	}
};
