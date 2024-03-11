export const discontinueDelete = (title: string) => {
	if (title.slice(-14) === '(DISCONTINUED)') {
		const length = title.length;
		const discontinuedLength = 14;
		const slicedTitle = title.slice(0, length - discontinuedLength);
		return slicedTitle;
	}

	return title;
};
