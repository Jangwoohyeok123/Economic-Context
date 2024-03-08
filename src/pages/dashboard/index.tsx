import clsx from 'clsx';
import { useState } from 'react';
import { roboto, poppins } from '../_app';
import Menu from '@/components/menu/Menu';
import styles from './Dashboard.module.scss';
import MyContext from '@/components/myContext/MyContext';
import Dashheader from '@/components/dashheader/DashHeader';
import Indicators from '@/components/indicators/Indicators';

export default function Dashboard() {
	const [Tabs] = useState(['Indicators', 'MyContext']);
	const [TabsIndex, setSelectedIdx] = useState(0);

	return (
		<>
			<div className={clsx(styles.Dashboard, roboto.variable, poppins.variable)}>
				<Menu Tabs={Tabs} SelectedIdx={TabsIndex} setSelectedIdx={setSelectedIdx} />

				{/* section 에 padding 을 주면 header 가 문제생겨서 padding 을 각 요소에 나눠줌 */}
				<section>
					<Dashheader Tabs={Tabs} TabsIndex={TabsIndex} />

					{Tabs[TabsIndex] === 'Indicators' ? <Indicators /> : <MyContext />}
				</section>
			</div>
		</>
	);
}
