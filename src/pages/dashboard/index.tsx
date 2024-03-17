import clsx from 'clsx';
import Menu from '@/components/menu/Menu';
import styles from './Dashboard.module.scss';
import DashHeader from '@/components/dashheader/DashHeader';
import { useState } from 'react';
import MyContextTab from '@/components/myContext/MyContext';
import IndicatorsTab from '@/components/indicatorsTab/IndicatorsTab';
import { roboto, poppins } from '../_app';

export default function Dashboard() {
	const [selectedTab, setSelectedTab] = useState<string>('Indicators');

	return (
		<div className={clsx(styles.Dashboard, roboto.variable, poppins.variable)}>
			{/* menu 는 contextNames 가 표현돼야 한다. */}
			<Menu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

			<section>
				<DashHeader selectedTab={selectedTab} />

				{selectedTab === 'Indicators' && <IndicatorsTab />}
				{selectedTab === 'MyContext' && <MyContextTab />}
			</section>
		</div>
	);
}
// dashboard 에서 contextNames 와, context 쿼리를열어둔다.
// Menu 는 contextNames 만 있어도 된다.
// MyContextTab 에는 쿼리가 필요하다.
