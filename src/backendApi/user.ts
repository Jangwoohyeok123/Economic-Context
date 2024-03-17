import { Indicator } from '@/types/userType';
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
		const response = await axios.get(`${backendUrl}user/favorite/${userId}`);
		const favorites = response.data;
		return favorites;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get user's favorites");
	}
};

export const getFavorite = async (userId: number, categoryId: number) => {
	try {
		const response = await axios.get(`${backendUrl}user/favorite/${userId}/${categoryId}`);
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
		await axios.post(`${backendUrl}user/favorite/${userId}`, {
			indicatorId: seriesId
		});
	} catch (error) {
		console.log(error);
		throw new Error('Failed to add favorite Indicator');
	}
};

// body => { indicatorId: seriesId }
export const deleteFavorite = async (userId: number, seriesId: string) => {
	try {
		await axios.delete(`${backendUrl}user/favorite/${userId}`, {
			data: {
				indicatorId: seriesId
			}
		});
	} catch (error) {
		console.log(error);
		throw new Error('Failed to delete favorite Indicator');
	}
};

export const addContext = async (userId: number, name: string, customIndicators: Indicator[]) => {
	try {
		await axios.post(`${backendUrl}context/${userId}`, {
			name: name,
			customIndicators: customIndicators
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

export const getContext = async (userId: number) => {
	try {
		const response = await axios.get(`${backendUrl}context/${userId}`);
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

export const getContextNames = async (userId: number) => {
	try {
		const response = await axios.get(`${backendUrl}context/name/${userId}`);
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
		await axios.delete(`${backendUrl}context/${contextId}`);
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
