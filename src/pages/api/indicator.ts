import { ObservationType } from '@/types/fredType';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type ApiResponse = {
	observations?: ObservationType[];
	message?: string;
};

export default async function getIndicator(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
	const baseUrl = process.env.NEXT_PUBLIC_FRED_BASEURL;
	const apiKey = process.env.NEXT_PUBLIC_FREDKEY;

	try {
		const { seriesId } = req.query;

		const json = await axios.get(`${baseUrl}series?series_id=${seriesId}&api_key=${apiKey}&file_type=json`);

		res.status(200).json(json.data);
	} catch (err: any) {
		res.status(500).json(err.message);
	}
}
