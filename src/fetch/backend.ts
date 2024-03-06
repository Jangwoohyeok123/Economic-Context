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
		return response;
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

// otherwise
// axios 성공
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

// testCode

/* index.tsx 에서 아래의 코드를 이용 

useEffect(() => {
	const authCode: string = router.query.code as string;
	if (authCode) getJwtAndUserData(authCode);
	axios
		.delete('http://localhost:4000/user/favorite/1')
		.then(response => console.log(response));
}, [router.query]);

*/
