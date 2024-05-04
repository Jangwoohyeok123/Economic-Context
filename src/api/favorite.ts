import { backendUrl } from '@/pages/_app';
import { backendInstance } from '@/pages/axiosInstance';
import { FavoriteIndicator_Type } from '@/types/favorite';
import axios from 'axios';

export const getAllFavorites_List = async (userId: number): Promise<FavoriteIndicator_Type[]> => {
	try {
		const response = await backendInstance.get(`${backendUrl}/user/favorite/${userId}`);
		const favorite_List = response.data;
		return favorite_List;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get user's favorites");
	}
};

export const getFavoriteCateogry_List = async (userId: number, categoryId: number): Promise<FavoriteIndicator_Type[]> => {
	try {
		const response = await backendInstance.get(`${backendUrl}/user/favorite/${userId}/${categoryId}`);
		const favoriteCategory_List = response.data;
		return favoriteCategory_List;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get user's favorite");
	}
};

export const addFavorite = async (userId: number, seriesId: string) => {
	try {
		await backendInstance.post(`${backendUrl}/user/favorite/${userId}`, {
			indicatorId: seriesId
		});
	} catch (error) {
		console.log(error);
		throw new Error('Failed to add favorite Indicator');
	}
};

export const deleteFavorite = async (userId: number, seriesId: string) => {
	try {
		await backendInstance.delete(`${backendUrl}/user/favorite/${userId}`, {
			data: {
				indicatorId: seriesId
			}
		});
	} catch (error) {
		console.error(error);
		throw new Error('Failed to delete favorite Indicator');
	}
};
