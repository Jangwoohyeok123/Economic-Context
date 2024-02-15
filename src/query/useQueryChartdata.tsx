import { useQuery } from '@tanstack/react-query';

const baseUrl = 'https://api.stlouisfed.org/fred/';

const fetchChartDataById = async (seriesId: string) => {
	const res = await fetch(
		`${baseUrl}series/observations?series_id=${seriesId}&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
	);
	const json = await res.json();

	return json; // 이후에 수정해라
};

export const useQueryfetchChartDataById = (seriesId: string) => {
	return useQuery({
		queryKey: [`fetchChart`, seriesId],
		queryFn: () => fetchChartDataById(seriesId),
		staleTime: Infinity,
		gcTime: 1000 * 60 * 5
	});
};
// stale 상태면 재렌더시 refetching 이 일어남
// stale 상태가 아니어도 gcTime 이 지나면 재렌더시 refetching 이 일어남

// [`fetchChart${seriesId}`], fetchChartDataById}

// ui 컴포넌트와 그와 관련된 scss 파일은 대문자로 시작하며 Ccaeml 케이스를 사용한다.
// 그 외 utils 및 query 같은 경우는 소문자로 시작하는 Ccamel 케이스를 사용한다.
