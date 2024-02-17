import clsx from 'clsx';
import styles from './Dashboard.module.scss';
import { Roboto } from 'next/font/google';
import Menu from '@/components/menu/Menu';
import { useState } from 'react';

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['300', '400', '500'],
	variable: '--baseFont'
});

export default function Dashboard() {
	const [Tabs] = useState(['Indicators', 'MyContext']);
	const [SelectedIdx, setSelectedIdx] = useState(0);

	return (
		<div className={clsx(styles.Dashboard, roboto.variable)}>
			<Menu Tabs={Tabs} SelectedIdx={SelectedIdx} setSelectedIdx={setSelectedIdx} />
			<header className={clsx(styles.dashHeader)}>
				<h2>{Tabs[SelectedIdx]}</h2>
				<span>Userid</span>
			</header>
			<div className={clsx(styles.wrap)}></div>
		</div>
	);
}
