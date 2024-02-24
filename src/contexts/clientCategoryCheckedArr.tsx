import React, { createContext, useState } from 'react';

interface ClientCategoryCheckedArrContextProps {
	ClientCategoryCheckedArr: number[];
	setClientCategoryCheckedArr: Dispatch<SetStateAction<number[]>>;
}

export const ClientCategoryCheckedArrContext = createContext<ClientCategoryCheckedArrContextProps>({
	ClientCategoryCheckedArr: [],
	setClientCategoryCheckedArr: () => {}
});

export default function ClientCategoryCheckedArrProvider({ children }: { children: React.ReactNode }) {
	// App 이 다루고있는 category 의 개수가 배열의 원소개수
	const [ClientCategoryCheckedArr, setClientCategoryCheckedArr] = useState([0, 0, 0, 0]);

	return (
		<ClientCategoryCheckedArrContext.Provider value={{ ClientCategoryCheckedArr, setClientCategoryCheckedArr }}>
			{children}
		</ClientCategoryCheckedArrContext.Provider>
	);
}
