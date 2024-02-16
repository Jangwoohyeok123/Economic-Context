// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	name: string;
};

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

const baseUrl = 'https://api.stlouisfed.org/fred/';

export default async function observations(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
	// req params 를 통해 id 전달
	try {
		const { seriesId } = req.query;
		// https ~ fred 는 baseurl 처리하기 => 변수로 뺼 수 있는 것은 빼기

		const response = await fetch(
			`${baseUrl}series/observations?series_id=${seriesId}&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
		);
		const json = await response.json();

		res.status(200).json({ observations: json.observations });
	} catch (err) {
		res.status(500).json({ message: 'fetching 실패' });
	}
}
