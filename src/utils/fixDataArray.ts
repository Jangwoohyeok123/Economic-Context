import { DateAndValue_Type } from '@/types/fred';

export function fixDataArray(dataArray: DateAndValue_Type[]) {
	let prevValue: string | number | null = null;

	dataArray.forEach((curElement, index) => {
		if (curElement.value !== '.') {
			curElement.value = Number(curElement.value);
			prevValue = curElement.value;
		} else if (curElement.value === '.' && prevValue !== null) {
			dataArray[index].value = Number(prevValue);
		}
	});

	for (let i = dataArray.length - 1; i >= 0; i--) {
		if (dataArray[i].value !== null) {
			dataArray[i].value = Number(dataArray[i].value);
			prevValue = dataArray[i].value;
		} else if (dataArray[i].value === null && prevValue !== null) {
			dataArray[i].value = Number(prevValue);
		}
	}

	return dataArray;
}
