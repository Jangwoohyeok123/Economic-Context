/* 
	[ subString ]
	string 을 다룰 때는 subString 을 이용하는게 좋다.
	인자의 순서가 바뀌어도 작은값 ~ 큰 값 으로 동작하기 때문이다.

	[ slice ]
	slice 는 '-Index' 를 지원하기 때문에 suffix 를 다룰때 유리하다.
	slice(0, -5) 는 첫 요소부터 마지막 5번째까지 
	slice(-5) 는 -5 까지 요소까지 추출하기

	[ trim ]
	앞 뒤로 쓸데없는 문자열을 삭제한다.
*/

const MAX_LENGTH = 30;
const DISCONTINUED = '(DISCONTINUED)';

export const shortenTitle = (title: string, maxLength: number) => {
	return title.length > maxLength ? `${title.split(' ').slice(0, 10).join(' ')}` : title;
};

export const removeSuffix = (title: string, suffix: string) => {
	return title.endsWith(suffix) ? title.slice(0, -suffix.length) : title;
};

export const removeComma = (title: string) => {
	return title.endsWith(',') ? `${title.slice(0, -1).trim()}...` : title;
};
export const addEllipsis = (text: string, maxLength: number) => {
	return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};
export const changeDate = (date: string) => {
	//Date객체로 변환하여 내장함수 사용으로 날짜 형식 포맷하기.
	const newDate = new Date(date);

	const formattedDate = `${newDate.getDate()} ${newDate.toLocaleString('en-us', { month: 'short' })} ${newDate.getFullYear()}`;

	return formattedDate;
};

export const cleanString = (title: string, maxLength?: number, string?: string) => {
	let cleanedString = title;
	maxLength = MAX_LENGTH;

	// 다른 사람이 이 파일을 확인할 때 봐야할 부분
	cleanedString = shortenTitle(cleanedString, maxLength);
	cleanedString = removeSuffix(cleanedString, DISCONTINUED);
	cleanedString = removeComma(cleanedString);

	return cleanedString;
};
