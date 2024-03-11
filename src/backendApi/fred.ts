import axios from 'axios';

interface DataItem {
	date: string;
	value: number | string;
}

export const getIndicator = async (seriesId: string) => {
	try {
		const response = await axios.get(`/api/indicator?seriesId=${seriesId}`);
		const data = response.data.seriess[0];

		return data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Error fetching data: ', error.message);
		} else {
			console.error('Unexpected Error', error);
		}
	}
};

export const getIndicators = async (categoryId: number) => {
	try {
		const response = await axios.get(`/api/category?categoryId=${categoryId}`);
		return response.data.seriess;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Error fetching data: ', error.message);
		} else {
			console.error('Unexpected Error', error);
		}

		return [];
	}
};

export const getChartData = async (seriesId: string) => {
	try {
		const response = await axios.get(`/api/chartValues?seriesId=${seriesId}`);
		const dataArray = response.data.observations.map((element: DataItem) => {
			if (element.value === '.') element.value = 0;
			return {
				date: new Date(element.date),
				value: Number(element.value)
			};
		});

		return dataArray;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Error fetching data: ', error.message);
		} else {
			console.error('Unexpected Error', error);
		}

		return [];
	}
};
