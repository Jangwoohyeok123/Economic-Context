import { Observation } from '@/types/fredType';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

interface ApiResponse {
	observations?: Observation[];
	message?: string;
}

export default async function getChartValues(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
	const baseUrl = process.env.NEXT_PUBLIC_FRED_BASEURL;
	const apiKey = process.env.NEXT_PUBLIC_FREDKEY;

	try {
		const { seriesId } = req.query;

		const json = await axios.get(
			`${baseUrl}series/observations?series_id=${seriesId}&api_key=${apiKey}&file_type=json`
		);

		res.status(200).json(json.data);
	} catch (error: any) {
		console.error('error' + error.message);
	}
}
