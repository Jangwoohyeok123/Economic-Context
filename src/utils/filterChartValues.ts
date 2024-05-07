import { DateAndValue_Type } from '@/types/fred';

export default function filterChartValues(duration: number, values_List: DateAndValue_Type[], lastDate: Date): DateAndValue_Type[] {
	let periodValues_List: DateAndValue_Type[] = [];
	const lastDateObject = new Date(lastDate);
	const [lastYear, lastMonth] = [lastDateObject.getFullYear(), lastDateObject.getMonth()];

	for (let i = values_List.length - 1; i >= 0; i--) {
		const curDate = new Date(values_List[i].date);
		const [curYear, curMonth] = [curDate.getFullYear(), curDate.getMonth()];
		if (curYear === lastYear - duration && curMonth < lastMonth) break;
		else periodValues_List.push(values_List[i]);
	}

	return periodValues_List;
}
