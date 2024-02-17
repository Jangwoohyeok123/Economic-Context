/* 
  values 배열 참조와 idx 를 전달받는다. 
*/

interface DataProps {
	date: string;
	value: string;
}

// . 이 발견된 순간 실행될 함수다. 가장 가까운 value 를 찾아야한다.
// 이 함수의 목적은 setValues 에서 인자에서 validation 이 된 즉시실행되는 함수다.
export default function searchDotAndSetValue(Data: DataProps[]) {
	// Data 를 전달받아서 처리하자
	const dataLength = Data.length;
	const mid = Math.floor(dataLength / 2);
	for (let targetingDotIndex = 0; targetingDotIndex < dataLength; targetingDotIndex++) {
		if (Data[targetingDotIndex].value === '.') {
			// 좌 또는 우 탐색
			// mid 보다 작다면 좌측탐색
			// mid 보다 크다면 우측탐색
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
