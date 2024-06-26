import clsx from 'clsx';
import Menu from '@/components/menu/Menu';
import styles from './Dashboard.module.scss';
import DashHeader from '@/components/dashheader/DashHeader';
import { useContext, useState } from 'react';
import MyContextTab from '@/components/myContext/MyContext';
import IndicatorsTab from '@/components/indicatorsTab/IndicatorsTab';
import { roboto, poppins } from '../_app';
import { SelectedTabContext, SelectedTabProvider, useSelectedTab } from '@/store/selectedTab-context';

export default function Dashboard() {
	const { selectedTab } = useContext(SelectedTabContext);
	console.log('dashboard', selectedTab);
	return (
		<>
			<section className={clsx(styles.Dashboard, roboto.variable, poppins.variable)} style={{ position: 'relative' }}>
				<Menu />

				<section style={{ position: 'relative' }}>
					<DashHeader />

					{selectedTab === 'Indicators' ? (
						<IndicatorsTab />
					) : (
						<>
							<MyContextTab />
						</>
					)}
				</section>
			</section>
		</>
	);
}
