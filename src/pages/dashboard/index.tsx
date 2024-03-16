import clsx from 'clsx';
import Menu from '@/components/menu/Menu';
import styles from './Dashboard.module.scss';
import Dashheader from '@/components/dashheader/DashHeader';
import { useState } from 'react';
import MyContextTab from '@/components/myContext/MyContext';
import IndicatorsTab from '@/components/indicatorsTab/IndicatorsTab';
import { roboto, poppins } from '../_app';

export default function Dashboard() {
	const [Tabs] = useState(['Indicators', 'MyContext']);
	const [TabsIndex, setSelectedIdx] = useState(0);

	return (
		<div className={clsx(styles.Dashboard, roboto.variable, poppins.variable)}>
			<Menu Tabs={Tabs} SelectedIdx={TabsIndex} setSelectedIdx={setSelectedIdx} />

			<section>
				<Dashheader Tabs={Tabs} TabsIndex={TabsIndex} />

				{TabsIndex === 0 && <IndicatorsTab />}
				{TabsIndex === 1 && <MyContextTab />}
			</section>
		</div>
	);
}
