import clsx from 'clsx';
import styles from './JournalSection.module.scss';
import JournalList from './journalList/JournalList';

interface JournalSection_Props {
	type?: string;
}

export default function JournalSection({ type }: JournalSection_Props) {
	return (
		<div className={clsx(styles.JournalSection)}>
			<JournalList type={type} />
		</div>
	);
}
