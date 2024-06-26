import { useSelectedTabContext } from '@/hooks/useSelectedContext';
import { ReactNode, createContext, useContext, useState } from 'react';

interface SelectedTabContextType {
	selectedTab: string;
	setSelectedTab: (tab: string) => void;
	updateTab?: (tab: string) => void;
}

const defaultContextValue: SelectedTabContextType = {
	selectedTab: 'Indicators',
	setSelectedTab: () => {}
};

const SelectedTabContext = createContext(defaultContextValue);

const SelectedTabProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [selectedTab, setSelectedTab] = useState<string>(defaultContextValue.selectedTab);
	const { updateTab } = useContext(SelectedTabContext);
	return <SelectedTabContext.Provider value={{ selectedTab, setSelectedTab, updateTab }}>{children}</SelectedTabContext.Provider>;
};

export { SelectedTabContext, SelectedTabProvider };
