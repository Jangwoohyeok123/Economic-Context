import axios from 'axios';

// get
export async function getUserData(userId: string) {
	const backendUrl = 'http://localhost:4000';
	try {
		const response = await axios.get(`${backendUrl}/user/find/${userId}`);
		return response;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to fetch user Data');
	}
}

export async function getUsersFavorite(userId: string) {
	const backendUrl = 'http://localhost:4000';
	try {
		const response = await axios.get(`${backendUrl}/user/favorite/${userId}`);
		return response;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to fetch user Data');
	}
}

export async function getUsersFavoriteCategory(userId: string, categoryId: string) {
	const backendUrl = 'http://localhost:4000';

	try {
		const response = await axios.get(`${backendUrl}/user/favorite/${userId}/${categoryId}`);
		return response;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to fetch user Data');
	}
}

// otherwise
export async function addFavoriteIndicator(userId: string, seriesId: string) {
	const backendUrl = 'http://localhost:4000';
	const httpBody = {
		indicatorId: seriesId
	};
	try {
		const response = await axios.post(`${backendUrl}/user/favorite/${userId}`, httpBody);

		return response;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to fetch user Data');
	}
}

export async function deleteFavoriteIndicator(userId: string, seriesId: string) {
	const backendUrl = 'http://localhost:4000';
	const httpBody = {
		indicatorId: seriesId
	};
	try {
		const response = await axios.post(`${backendUrl}/user/favorite/${userId}`, httpBody);

		return response;
	} catch (err) {
		console.error(err);
		throw new Error('Failed to fetch user Data');
	}
}
