import { useContext } from 'react';
import { SelectedTabContext } from '@/store/selectedTab-context';

export const useSelectedTabContext = () => {
	const { setSelectedTab } = useContext(SelectedTabContext);

	// 데이터 업데이트
	const updateTab = (tab: string) => {
		const newTab = tab;

		setSelectedTab(newTab);
	};

	return { updateTab };
};
