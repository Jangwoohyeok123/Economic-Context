export default function checkingModalSizeAndModifyClassName(type: string) {
	let className = 'defaultClassName';
	if (type === 'small') {
		className = 'SmallModal';
	} else if (type === 'big') {
		className = 'BigModal';
	}

	return className;
}
