import clsx from 'clsx';
import styles from './Menu.module.scss';
import Link from 'next/link';

interface MenuProps {
	Tabs: string[];
	SelectedIdx: number;
	setSelectedIdx: (index: number) => void;
}

export default function Menu({ selectedTab, setSelectedTab }: MenuProps) {
	const tabs = ['Indicators', 'MyContext'];

	return (
		<aside className={clsx(styles.Menu)}>
			<nav>
				<Link href='/' className={clsx(styles.logo)}>
					EconomicContext
				</Link>
				{tabs.map((name, idx) => {
					return (
						<span key={idx} onClick={() => setSelectedTab(name)}>
							{name}
						</span>
					);
				})}
			</nav>
		</aside>
	);
}
