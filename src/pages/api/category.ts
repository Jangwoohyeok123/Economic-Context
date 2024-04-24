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

export default async function getCategory(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
	const baseUrl = process.env.NEXT_PUBLIC_FRED_BASEURL;
	const apiKey = process.env.NEXT_PUBLIC_FREDKEY;

	try {
		const { categoryId, limit } = req.query;

		const response = await fetch(`${baseUrl}category/series?category_id=${categoryId}&api_key=${apiKey}&file_type=json&limit=${limit}`);
		const json = await response.json();

		res.status(200).json(json);
	} catch (err) {
		res.status(500).json({ message: 'fetching 실패' });
	}
}
