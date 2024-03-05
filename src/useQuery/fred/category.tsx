import { useQuery } from '@tanstack/react-query';

export const fetchCategory = async (categoryId: string) => {
	const res = await fetch(`/api/category?categoryId=${categoryId}`);
	const json = await res.json();

	console.log('fetchCategory 데이터');
	console.log(json);
	console.log('fetchCategory 데이터');
	return json.seriess;
};

export const useQueryCategory = (categoryId: string) => {
	return useQuery({
		queryKey: [`fetchCategory`, categoryId],
		queryFn: () => fetchCategory(categoryId),
		staleTime: Infinity,
		gcTime: 1000 * 60 * 5
		// initialData: initialData
	});
};
// 114, 94, 9, 31
