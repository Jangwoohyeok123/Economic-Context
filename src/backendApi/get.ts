import axios from 'axios';

// auth
// axios 성공
export async function getJwtAndUserGoogleData(authCode: string) {
	try {
		const response = await axios.post('http://localhost:4000/auth/google', { code: authCode });
		const jwt = response.data[0];
		const userData = response.data[1];

		return { jwt, userData };
	} catch (error) {
		console.error(error);
		throw new Error('Failed to SNS login');
	}
}

// get
// axios 성공
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

// axios 성공
export async function getUsersFavorite(userId: string) {
	const backendUrl = 'http://localhost:4000';
	try {
		const response = await axios.get(`${backendUrl}/user/favorite/${userId}`);
		return response.data;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to fetch user Data');
	}
}

// axios 실패
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
