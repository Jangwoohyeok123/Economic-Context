import { getAllFavorites_List, getFavoriteCateogry_List } from '@/api/favorite';
import const_queryKey from '@/const/queryKey';
import { Store_Type } from '@/types/redux';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

/**
 *
 * @param categoryId 있다면 일부 favorite 없다면 모든 favorite
 * @returns favorite 배열
 */
export default function useFavoriteQuery(categoryId?: number) {
	const user = useSelector((state: Store_Type) => state.user);

	const { data: allFavorites_List, isSuccess: isAllFavoritesExist } = useQuery({
		queryKey: [const_queryKey.favorite],
		queryFn: () => getAllFavorites_List(user.id)
	});

	const { data: selectedFavorites, isSuccess: isSelectedFavoritesExist } = useQuery({
		queryKey: [const_queryKey.favorite, categoryId],
		queryFn: () => getFavoriteCateogry_List(user.id, categoryId ?? 0),
		enabled: !!categoryId
	});

	return !!categoryId ? { selectedFavorites, isSelectedFavoritesExist } : { allFavorites_List, isAllFavoritesExist };
}

/* 
  !! 값의 유무를 boolean 으로 변환시켜주는 문법
  ?? 값이 없을 때 기본값을 지정하는 문법
*/
