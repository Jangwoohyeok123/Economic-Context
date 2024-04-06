import { useRef } from 'react';

function useConst<T>(initialValue: T): T {
	const ref = useRef<{ value: T }>();

	if (ref.current === undefined) {
		ref.current = { value: initialValue };
	}

	return ref.current.value;
}

export default useConst;
