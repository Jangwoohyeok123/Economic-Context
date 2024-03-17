import clsx from 'clsx';
import Menu from '@/components/menu/Menu';
import styles from './Dashboard.module.scss';
import DashHeader from '@/components/dashheader/DashHeader';
import { useState } from 'react';
import MyContextTab from '@/components/myContext/MyContext';
import IndicatorsTab from '@/components/indicatorsTab/IndicatorsTab';
import { roboto, poppins } from '../_app';

export default function Dashboard() {
	const [selectedTab, setSelectedTab] = useState('Indicators');

	return (
		<div className={clsx(styles.Dashboard, roboto.variable, poppins.variable)}>
			<Menu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

			<section>
				<DashHeader selectedTab={selectedTab} />

				{selectedTab === 'Indicators' && <IndicatorsTab />}
				{selectedTab === 'MyContext' && <MyContextTab />}
			</section>
		</div>
	);
}
