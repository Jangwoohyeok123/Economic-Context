import { DateAndValue_Type } from '@/types/fred';
import filterChartValues from './filterChartValues';

export default function prepareValues_ListByPeriod(duration: number, values_List: DateAndValue_Type[], lastDate: Date): DateAndValue_Type[] {
	if (duration === 1 || duration === 3 || duration === 5) return filterChartValues(duration, values_List, lastDate);
	else return values_List;
}
