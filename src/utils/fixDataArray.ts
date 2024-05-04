import { DateAndValue_Type } from '@/types/fred';

interface fixDataArray {
	dataArray: DateAndValue_Type[];
	type: 'client' | 'server';
}

export function fixDataArray(dataArray: DateAndValue_Type[], type = 'client') {
	let prevValue: string | number | null = null;

	dataArray.forEach((curElement, index) => {
		if (curElement.value !== '.' && curElement.value !== 0 && curElement.value !== '0.00') {
			curElement.value = Number(curElement.value);
			prevValue = curElement.value;
		} else if ((curElement.value === '.' || curElement.value === 0) && prevValue !== null) {
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

function setDateArray(dataArray: DateAndValue_Type[]) {
	return dataArray.map(item => ({
		...item,
		date: new Date(item.date)
	}));
}
