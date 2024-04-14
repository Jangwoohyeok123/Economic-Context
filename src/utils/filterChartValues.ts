import { DateAndValue_Type } from '@/types/fred';

export default function filterChartValues(duration: number, values_List: DateAndValue_Type[], lastDate: Date): DateAndValue_Type[] {
	let periodValues_List: DateAndValue_Type[] = [];
	const [lastYear, lastMonth, lastDay] = [lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDay()];

	for (let i = values_List.length - 1; i >= 0; i--) {
		const curDate = values_List[i].date;
		const [curYear, curMonth] = [curDate.getFullYear(), curDate.getMonth()];
		if (curYear === lastYear - duration && curMonth < lastMonth) break;
		else periodValues_List.push(values_List[i]);
	}

	return periodValues_List;
}
