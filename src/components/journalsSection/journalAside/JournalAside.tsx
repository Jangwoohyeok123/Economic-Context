import clsx from 'clsx';
import styles from './JournalAside.module.scss';
import JournalAsideCalendar from './JournalAsideCalendar';

export default function JournalAside() {
	return (
		<div className={clsx(styles.JournalAside)}>
			<JournalAsideCalendar />
		</div>
	);
}
