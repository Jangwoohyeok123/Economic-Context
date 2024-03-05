import { useQuery } from '@tanstack/react-query';

const fetchChartValues = async (seriesId: string) => {
	const res = await fetch(`/api/chartValues?seriesId=${seriesId}`);
	const json = await res.json();

	return json;
};

export const useQueryChartValues = (categoryId: string) => {
	return useQuery({
		queryKey: [`fetchChartValues`, categoryId],
		queryFn: () => fetchChartValues(categoryId)
	});
};
