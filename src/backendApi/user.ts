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

export const getFavorites = async (userId: number) => {
	const backendUrl = 'http://localhost:4000/';
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
	const backendUrl = 'http://localhost:4000/';
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
	const backendUrl = 'http://localhost:4000/';
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
	const backendUrl = 'http://localhost:4000/';
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
