import clsx from 'clsx';
import styles from './DashHeader.module.scss';

export default function Dashheader({ Tabs, TabsIndex }) {
	return (
		<header className={clsx(styles.DashHeader)}>
			<h2>{Tabs[TabsIndex]}</h2>
			<span>Userid</span>
		</header>
	);
}
