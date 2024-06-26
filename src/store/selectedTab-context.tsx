import { ReactNode, createContext, useContext, useState } from 'react';

interface ContextType {
	selectedTab: string;
	setSelectedTab: (tab: string) => void;
}

const defaultContextValue: ContextType = {
	selectedTab: 'Indicators',
	setSelectedTab: () => {}
};

export const SelectedTabContext = createContext<ContextType>(defaultContextValue);

// Provider 컴포넌트
export const SelectedTabProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [selectedTab, setSelectedTab] = useState<string>(defaultContextValue.selectedTab);

	console.log('context', selectedTab);
	return <SelectedTabContext.Provider value={{ selectedTab, setSelectedTab }}>{children}</SelectedTabContext.Provider>;
};

export const useSelectedTab = () => {
	const context = useContext(SelectedTabContext);
	if (!context) {
		throw new Error('useSelectedTab must be used within a SelectedTabProvider');
	}
	return context;
};
