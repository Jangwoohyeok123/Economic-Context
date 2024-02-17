import clsx from 'clsx';
import styles from './Menu.module.scss';
import Link from 'next/link';

export default function Menu({ Tabs, SelectedIdx, setSelectedIdx }) {
	return (
		<aside className={clsx(styles.Menu)}>
			<nav>
				<Link href='/' className={clsx(styles.logo)}>
					EconomicContext
				</Link>
				{Tabs.map((name, idx) => {
					return (
						<span key={idx} onClick={() => setSelectedIdx(idx)} className={SelectedIdx === idx ? styles.on : ''}>
							{name}
						</span>
					);
				})}
			</nav>
		</aside>
	);
}
