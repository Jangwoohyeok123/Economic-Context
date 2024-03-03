/* 
  values 배열 참조와 idx 를 전달받는다. 
*/

interface DataProps {
	date: string;
	value: string;
}

// fred chartData 에 '.' 으로 인해 차트가 생성안될 때 사용하는 함수
export default function searchDotAndSetValue(Data: DataProps[]) {
	// Data 를 전달받아서 처리하자
	const dataLength = Data.length;
	const mid = Math.floor(dataLength / 2);
	for (let targetingDotIndex = 0; targetingDotIndex < dataLength; targetingDotIndex++) {
		if (Data[targetingDotIndex].value === '.') {
			if (targetingDotIndex < mid) {
				for (let searchIndex = targetingDotIndex; searchIndex >= 0; searchIndex--) {
					if (Data[searchIndex].value !== '.') {
						Data[targetingDotIndex].value = Data[searchIndex].value;
						break;
					}
				}
			} else {
				for (let searchIndex = targetingDotIndex; searchIndex < dataLength; searchIndex++) {
					if (Data[searchIndex].value !== '.') {
						Data[targetingDotIndex].value = Data[searchIndex].value;
						break;
					}
				}
			}
		}
	}

	// 배열을 반환할 때 Number 로 넘겨주는 걸 여기서 처리한다.
	return Data;
}
