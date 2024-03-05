import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getIndicator(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
	const baseUrl = process.env.NEXT_PUBLIC_FRED_BASEURL;
	const apiKey = process.env.NEXT_PUBLIC_FREDKEY;

	try {
		const { seriesId } = req.query;

		const response = await fetch(`${baseUrl}series?series_id=${seriesId}&api_key=${apiKey}&file_type=json`);
		const json = await response.json();

		res.status(200).json({ indicator: json });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'fetching 실패' });
	}
}
