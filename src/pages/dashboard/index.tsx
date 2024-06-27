import clsx from 'clsx';
import Menu from '@/components/menu/Menu';
import styles from './Dashboard.module.scss';
import DashHeader from '@/components/dashheader/DashHeader';
import { useContext, useState } from 'react';
import MyContextTab from '@/components/myContext/MyContext';
import IndicatorsTab from '@/components/indicatorsTab/IndicatorsTab';
import { roboto, poppins } from '../_app';
import { createContext } from 'react';

interface TabMenuViewContextType {
	selectedTab: string;
	setSelectedTab: (tab: string) => void;
	updateTab?: (tab: string) => void;
}

const TabMenuViewContext = createContext<TabMenuViewContextType | null>(null);

export const useTabMenuView = () => {
	const context = useContext(TabMenuViewContext);
	if (!context) throw new Error('This component must be used within a <TabMenuViewContext> component.');
	return context;
};

export default function Dashboard() {
	const [selectedTab, setSelectedTab] = useState<string>('Indicators');
	return (
		<>
			<section className={clsx(styles.Dashboard, roboto.variable, poppins.variable)}>
				<Menu />

				{selectedTab === 'Indicators' ? <IndicatorsTab /> : <MyContextTab />}
			</section>
		</>
	);
}

// function Menu({}) {
// 	const {selectedTab, setSelectedTab} = useTabMenuView();

// 	return
// }
