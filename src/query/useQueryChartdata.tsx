import { useQuery } from "@tanstack/react-query";

const fetchChartDataById = async (seriesId: string) => {
  console.log("hello");
  const res = await fetch(
    `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
  );
  const json = await res.json();
  console.log(json);

  return json; // 이후에 수정해라
};

export const useQueryfetchChartDataById = (seriesId: string) => {
  return useQuery({
    queryKey: [`fetchChart`, seriesId],
    queryFn: () => fetchChartDataById(seriesId),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 5,
  });
};
// stale 상태면 재렌더시 refetching 이 일어남
// stale 상태가 아니어도 gcTime 이 지나면 재렌더시 refetching 이 일어남

// [`fetchChart${seriesId}`], fetchChartDataById}
