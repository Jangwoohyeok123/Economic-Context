import { useMutation, useQueryClient } from '@tanstack/react-query';
import const_queryKey from '@/const/queryKey';
import { addFavorite, deleteFavorite } from '@/api/favorite';

/** 
- categoryId 가 있다면 favorite 일부가 초기화
- categoryId 가 없다면 favorite 전부가 초기화
 */
export default function useFavoriteMutation(categoryId?: number) {
	const queryClient = useQueryClient();

	const addFavoriteMutationAll = useMutation({
		mutationFn: ({ userId, seriesId }: { userId: number; seriesId: string }) => addFavorite(userId, seriesId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: [const_queryKey.favorite]
			});

			// alert('add 성공');
		},
		onError(error) {
			console.error(error);
		}
	});

	const deleteFavoriteMutationAll = useMutation({
		mutationFn: ({ userId, seriesId }: { userId: number; seriesId: string }) => deleteFavorite(userId, seriesId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: [const_queryKey.favorite]
			});
			// alert('delete 성공');
		},
		onError(error) {
			console.error(error);
		}
	});

	const addFavoriteMutation = useMutation({
		mutationFn: ({ userId, seriesId }: { userId: number; seriesId: string }) => addFavorite(userId, seriesId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: [const_queryKey.favorite, categoryId]
			});

			// alert('add 성공');
		},
		onError(error) {
			console.error(error);
		}
	});

	const deleteFavoriteMutation = useMutation({
		mutationFn: ({ userId, seriesId }: { userId: number; seriesId: string }) => deleteFavorite(userId, seriesId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: [const_queryKey.favorite, categoryId]
			});
			// alert('delete 성공');
		},
		onError(error) {
			console.error(error);
		}
	});

	return categoryId ? { addFavoriteMutation, deleteFavoriteMutation } : { addFavoriteMutationAll, deleteFavoriteMutationAll };
}
