// 1. context 생성
import { AppProps } from 'next/app';
import React, { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

type checkedCard = {
	category: string;
	checkedIndex: number[];
};

type checkedCardSet = checkedCard[];

type CheckedCardSetProviderProps = {
	children: ReactNode;
};

export const CheckedCardSetContext = createContext<{
	checkedCardSet: checkedCardSet;
	setCheckedCardSet: Dispatch<SetStateAction<checkedCardSet>>;
}>({
	checkedCardSet: [],
	setCheckedCardSet: () => {}
});

export function CheckedCardSetProvider({ children }: CheckedCardSetProviderProps) {
	const [CheckedCardSet, setCheckedCardSet] = useState<checkedCardSet>([
		{ category: 'interest', checkedIndex: [] },
		{ category: 'Exchange', checkedIndex: [] },
		{ category: 'consume', checkedIndex: [] },
		{ category: 'production', checkedIndex: [] }
	]);

	return (
		<CheckedCardSetContext.Provider value={{ checkedCardSet: CheckedCardSet, setCheckedCardSet }}>
			{children}
		</CheckedCardSetContext.Provider>
	);
}
