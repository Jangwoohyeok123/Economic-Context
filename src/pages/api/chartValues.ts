// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

interface Observation {
	date: string;
	realtime_end: string;
	realtime_start: string;
	value: string;
}

type ApiResponse = {
	observations?: Observation[];
	message?: string;
};

// 일반적으로 return 문을 사용하지 않음
// req: 클라이언트 요청 객체
// res: 서버 응답객체

export default async function getChartValues(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
	const baseUrl = process.env.NEXT_PUBLIC_FRED_BASEURL;
	const apiKey = process.env.NEXT_PUBLIC_FREDKEY;

	try {
		const { seriesId } = req.query;

		const response = await fetch(
			`${baseUrl}series/observations?series_id=${seriesId}&api_key=${apiKey}&file_type=json`
		);
		const json = await response.json();

		res.status(200).json(json);
	} catch (error: any) {
		console.error('error' + error.message);
	}
}
