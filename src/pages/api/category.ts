import type { NextApiRequest, NextApiResponse } from 'next';
import { fredInstance } from '../../api/axiosInstance';

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
	const apiKey = process.env.NEXT_PUBLIC_FREDKEY;

	try {
		const { categoryId, limit } = req.query;

		const response = await fredInstance.get('/category/series', {
			params: {
				category_id: categoryId,
				api_key: apiKey,
				limit: limit,
				file_type: 'json'
			}
		});

		res.status(200).json(response.data);
	} catch (err) {
		res.status(500).json({ message: 'fetching 실패' });
	}
}
