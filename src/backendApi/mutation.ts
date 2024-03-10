import axios from 'axios';

export async function addFavoriteIndicator(userId: string, seriesId: string) {
	const backendUrl = 'http://localhost:4000';
	let isAddSuccess = false;
	const httpBody = {
		IndicatorId: seriesId
	};

	try {
		const response = await axios.post(`${backendUrl}/user/favorite/${userId}`, httpBody);
		isAddSuccess = true;

		return { response, isAddSuccess };
	} catch (error) {
		console.error(error);
		throw new Error('Failed to fetch user Data');
	}
}

// axios 실패
export async function deleteFavoriteIndicator(userId: string, seriesId: string) {
	const backendUrl = 'http://localhost:4000';
	let isDeleteSuccess = false;
	const httpBody = {
		IndicatorId: seriesId
	};
	try {
		const response = await axios.post(`${backendUrl}/user/favorite/${userId}`, { Indicatorid: 225 });

		isDeleteSuccess = true;

		return { response, isDeleteSuccess };
	} catch (err) {
		console.error(err);
		throw new Error('Failed to fetch user Data');
	}
}
