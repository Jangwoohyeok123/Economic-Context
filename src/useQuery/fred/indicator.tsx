import { useQuery } from '@tanstack/react-query';

const fetchIndicator = async (seriesId: string) => {
	const res = await fetch(`/api/indicator?seriesId=${seriesId}`);
	const json = await res.json();

	return json;
};

export const useQueryIndicator = (seriesId: string) => {
	return useQuery({
		queryKey: [`fetchCategory`, seriesId],
		queryFn: () => fetchIndicator(seriesId)
	});
};
