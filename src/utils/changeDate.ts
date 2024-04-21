export const changeDateForm = (date: string) => {
	//Date객체로 변환하여 내장함수 사용으로 날짜 형식 포맷하기.
	const newDate = new Date(date);

	const formattedDate = `${newDate.getDate()} ${newDate.toLocaleString('en-us', { month: 'short' })} ${newDate.getFullYear()}`;

	return formattedDate;
};

export const changeDateToRelativeTime = (date: string) => {
	const nowDate = new Date();
	console.log('nowDate: ', nowDate);
	const pastDate = new Date(date);
	console.log('pastDate: ', pastDate);

	const differenceInTime = nowDate.getTime() - pastDate.getTime(); // 두 날짜의 차이 계산 (밀리초 단위)
	const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24)); // 밀리초를 일수로 변환

	if (differenceInDays === 0) {
		const differenceInHours = Math.floor(differenceInTime / (1000 * 60 * 60)); // 밀리초를 시간으로 변환
		const differenceInMinutes = Math.floor(differenceInTime / (1000 * 60)); // 밀리초를 분으로 변환

		// 반환할 문자열 결정
		return formatRelativeTime(differenceInHours, differenceInMinutes);
	} else if (differenceInDays === 1) {
		return 'Yesterday';
	} else {
		return `${differenceInDays} days ago`;
	}
};

const formatRelativeTime = (hours: number, minutes: number) => {
	if (hours === 0 && minutes === 0) {
		return 'now';
	}

	let hoursText = hours === 1 ? '1 hour' : `${hours} hours`;
	let minutesText = minutes === 1 ? '1 minute' : `${minutes} minutes`;

	if (hours === 0) {
		return `${minutesText} ago`;
	}
	if (minutes === 0) {
		return `${hoursText} ago`;
	}
	return `${hoursText} ${minutesText} ago`;
};
