import { Observation_Type } from '@/types/fred';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { fredInstance } from '../../api/axiosInstance';

interface ApiResponse {
	observations?: Observation_Type[];
	message?: string;
}

export default async function getChartValues(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
	const apiKey = process.env.NEXT_PUBLIC_FREDKEY;

	try {
		const { seriesId } = req.query;

		const response = await fredInstance.get('/series/observations', {
			params: {
				series_id: seriesId,
				api_key: apiKey,
				file_type: 'json'
			}
		});

		res.status(200).json(response.data);
	} catch (error: any) {
		console.error('error' + error.message);
	}
}
