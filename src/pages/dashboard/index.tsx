import clsx from 'clsx';
import Menu from '@/components/menu/Menu';
import styles from './Dashboard.module.scss';
import MyContext from '@/components/myContext/MyContext';
import Dashheader from '@/components/dashheader/DashHeader';
import Indicators from '@/components/indicators/Indicators';
import { useState } from 'react';
import { roboto, poppins } from '../_app';

export default function Dashboard() {
	const [Tabs] = useState(['Indicators', 'MyContext']);
	const [TabsIndex, setSelectedIdx] = useState(0);

	return (
		<>
			<div className={clsx(styles.Dashboard, roboto.variable, poppins.variable)}>
				<Menu Tabs={Tabs} SelectedIdx={TabsIndex} setSelectedIdx={setSelectedIdx} />

				{/* MyContext 가 렌더링될 때 데이터 페칭 vs dashboard 에서 미리 페칭한 후 Mycontext 에게 전달하기 */}
				{/* 데시보드 들어갈 때 페칭하는게 좋으므로 Mycontext 에서 useQuery 를 통해 페칭하기 */}
				<section>
					<Dashheader Tabs={Tabs} TabsIndex={TabsIndex} />

					{Tabs[TabsIndex] === 'Indicators' ? <Indicators /> : <MyContext />}
				</section>
			</div>
		</>
	);
}
