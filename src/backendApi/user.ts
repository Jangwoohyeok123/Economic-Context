import axios from 'axios';

export async function getJwtAndUserGoogleData(authCode: string) {
	const backendUrl = 'http://localhost:4000/';
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

export const getFavorites = async (userId: string) => {
	const backendUrl = 'http://localhost:4000/';
	try {
		const response = await axios.get(`${backendUrl}favorite/${userId}`);
		const favorites = response.data;
		return favorites;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get user's favorites");
	}
};

export const getFavorite = async (userId: string, categoryId: number) => {
	const backendUrl = 'http://localhost:4000/';
	try {
		const response = await axios.get(`${backendUrl}favorite/${userId}/${categoryId}`);
		const favorite = response.data;
		return favorite;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get user's favorite");
	}
};

// body => { indicatorId: seriesId }
export const addFavorite = async (userId: string) => {
	const backendUrl = 'http://localhost:4000/';
	try {
		await axios.get(`${backendUrl}favorite/${userId}`);
	} catch (error) {
		console.log(error);
		throw new Error('Failed to add favorite Indicator');
	}
};

// body => { indicatorId: seriesId }
export const deleteFavorite = async (userId: string) => {
	const backendUrl = 'http://localhost:4000/';
	try {
		const resoponse = await axios.get(`${backendUrl}favorite/${userId}`);
	} catch (error) {
		console.log(error);
		throw new Error('Failed to delete favorite Indicator');
	}
};
