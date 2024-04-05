import { backendUrl } from '@/pages/_app';
import { FavoriteIndicator_Type } from '@/types/favorite';
import axios from 'axios';
//메인에서 save한 지표 전체 불러오기.
export const getAllFavorites_List = async (userId: number): Promise<FavoriteIndicator_Type[]> => {
	try {
		if (typeof window === 'undefined') {
			throw new Error('This function can only be used in the client-side');
		}

		const token = sessionStorage.getItem('token');
		if (!token) {
			throw new Error('No token found in sessionStorage');
		}

		const response = await axios.get(`${backendUrl}/user/favorite/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const favorite_List = response.data;
		return favorite_List;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get user's favorites");
	}
};
//각 categoryId에서 save한 지표 리스트들들
//categoryId값은 categoryName(['Interest', 'Exchange', 'Consume', 'Production'])이 갖는 id.
export const getFavoriteCateogry_List = async (
	userId: number,
	categoryId: number
): Promise<FavoriteIndicator_Type[]> => {
	try {
		if (typeof window === 'undefined') {
			throw new Error('This function can only be used in the client-side');
		}

		const token = sessionStorage.getItem('token');
		if (!token) {
			throw new Error('No token found in sessionStorage');
		}
		const response = await axios.get(`${backendUrl}/user/favorite/${userId}/${categoryId}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const favoriteCategory_List = response.data;
		return favoriteCategory_List;
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
			`${backendUrl}/user/favorite/${userId}`,
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
		await axios.delete(`${backendUrl}/user/favorite/${userId}`, {
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
