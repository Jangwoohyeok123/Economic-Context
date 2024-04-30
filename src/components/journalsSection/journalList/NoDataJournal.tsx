import clsx from 'clsx';
import styles from '../JournalSection.module.scss';
import Image from 'next/image';
import noJournal from '@/public/noJournal.png';

export default function NoDataJournal() {
	console.log('no data journal');
	return (
		<div className={clsx(styles.NoDataJournal)}>
			<div className={clsx(styles.img)}>
				<Image src={noJournal} alt={'NoDataJournal Image'} priority />
			</div>
			<h3>There is no journal entry...</h3>
			<p>
				Based on an interesting context,
				<br />
				Write a new journal entry!
			</p>
		</div>
	);
}
