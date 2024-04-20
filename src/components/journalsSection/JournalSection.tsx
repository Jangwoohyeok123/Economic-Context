import clsx from 'clsx';
import styles from './JournalSection.module.scss';
import JournalList from './journalList/JournalList';

export default function JournalSection() {
	return (
		<div className={clsx(styles.JournalSection)}>
			<JournalList />
		</div>
	);
}
