import { DateAndValue_Type, Observation_Type, ObservationResult_Type, Indicator_Type } from '@/types/fred';
import axios from 'axios';
//하나의 지표를 만들기 위한 데이터 요청.
export const getIndicator = async (seriesId: string): Promise<Indicator_Type> => {
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
		throw error;
	}
};
//각 카테고리 fred에서 제공하는 인디케이터 목록을 불러오는 데이터
export const getCategory_List = async (categoryId: number): Promise<Indicator_Type[]> => {
	try {
		const response = await axios.get(`/api/category?categoryId=${categoryId}`);
		console.log('response.data.seriess: ', response.data.seriess);
		return response.data.seriess;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Error fetching data: ', error.message);
		} else {
			console.error('Unexpected Error', error);
		}
		throw error;
		return [];
	}
};
//지표의 Date 데이터
export const getChartData = async (seriesId: string): Promise<ObservationResult_Type> => {
	try {
		const response = await axios.get(`/api/chartValues?seriesId=${seriesId}`);
		const { realtime_start, realtime_end } = response.data;
		const dataArray = response.data.observations.map((element: DateAndValue_Type) => {
			if (element.value === '.') element.value = 0;
			return {
				date: new Date(element.date),
				value: Number(element.value)
			};
		});

		return { realtime_start, realtime_end, dataArray };
	} catch (error) {
		console.error('Error fetching data: ', error);
		throw error;
		// return {
		// 	realtime_start: '',
		// 	realtime_end: '',
		// 	dataArray: [],
		// };
	}
};
